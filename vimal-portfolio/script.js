document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Intersection Observer for 3D Scrolling ---
    const reveals = document.querySelectorAll('.mass-reveal');
    const observerOptions = { threshold: 0.2, rootMargin: "0px 0px -100px 0px" };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, observerOptions);

    reveals.forEach(reveal => revealObserver.observe(reveal));

    // --- 2. Live Cinematic Light Dust Engine ---
    const canvas = document.getElementById('cinematic-canvas');
    const ctx = canvas.getContext('2d');
    let width, height, particles = [];
    let mouse = { x: null, y: null, radius: 200 };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class DustParticle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 3 + 1;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 20) + 1;
            // Gold light particles
            this.color = `rgba(212, 175, 55, ${Math.random() * 0.5})`;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 15;
            ctx.shadowColor = "rgba(212, 175, 55, 1)";
            ctx.fill();
        }

        update() {
            // Mouse pushes the dust away softly
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let force = (mouse.radius - distance) / mouse.radius;
                this.x -= forceDirectionX * force * this.density;
                this.y -= forceDirectionY * force * this.density;
            } else {
                // Return to base position with a floating effect
                if (this.x !== this.baseX) this.x -= (this.x - this.baseX) / 30;
                if (this.y !== this.baseY) this.y -= (this.y - this.baseY) / 30;
            }

            // Slow upward cinematic drift
            this.baseY -= 0.2;
            if (this.baseY < -10) this.baseY = height + 10;
        }
    }

    function init() {
        particles = [];
        for (let i = 0; i < (width * height) / 10000; i++) {
            particles.push(new DustParticle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        requestAnimationFrame(animate);
    }

    init();
    animate();

    // Welcome Video Click to Play
    const playBtn = document.getElementById('playWelcomeBtn');
    const welcomeVideo = document.getElementById('welcomeVideo');
    const welcomeLogo = document.getElementById('welcomeLogo');
    const playIcon = document.getElementById('playIcon');
    const watermarkPatch = document.getElementById('watermarkPatch');

    if (playBtn && welcomeVideo) {
        playBtn.addEventListener('click', () => {
            welcomeVideo.style.display = 'block';
            if (watermarkPatch) watermarkPatch.style.display = 'block';
            welcomeVideo.play();
            welcomeLogo.style.display = 'none';
            playIcon.style.display = 'none';
            playBtn.classList.remove('clickable');

            if (playBtn.requestFullscreen) {
                playBtn.requestFullscreen().catch(err => console.log(err));
            } else if (playBtn.webkitRequestFullscreen) { /* Safari */
                playBtn.webkitRequestFullscreen();
            } else if (playBtn.msRequestFullscreen) { /* IE11 */
                playBtn.msRequestFullscreen();
            }
        });

        welcomeVideo.addEventListener('ended', () => {
            welcomeVideo.style.display = 'none';
            if (watermarkPatch) watermarkPatch.style.display = 'none';
            welcomeLogo.style.display = 'block';
            playIcon.style.display = 'block';
            playBtn.classList.add('clickable');

            if (document.fullscreenElement) {
                document.exitFullscreen().catch(err => console.log(err));
            } else if (document.webkitFullscreenElement) {
                document.webkitExitFullscreen();
            } else if (document.msFullscreenElement) {
                document.msExitFullscreen();
            }
        });
    }
});