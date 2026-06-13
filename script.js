/* ==========================================================================
   SPARK R&D LABS - INTERACTIVE TELEMETRY CONTROLLER
   Pure Vanilla JS High-Performance Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       0. GLOBAL CONFIGS & DOM ELEMENTS
       ========================================== */
    const mouseGlow = document.getElementById('mouseGlow');
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav');

    // Global Mouse position tracking
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Custom Mouse Glow Aura positioning
        if (mouseGlow) {
            mouseGlow.style.left = `${mouseX}px`;
            mouseGlow.style.top = `${mouseY}px`;
        }
    });

    // Mobile Navigation Toggle
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Toggle hamburger animation
            const bars = navToggle.querySelectorAll('.bar');
            if (navToggle.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        // Close nav when clicking a link on mobile
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.querySelectorAll('.bar').forEach(b => b.style.transform = b.style.opacity = 'none');
            });
        });
    }


    /* ==========================================
       1. JARVIS LOADER ENGINE
       ========================================== */
    const jarvisLoader = document.getElementById('jarvisLoader');
    const loaderBar = document.getElementById('loaderBar');
    const loaderPercent = document.getElementById('loaderPercent');
    const loaderStatus = document.getElementById('loaderStatus');
    const loaderConsole = document.getElementById('loaderConsole');

    const bootSequenceLogs = [
        "INITIALIZING SPARK EMBEDDED KERNEL...",
        "LOADING SYSTEM REQUISITES... OK",
        "CONNECTING NEURAL PATHWAYS SYSTEM MATRIX...",
        "MOUNTING HARDWARE INTERFACE BUS (SPI/I2C)...",
        "STABILIZING POWER SYSTEMS (SMPS SUPPLY)... ACTIVE",
        "CALIBRATING ANALOG-TO-DIGITAL TELEMETRY SENSORS...",
        "CHECKING MULTI-LAYER PCB ROUTING NETS...",
        "TRACE INTEGRITY VERIFIED (ALTIUM/KICAD ENGINE)... 100%",
        "SYNCHRONIZING AI CLASSIFIERS & VISION MODELS...",
        "AGROPULSE root biosignals calibrated.",
        "MYCOMETER fungi detection core initialized.",
        "ESTABLISHING SECURE AWS CLOUD PROTOCOLS...",
        "ALL SYSTEMS OPERATIONAL. LAUNCHING HOLOGRAPHIC CONSOLE..."
    ];

    if (jarvisLoader) {
        // --- ADDED: Web Audio API Synthesizer for Boot Sequence ---
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        let audioCtx;

        const playSystemBootSound = () => {
            try {
                if (!audioCtx) audioCtx = new AudioContext();
                if (audioCtx.state === 'suspended') audioCtx.resume();
                // 1. Deep Base Drone
                const osc1 = audioCtx.createOscillator();
                osc1.type = 'square';
                osc1.frequency.setValueAtTime(30, audioCtx.currentTime);
                osc1.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 2.0);
                
                // 2. High-Tech Sweeping Scanner
                const osc2 = audioCtx.createOscillator();
                osc2.type = 'triangle';
                osc2.frequency.setValueAtTime(300, audioCtx.currentTime);
                osc2.frequency.exponentialRampToValueAtTime(1500, audioCtx.currentTime + 1.0);
                osc2.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 2.0);

                const gainNode = audioCtx.createGain();
                gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 0.5);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 2.14);
                
                osc1.connect(gainNode);
                osc2.connect(gainNode);
                gainNode.connect(audioCtx.destination);
                
                osc1.start();
                osc2.start();
                osc1.stop(audioCtx.currentTime + 2.14);
                osc2.stop(audioCtx.currentTime + 2.14);
            } catch(e) { /* Autoplay blocked */ }
        };

        const playBootCompleteSound = () => {
            try {
                if (!audioCtx) audioCtx = new AudioContext();
                if (audioCtx.state === 'suspended') audioCtx.resume();
                
                const osc = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();
                
                // High-tech success chime
                osc.type = 'sine';
                osc.frequency.setValueAtTime(880, audioCtx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(1760, audioCtx.currentTime + 0.1);
                
                gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
                
                osc.connect(gainNode);
                gainNode.connect(audioCtx.destination);
                
                osc.start();
                osc.stop(audioCtx.currentTime + 0.5);
            } catch(e) { /* Autoplay blocked */ }
        };

        let currentProgress = 0;
        let logIndex = 0;

        const writeLogLine = (text) => {
            if (!loaderConsole) return;
            const logLine = document.createElement('div');
            logLine.className = 'console-log-line';
            logLine.innerHTML = `<span style="color:#00E5FF;">[SYS]</span> ${text}`;
            loaderConsole.appendChild(logLine);
            loaderConsole.scrollTop = loaderConsole.scrollHeight;
        };

        // Pause loader until user clicks to bypass Audio Autoplay block
        const initOverlay = document.createElement('div');
        initOverlay.style.cssText = 'position:absolute; inset:0; z-index:999999; display:flex; justify-content:center; align-items:center; background:rgba(0,0,0,0.85); backdrop-filter:blur(5px);';
        initOverlay.innerHTML = '<button class="btn btn-primary" style="padding: 1.5rem 3rem; font-size: 1.2rem; border-color: var(--color-cyan); color: var(--color-cyan); box-shadow: 0 0 30px rgba(0, 229, 255, 0.4); text-transform: uppercase; cursor: pointer;">Initialize Core Systems</button>';
        jarvisLoader.appendChild(initOverlay);

        initOverlay.querySelector('button').addEventListener('click', () => {
            initOverlay.remove();
            
            // Now browser allows audio
            playSystemBootSound();

            const bootInterval = setInterval(() => {
            // Speed up or slow down loader progress randomly
            currentProgress += Math.floor(Math.random() * 4) + 1;
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(bootInterval);
                
                // Complete sequence
                loaderStatus.innerText = "SPARK CORE ONLINE";
                writeLogLine("BOOT STRAP DIRECTIVE COMPLETED IN 2.14s.");
                
                // Play completion chime
                playBootCompleteSound();
                
                setTimeout(() => {
                    jarvisLoader.classList.add('fade-out');
                }, 800);
            }

            // Update DOM progress
            if (loaderBar) loaderBar.style.width = `${currentProgress}%`;
            if (loaderPercent) loaderPercent.innerText = `${currentProgress.toString().padStart(2, '0')}%`;

            // Append logs progressively based on percentage
            const logThreshold = Math.floor(100 / bootSequenceLogs.length);
            if (currentProgress > (logIndex * logThreshold) && logIndex < bootSequenceLogs.length) {
                writeLogLine(bootSequenceLogs[logIndex]);
                if (loaderStatus) loaderStatus.innerText = bootSequenceLogs[logIndex];
                logIndex++;
            }
        }, 30);
        }); // Close the click event listener
    }


    /* ==========================================
       2. NEURAL NETWORK BACKGROUND CANVAS
       ========================================== */
    const neuralCanvas = document.getElementById('neuralCanvas');
    if (neuralCanvas) {
        const ctx = neuralCanvas.getContext('2d');
        let particles = [];
        let connectionDistance = 110;
        let numParticles = 80;

        const resizeCanvas = () => {
            neuralCanvas.width = window.innerWidth;
            neuralCanvas.height = window.innerHeight;
            if (window.innerWidth < 768) {
                numParticles = 30;
                connectionDistance = 80;
            } else {
                numParticles = 85;
                connectionDistance = 110;
            }
            initParticles();
        };

        class Particle {
            constructor() {
                this.x = Math.random() * neuralCanvas.width;
                this.y = Math.random() * neuralCanvas.height;
                this.vx = (Math.random() - 0.5) * 0.45;
                this.vy = (Math.random() - 0.5) * 0.45;
                this.radius = Math.random() * 1.5 + 0.5;
                
                // JARVIS Dynamic Colors
                const r = Math.random();
                if (r < 0.33) {
                    this.color = 'rgba(255, 85, 0, 0.6)'; // Neon Orange
                } else if (r < 0.66) {
                    this.color = 'rgba(0, 102, 255, 0.6)'; // Tech Blue
                } else {
                    this.color = 'rgba(0, 229, 255, 0.6)'; // Holographic Cyan
                }
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce at bounds
                if (this.x < 0 || this.x > neuralCanvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > neuralCanvas.height) this.vy *= -1;

                // Mouse interaction - slightly seek mouse
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    this.x -= dx * 0.005;
                    this.y -= dy * 0.005;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle());
            }
        };

        const drawConnections = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        const alpha = (1 - dist / connectionDistance) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        
                        // Dynamic Gradient based on particle color
                        const grad = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                        grad.addColorStop(0, particles[i].color.replace('0.6', alpha.toString()));
                        grad.addColorStop(1, particles[j].color.replace('0.6', alpha.toString()));
                        
                        ctx.strokeStyle = grad;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        };

        const animateParticles = () => {
            ctx.clearRect(0, 0, neuralCanvas.width, neuralCanvas.height);
            
            // Draw a subtle grid backdrop first
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.006)';
            ctx.lineWidth = 0.5;
            const step = 60;
            for (let x = 0; x < neuralCanvas.width; x += step) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, neuralCanvas.height);
                ctx.stroke();
            }
            for (let y = 0; y < neuralCanvas.height; y += step) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(neuralCanvas.width, y);
                ctx.stroke();
            }

            // Update & Draw particles
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            drawConnections();

            requestAnimationFrame(animateParticles);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        animateParticles();
    }


    /* ==========================================
       3. INTERCONNECTED DIVISION NODE GRAPH
       ========================================== */
    const orgCanvas = document.getElementById('orgGraphCanvas');
    if (orgCanvas) {
        const ctx = orgCanvas.getContext('2d');
        let width = orgCanvas.clientWidth;
        let height = orgCanvas.clientHeight;
        
        orgCanvas.width = width;
        orgCanvas.height = height;

        // Division structural definitions
        const divisions = [
            { id: "ai", name: "AI & Systems", lead: "Bhoumik S", color: "#0066FF", x: 0.22, y: 0.35, size: 45, angle: 0 },
            { id: "software", name: "Software & IoT", lead: "Bhanu Prakash P", color: "#00E5FF", x: 0.5, y: 0.2, size: 45, angle: 0.4 },
            { id: "hardware", name: "Hardware & 3D", lead: "Vishwanath K", color: "#FF5500", x: 0.78, y: 0.35, size: 45, angle: 0.8 },
            { id: "eee", name: "EEE & PCB Core", lead: "Leo Benedict A", color: "#9C27B0", x: 0.65, y: 0.75, size: 45, angle: 1.2 },
            { id: "marketing", name: "Outreach & Growth", lead: "Decentralized Team", color: "#FF0055", x: 0.35, y: 0.75, size: 45, angle: 1.6 }
        ];

        // Nodes connections
        const connections = [
            { from: 0, to: 1 }, // AI to Software
            { from: 1, to: 2 }, // Software to Hardware
            { from: 2, to: 3 }, // Hardware to PCB
            { from: 3, to: 4 }, // PCB to Outreach
            { from: 4, to: 0 }, // Outreach to AI
            { from: 0, to: 3 }, // Cross links
            { from: 1, to: 3 },
            { from: 2, to: 4 }
        ];

        let hoveredNode = null;
        let activeNodeFilter = "all";

        const drawGraph = () => {
            ctx.clearRect(0, 0, width, height);

            // 1. Draw animated connecting trace pathways
            const time = Date.now() * 0.001;
            connections.forEach(conn => {
                const nodeA = divisions[conn.from];
                const nodeB = divisions[conn.to];
                const x1 = nodeA.x * width;
                const y1 = nodeA.y * height;
                const x2 = nodeB.x * width;
                const y2 = nodeB.y * height;

                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.strokeStyle = hoveredNode === conn.from || hoveredNode === conn.to
                    ? 'rgba(255, 255, 255, 0.15)'
                    : 'rgba(255, 255, 255, 0.035)';
                ctx.lineWidth = 1;
                ctx.stroke();

                // Draw floating signal packet on connection
                const progress = (time + (conn.from * 0.2)) % 1;
                const px = x1 + (x2 - x1) * progress;
                const py = y1 + (y2 - y1) * progress;
                ctx.beginPath();
                ctx.arc(px, py, 2.5, 0, Math.PI * 2);
                ctx.fillStyle = nodeA.color;
                ctx.shadowBlur = 8;
                ctx.shadowColor = nodeA.color;
                ctx.fill();
                ctx.shadowBlur = 0; // Reset
            });

            // 2. Draw nodes themselves
            divisions.forEach((node, idx) => {
                const x = node.x * width;
                const y = node.y * height;
                const isHovered = hoveredNode === idx;
                const isActive = activeNodeFilter === node.id;

                // Micro floating motion
                const floatOffset = Math.sin(time + node.angle) * 3;
                const finalY = y + floatOffset;

                // Outer rotating telemetries
                ctx.beginPath();
                ctx.arc(x, finalY, node.size + 8, time, time + 1.5);
                ctx.strokeStyle = node.color;
                ctx.lineWidth = 0.75;
                ctx.stroke();

                // Pulsing outer bounds
                ctx.beginPath();
                ctx.arc(x, finalY, node.size + (isHovered || isActive ? 5 : 2), 0, Math.PI * 2);
                ctx.strokeStyle = isHovered || isActive ? node.color : 'rgba(255, 255, 255, 0.1)';
                ctx.lineWidth = isHovered || isActive ? 2 : 1;
                ctx.stroke();

                // Central Node Core
                ctx.beginPath();
                ctx.arc(x, finalY, node.size - 4, 0, Math.PI * 2);
                ctx.fillStyle = isActive ? node.color : 'rgba(6, 6, 12, 0.95)';
                ctx.fill();
                ctx.strokeStyle = 'rgba(255,255,255,0.06)';
                ctx.stroke();

                // Draw central details
                ctx.font = '10px Share Tech Mono, monospace';
                ctx.fillStyle = isActive ? '#000' : '#fff';
                ctx.textAlign = 'center';
                ctx.fillText(node.name, x, finalY - 4);
                
                ctx.font = '8px JetBrains Mono, monospace';
                ctx.fillStyle = isActive ? '#222' : node.color;
                ctx.fillText(isActive ? "FILTERED" : node.lead, x, finalY + 12);
            });
        };

        const checkHover = (x, y) => {
            let found = null;
            const time = Date.now() * 0.001;
            divisions.forEach((node, idx) => {
                const floatOffset = Math.sin(time + node.angle) * 3;
                const nx = node.x * width;
                const ny = node.y * height + floatOffset;
                const dist = Math.sqrt((x - nx) * (x - nx) + (y - ny) * (y - ny));
                if (dist <= node.size) {
                    found = idx;
                }
            });
            return found;
        };

        // Interaction bindings
        orgCanvas.addEventListener('mousemove', (e) => {
            const rect = orgCanvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            hoveredNode = checkHover(x, y);
            orgCanvas.style.cursor = hoveredNode !== null ? 'pointer' : 'crosshair';
        });

        orgCanvas.addEventListener('click', () => {
            if (hoveredNode !== null) {
                const divId = divisions[hoveredNode].id;
                activeNodeFilter = activeNodeFilter === divId ? "all" : divId;
                filterTeamGrid(activeNodeFilter);
            }
        });

        // Loop draw cycles
        const runGraph = () => {
            drawGraph();
            requestAnimationFrame(runGraph);
        };

        window.addEventListener('resize', () => {
            width = orgCanvas.clientWidth;
            height = orgCanvas.clientHeight;
            orgCanvas.width = width;
            orgCanvas.height = height;
        });

        runGraph();
    }


    /* ==========================================
       4. TEAM FILTER LOGICS
       ========================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const teamCards = document.querySelectorAll('.member-card');

    const filterTeamGrid = (divisionId) => {
        // Sync filter buttons active visual state
        filterButtons.forEach(btn => {
            if (btn.getAttribute('data-filter') === divisionId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Filter cards
        teamCards.forEach(card => {
            const cardDivs = card.getAttribute('data-division').split(' ');
            if (divisionId === 'all' || cardDivs.includes(divisionId)) {
                card.classList.remove('hide');
                card.style.display = 'flex';
                // Trigger quick enter animation
                card.style.transform = 'scale(1)';
                card.style.opacity = '1';
            } else {
                card.classList.add('hide');
                card.style.transform = 'scale(0.95)';
                card.style.opacity = '0.15';
                setTimeout(() => {
                    if (card.classList.contains('hide')) {
                        card.style.display = 'none';
                    }
                }, 400);
            }
        });
    };

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterVal = btn.getAttribute('data-filter');
            filterTeamGrid(filterVal);
        });
    });


    /* ==========================================
       5. 3D FLOATING TECHNOLOGY SPHERE ENGINE
       ========================================== */
    const tagCanvas = document.getElementById('tagSphereCanvas');
    const activeCategoryLabel = document.getElementById('activeCategoryName');
    const categoryCards = document.querySelectorAll('.tech-category-card');

    if (tagCanvas) {
        const ctx = tagCanvas.getContext('2d');
        let width = tagCanvas.parentElement.clientWidth;
        let height = 380;
        
        tagCanvas.width = width;
        tagCanvas.height = height;

        // Categorized engineering technologies
        const technologySets = [
            ["Python", "TensorFlow", "PyTorch", "OpenCV", "Scikit", "Numpy", "Keras", "Edge AI", "CUDA"],
            ["React", "Node.js", "Express", "MongoDB", "AWS", "Firebase", "REST APIs", "WebSockets", "Docker"],
            ["ESP32", "STM32", "Arduino", "FreeRTOS", "UART", "I2C/SPI", "BLE Core", "MQTT", "Firmware"],
            ["Altium Designer", "KiCad", "Eagle PCB", "SMPS", "LDOs", "EMI Shield", "Oscilloscope", "Multi-Layer"],
            ["Fusion 360", "SolidWorks", "Blender", "3D Printing", "Rapid Prototypes", "Enclosures", "Thermal Venting"]
        ];

        let tags = [];
        let currentSetIndex = 0;
        let radius = 130;
        let dtr = Math.PI / 180;
        let d = 300; // Perspective parameter

        // Projection angles
        let sa = 0, ca = 0, sb = 0, cb = 0, sc = 0, cc = 0;
        let activeRotationX = 0.3;
        let activeRotationY = -0.3;

        class Tag {
            constructor(text, x, y, z) {
                this.text = text;
                this.x = x;
                this.y = y;
                this.z = z;
                this.cx = 0;
                this.cy = 0;
                this.scale = 1;
                this.alpha = 1;
            }
        }

        const buildSphere = (setIdx) => {
            tags = [];
            const set = technologySets[setIdx];
            const max = set.length;

            for (let i = 0; i < max; i++) {
                // Golden spiral distribution across sphere shell
                const phi = Math.acos(-1 + (2 * i) / max);
                const theta = Math.sqrt(max * Math.PI) * phi;

                const x = radius * Math.sin(phi) * Math.cos(theta);
                const y = radius * Math.sin(phi) * Math.sin(theta);
                const z = radius * Math.cos(phi);

                tags.push(new Tag(set[i], x, y, z));
            }
        };

        const updateProjection = () => {
            // Compute sine and cosine matrices
            sa = Math.sin(activeRotationX * dtr);
            ca = Math.cos(activeRotationX * dtr);
            sb = Math.sin(activeRotationY * dtr);
            cb = Math.cos(activeRotationY * dtr);
            sc = Math.sin(0);
            cc = Math.cos(0);
        };

        const drawSphere = () => {
            ctx.clearRect(0, 0, tagCanvas.width, tagCanvas.height);
            
            // Auto deceleration vector
            activeRotationX *= 0.98;
            activeRotationY *= 0.98;

            updateProjection();

            // Project 3D coordinate shell to 2D
            tags.forEach(tag => {
                // Rotate matrices around X
                let rx1 = tag.x;
                let ry1 = tag.y * ca - tag.z * sa;
                let rz1 = tag.y * sa + tag.z * ca;

                // Rotate matrices around Y
                let rx2 = rx1 * cb + rz1 * sb;
                let ry2 = ry1;
                let rz2 = -rx1 * sb + rz1 * cb;

                // Project size scaling based on perspective Z coordinate
                let per = d / (d + rz2);
                tag.cx = rx2 * per + tagCanvas.width / 2;
                tag.cy = ry2 * per + tagCanvas.height / 2;
                tag.scale = per;
                tag.alpha = (per - 0.6) * 1.5;
            });

            // Sort tags by depth (Z-index layering)
            tags.sort((a, b) => b.scale - a.scale);

            // Draw tags on canvas
            tags.forEach(tag => {
                ctx.save();
                ctx.translate(tag.cx, tag.cy);
                ctx.scale(tag.scale, tag.scale);

                // Compute font weights and details
                const fontSize = Math.floor(13 * tag.scale);
                ctx.font = `bold ${fontSize}px Space Grotesk, sans-serif`;
                
                // Color layers depending on distance depth
                const depthColor = categoryCards[currentSetIndex]
                    ? getComputedStyle(document.documentElement).getPropertyValue('--color-' + getCategoryColorKey(currentSetIndex)).trim()
                    : "#00E5FF";

                ctx.fillStyle = depthColor;
                ctx.globalAlpha = Math.max(0.12, Math.min(1, tag.alpha));
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                
                // Outer glow shadow for active tags close to front viewport
                if (tag.scale > 1.1) {
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = depthColor;
                }
                
                ctx.fillText(tag.text, 0, 0);
                ctx.restore();
            });
        };

        const getCategoryColorKey = (idx) => {
            switch(idx) {
                case 0: return 'blue';
                case 1: return 'cyan';
                case 2: return 'orange';
                case 3: return 'purple';
                case 4: return 'magenta';
                default: return 'blue';
            }
        };

        // Mouse rotation speeds
        tagCanvas.addEventListener('mousemove', (e) => {
            const rect = tagCanvas.getBoundingClientRect();
            const x = e.clientX - rect.left - tagCanvas.width / 2;
            const y = e.clientY - rect.top - tagCanvas.height / 2;
            
            // Adjust angular speeds based on cursor coordinates
            activeRotationX = -y * 0.085;
            activeRotationY = x * 0.085;
        });

        // Dynamic category card filters
        categoryCards.forEach((card, idx) => {
            card.addEventListener('click', () => {
                categoryCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                
                currentSetIndex = idx;
                if (activeCategoryLabel) {
                    activeCategoryLabel.innerText = card.querySelector('h4').innerText;
                    // Apply dynamic border glow update
                    const colorVal = getComputedStyle(document.documentElement).getPropertyValue('--color-' + getCategoryColorKey(idx)).trim();
                    activeCategoryLabel.style.color = colorVal;
                    activeCategoryLabel.style.borderColor = colorVal;
                }
                
                buildSphere(idx);
            });
        });

        // Initialize Sphere Set
        buildSphere(0);
        
        // Loop run sphere ticks
        const animateSphere = () => {
            drawSphere();
            requestAnimationFrame(animateSphere);
        };

        window.addEventListener('resize', () => {
            width = tagCanvas.parentElement.clientWidth;
            tagCanvas.width = width;
        });

        animateSphere();
    }


    /* ==========================================
       6. 3D PERSPECTIVE MOUSE TILT
       ========================================== */
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    if (window.innerWidth > 768) {
        tiltElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left; // x coordinate relative to boundary
                const y = e.clientY - rect.top;  // y coordinate relative to boundary
                
                const width = rect.width;
                const height = rect.height;
                
                // Translate coordinates to -0.5 to 0.5 ratio
                const px = (x / width) - 0.5;
                const py = (y / height) - 0.5;
                
                // Maximum tilt degrees
                const maxTilt = 10;
                const rx = -py * maxTilt;
                const ry = px * maxTilt;
                
                element.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02, 1.02, 1.02)`;
                element.style.transition = 'transform 0.1s ease';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                element.style.transition = 'transform 0.5s ease';
            });
        });
    }


    /* ==========================================
       7. HIGH-TECH COMMAND CENTER FORM LOGICS
       ========================================== */
    const commandForm = document.getElementById('commandForm');
    const budgetSlider = document.getElementById('cBudget');
    const budgetDisplay = document.getElementById('budgetDisplay');

    // Dynamic slider costs mapping
    const budgets = [
        "Under ₹5 Lakhs",
        "₹5 Lakhs - ₹10 Lakhs",
        "₹10 Lakhs - ₹25 Lakhs",
        "₹25 Lakhs - ₹50 Lakhs",
        "Over ₹50 Lakhs"
    ];

    if (budgetSlider && budgetDisplay) {
        budgetSlider.addEventListener('input', (e) => {
            const index = e.target.value - 1;
            budgetDisplay.innerText = budgets[index];
        });
    }

    if (commandForm) {
        commandForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btnSubmit = commandForm.querySelector('.btn-submit');
            const textEl    = btnSubmit.querySelector('.btn-text');
            const origText  = textEl.innerText;

            // Resolve budget slider to human-readable label
            const rawBudget      = budgetSlider ? (budgetSlider.value - 1) : 1;
            const selectedBudget = budgets[rawBudget] || budgets[1];

            // Build FormData from form (access_key hidden field is already inside)
            const formData = new FormData(commandForm);
            formData.set("subject", "SPARK R&D Labs — New Project Inquiry");
            formData.set("Budget",  selectedBudget);

            // Show transmitting animation
            textEl.innerText = "TRANSMITTING MISSION DATA...";
            btnSubmit.style.backgroundColor = "var(--color-blue)";
            btnSubmit.style.color = "#000";
            btnSubmit.disabled = true;

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });

                const data = await response.json();
                console.log("[SPARK] Web3Forms response:", data);

                if (data.success) {
                    // ✅ SUCCESS
                    textEl.innerText = "MISSION DIRECTIVE LOCKED ✓";
                    btnSubmit.style.backgroundColor = "var(--color-green)";
                    btnSubmit.style.boxShadow = "0 5px 25px rgba(0, 230, 118, 0.4)";
                    commandForm.reset();
                    if (budgetDisplay) budgetDisplay.innerText = budgets[1];
                } else {
                    throw new Error(data.message || "Web3Forms rejected the request");
                }

            } catch (error) {
                // ❌ ERROR — check console for details
                console.error("[SPARK] Submit error:", error.message);
                textEl.innerText = "ERROR — TRY AGAIN";
                btnSubmit.style.backgroundColor = "#cc0000";
                btnSubmit.style.color = "#fff";

            } finally {
                btnSubmit.disabled = false;
                setTimeout(() => {
                    textEl.innerText = origText;
                    btnSubmit.style.backgroundColor = "#fff";
                    btnSubmit.style.color = "#000";
                    btnSubmit.style.boxShadow = "none";
                }, 3500);
            }
        });
    }

});
