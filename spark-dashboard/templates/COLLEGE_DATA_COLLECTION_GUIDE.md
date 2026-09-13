# 📋 Velammal Engineering College - Companion Portal
## Institutional Data Collection Guide & Specifications (ECE & Multi-Department)

This document provides college administrators, HODs (Head of Departments), and faculty in-charges with exact data requirements, field definitions, and usage mappings for the **Velammal Tech Companion (Spark Dashboard)** portal.

---

### 🗂️ 1. Student Roster Template (`ECE_Student_Roster_Template.csv`)
**Target Recipient**: ECE HOD Office / Class Advisors / Year Coordinators  
**File Location**: `public/templates/ECE_Student_Roster_Template.csv`

#### Required Column Specifications:
| Column Header | Data Type | Mandatory / Optional | Sample Value | Description & System Usage |
| :--- | :--- | :--- | :--- | :--- |
| `reg_no` | 12-Digit Numeric | **Mandatory** | `113320106001` | Unique Student Key. Used for Student Login, Result lookup, Attendance linking, and Grade sheets. |
| `name` | String (Alpha) | **Mandatory** | `Ananya Venkatesh` | Full official student name. Displays on attendance rolls, profile, and certificates. |
| `department` | String (Code) | **Mandatory** | `ECE` | Department code (`ECE`, `CSE`, `IT`, `MECH`, `EEE`, `AI&DS`). Used for department filtering. |
| `section` | String (Char) | **Mandatory** | `A` | Section identifier (`A`, `B`, `C`). Maps to physical classroom and GTA drop-in folders. |
| `year` | Integer (1-4) | **Mandatory** | `3` | Current academic year. Determines course semester, syllabus, and roadmaps. |
| `cgpa` | Float (0.0 - 10.0)| **Recommended** | `9.45` | Cumulative Grade Point Average. Powers Leaderboards and Academic Risk classification. |
| `attendance` | String | Optional | `Present` | Default physical state (`Present` or `Absent`). Synced with ESP32 edge camera nodes. |
| `student_mobile` | 10-Digit Phone | Optional | `9840112233` | Student contact number. |
| `parent_mobile` | 10-Digit Phone | **Recommended** | `9840998877` | Guardian contact. Used for SMS OTP, Parent Portal authentication, and hostel outpass verification. |
| `student_email` | Email | **Recommended** | `ananya.v@velammal.edu.in` | Institutional Google Workspace ID. Used for SSO and note downloads. |

---

### 👨‍🏫 2. Faculty & Mentor Directory (`ECE_Faculty_Directory_Template.csv`)
**Target Recipient**: Department Secretary / Academic Coordinators  
**File Location**: `public/templates/ECE_Faculty_Directory_Template.csv`

#### Required Column Specifications:
| Column Header | Data Type | Mandatory / Optional | Sample Value | Description & System Usage |
| :--- | :--- | :--- | :--- | :--- |
| `faculty_id` | Alphanumeric | **Mandatory** | `FAC-ECE-01` | Unique staff identifier for staff login and role assignment. |
| `faculty_name` | String | **Mandatory** | `Dr. S. Soundar Rajan` | Official faculty title and name. |
| `designation` | String | **Mandatory** | `Associate Professor & HOD` | Academic rank (Professor, Associate Prof, Asst. Prof). |
| `department` | String | **Mandatory** | `ECE` | Associated engineering department. |
| `cabin` | String | **Mandatory** | `ECE Block 202` | Physical room/cabin. Displayed in 1:1 student mentorship booking. |
| `email` | Email | **Mandatory** | `soundar.rajan@velammal.edu.in` | Staff email for meeting invitations and automated student helpdesk tickets. |
| `status` | String | Optional | `ONLINE` | Current active indicator (`ONLINE`, `BUSY`, `ON_LEAVE`). |

---

### 🕒 3. Classroom Timetable & Room Mapping (`ECE_Timetable_Template.csv`)
**Target Recipient**: Time Table Committee / Academic Dean Office  
**File Location**: `public/templates/ECE_Timetable_Template.csv`

#### Required Column Specifications:
| Column Header | Data Type | Mandatory / Optional | Sample Value | Description & System Usage |
| :--- | :--- | :--- | :--- | :--- |
| `course_code` | Alphanumeric | **Mandatory** | `EC8395` | Official Anna University course code. |
| `course_name` | String | **Mandatory** | `Analog Electronics` | Subject Title. Displayed in Notes repository and PYQ vault. |
| `department` | String | **Mandatory** | `ECE` | Department code. |
| `semester` | Integer (1-8) | **Mandatory** | `5` | Academic semester. |
| `faculty_name`| String | **Mandatory** | `Dr. S. Soundar Rajan` | Faculty assigned to teach the course. |
| `room_no` | String | **Mandatory** | `EC-202` | Assigned classroom or laboratory. Maps to ESP32 node IP. |
| `day` | String | **Mandatory** | `Monday` | Day of week (`Monday` to `Saturday`). |
| `time_slot` | String | **Mandatory** | `08:30 AM - 10:10 AM` | Scheduled lecture period. |

---

### 🚌 4. Campus Bus Fleet & Route Mapping (`Velammal_Bus_Fleet_Template.csv`)
**Target Recipient**: Transport Department / Administrative Officer  
**File Location**: `public/templates/Velammal_Bus_Fleet_Template.csv`

#### Required Column Specifications:
| Column Header | Data Type | Mandatory / Optional | Sample Value | Description & System Usage |
| :--- | :--- | :--- | :--- | :--- |
| `bus_no` | String | **Mandatory** | `B01` | Vehicle number / Board number. |
| `route_name` | String | **Mandatory** | `Anna Nagar Roundtana` | Origin and primary corridor. |
| `driver_name` | String | **Mandatory** | `M. Murugan` | Assigned transport crew member. |
| `driver_phone`| Phone | **Mandatory** | `+91 98401 23451` | Direct mobile line for students and parents during transit. |
| `stops` | String (Quotes) | **Mandatory** | `"Anna Arch, Roundtana, Campus"` | Comma-separated list of major pickup points. |
| `morning_eta` | Time | **Mandatory** | `08:15 AM` | Scheduled campus arrival time. |
| `status` | String | Optional | `On Route` | Status (`On Route`, `Arrived`, `Maintenance`). |

---

### 💡 GTA-Style Folder Drop-In Workflow (How it works):
1. **Name the Folder**: Any folder name like `ECE A`, `ece_a`, `ECE-B`, `CSE A` will be automatically detected.
2. **Put the CSV or JSON file**: Put `students.csv` or `students.json` inside that folder.
3. **Drag and Drop**: Drag the folder directly into the portal's top bar button **"Auto-Map Classroom Data Folder"**.
4. **Auto-Normalization**: The intelligent fuzzy engine automatically handles uppercase/lowercase column names (e.g., `REG_NO`, `Register No`, `Roll Number` are all automatically matched!).
