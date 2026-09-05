#!/usr/bin/env python3
"""
CLAD Question Bank Analyzer & Fixer
"""

import json
import os
import re

INPUT_FILE = "questions.json"
OUTPUT_FILE = "questions_fixed.json"
REPORT_FILE = "fix_report.txt"
IMAGES_DIR = "images"

def is_html_img(s):
    return bool(re.match(r"^\s*<img\s", str(s), re.IGNORECASE))

def is_image_prefix(s):
    return isinstance(s, str) and s.strip().startswith("IMAGE:")

def looks_like_question_text(s):
    if not isinstance(s, str):
        return False
    s_stripped = s.strip()
    s_lower = s_stripped.lower()
    patterns = [
        r'\?$',
        r'^(what|which|how|when|where|why|who|can |is |are |will |does |do |if |after |before |you |your |the |a |an )',
        r'^Question\s*#?\d+',
        r'(true|false|correct|incorrect)',
        r'(displays?|shows?|executes?|completes?|runs?|what value|what is|which of)',
    ]
    for pat in patterns:
        if re.search(pat, s_lower, re.IGNORECASE):
            return True
    return False

def normalize_option(opt):
    if is_html_img(opt):
        m = re.search(r"src=['\"]([^'\"]+)['\"]", opt, re.IGNORECASE)
        if m:
            return "IMAGE: " + m.group(1)
    return opt

def image_exists(img_path):
    return os.path.exists(img_path) or os.path.exists(os.path.join(IMAGES_DIR, os.path.basename(img_path)))

def analyze_and_fix(questions):
    fixed = []
    removed = []
    report_lines = []
    
    for q in questions:
        qid = q.get("id", "?")
        text = q.get("text", "").strip() if q.get("text") else ""
        image = q.get("image", [])
        if isinstance(image, str):
            image = [image] if image else []
        options = list(q.get("options", []))
        topic = q.get("topic", "")
        explanation = q.get("explanation", "Please search and find the answer for this.")
        
        issues = []
        
        # Normalize HTML img to IMAGE: prefix
        options = [normalize_option(o) for o in options]
        
        # Fix 1: No text but options contain question text
        if not text:
            q_opts = []
            real_opts = []
            for i, opt in enumerate(options):
                if is_html_img(opt) or is_image_prefix(opt):
                    real_opts.append(opt)
                elif looks_like_question_text(opt) and len(opt) > 20:
                    q_opts.append((i, opt))
                else:
                    real_opts.append(opt)
            
            if len(q_opts) == 1:
                text = q_opts[0][1]
                options = real_opts
                issues.append(f"FIXED: Moved question from option[{q_opts[0][0]}] to text")
            elif len(q_opts) > 1:
                best = max(q_opts, key=lambda x: len(x[1]))
                text = best[1]
                options = real_opts
                issues.append(f"FIXED: Moved best candidate (option[{best[0]}]) to text")
        
        # Fix 2: Deduplicate options (same image repeated)
        seen = []
        deduped = []
        for opt in options:
            if opt not in seen:
                seen.append(opt)
                deduped.append(opt)
            else:
                issues.append(f"REMOVED duplicate option: {opt[:60]}")
        options = deduped
        
        # Fix 3: Too many options - trim to 4
        if len(options) > 4:
            issues.append(f"TRIMMED options from {len(options)} to 4")
            options = options[:4]
        
        # Fix 4: Check image files exist
        valid_images = []
        for img in image:
            if image_exists(img):
                valid_images.append(img)
            else:
                issues.append(f"MISSING image: {img}")
        image = valid_images
        
        # Fix 5: Check option images exist
        valid_options = []
        for opt in options:
            if is_image_prefix(opt):
                img_path = opt.replace("IMAGE: ", "").strip()
                if image_exists(img_path):
                    valid_options.append(opt)
                else:
                    issues.append(f"MISSING option image: {img_path}")
                    valid_options.append("[Image unavailable]")
            else:
                valid_options.append(opt)
        options = valid_options
        
        # Final: decide keep or remove
        if not text:
            removed.append({"id": qid, "reason": "No question text", "text_preview": ""})
            report_lines.append(f"REMOVED Q{qid}: No question text after all fixes")
            continue
        
        if len(options) < 4:
            removed.append({"id": qid, "reason": f"Only {len(options)} options", "text_preview": text[:60]})
            report_lines.append(f"REMOVED Q{qid}: Only {len(options)} options — {text[:60]}")
            continue
        
        if issues:
            report_lines.append(f"Q{qid}: " + " | ".join(issues))
        
        fixed_q = {
            "id": qid,
            "topic": topic,
            "text": text,
            "image": image,
            "options": options[:4],
            "explanation": explanation
        }
        if q.get("correctAnswer") is not None:
            fixed_q["correctAnswer"] = q["correctAnswer"]
        if q.get("multiSelect"):
            fixed_q["multiSelect"] = q["multiSelect"]
        
        fixed.append(fixed_q)
    
    return fixed, removed, report_lines

def main():
    print(f"Loading {INPUT_FILE}...")
    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        questions = json.load(f)
    print(f"Total questions: {len(questions)}")
    
    fixed, removed, report_lines = analyze_and_fix(questions)
    
    print(f"\n=== RESULTS ===")
    print(f"Fixed/kept: {len(fixed)}")
    print(f"Removed:    {len(removed)}")
    print(f"Issues log: {len(report_lines)} entries")
    
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(fixed, f, indent=2, ensure_ascii=False)
    print(f"Saved -> {OUTPUT_FILE}")
    
    with open(REPORT_FILE, "w", encoding="utf-8") as f:
        f.write(f"CLAD Fix Report\n{'='*60}\n")
        f.write(f"Input: {len(questions)} | Kept: {len(fixed)} | Removed: {len(removed)}\n\n")
        f.write("ISSUES & FIXES:\n" + "-"*60 + "\n")
        for line in report_lines:
            f.write(line + "\n")
        f.write("\n\nREMOVED:\n" + "-"*60 + "\n")
        for r in removed:
            f.write(f"ID={r['id']}: {r['reason']} | {r.get('text_preview','')}\n")
    print(f"Report -> {REPORT_FILE}")
    
    print(f"\nRemoved IDs: {[r['id'] for r in removed]}")

if __name__ == "__main__":
    main()
