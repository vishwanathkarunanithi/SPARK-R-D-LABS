document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('bg-video');
  const audioToggle = document.getElementById('audio-toggle');
  const iconMuted = document.getElementById('icon-muted');
  const iconUnmuted = document.getElementById('icon-unmuted');

  // Attempt autoplay
  video.play().catch(e => {
    console.log("Autoplay blocked by browser. User interaction required.");
  });

  audioToggle.addEventListener('click', () => {
    if (video.muted) {
      video.muted = false;
      iconMuted.style.display = 'none';
      iconUnmuted.style.display = 'block';
    } else {
      video.muted = true;
      iconMuted.style.display = 'block';
      iconUnmuted.style.display = 'none';
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});
