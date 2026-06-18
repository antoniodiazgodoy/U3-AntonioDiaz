///--- Zoom
//---const boton = document.getElementById('clic');
//const div = document.getElementById('clicc');

//boton.addEventListener('click', () => {
//  div.classList.toggle('mov');
//});








// --- GALERÍA: Carrusel Coverflow 3D ---
(function initGalleryCarousel() {
  const carousel = document.querySelector('.gallery-carousel');
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll('.gallery-slide'));
  const dots = Array.from(carousel.querySelectorAll('.gallery-dot'));
  const prevBtn = carousel.querySelector('.gallery-arrow--prev');
  const nextBtn = carousel.querySelector('.gallery-arrow--next');

  let currentIndex = 0;
  const total = slides.length;

  function updateSlideClasses() {
    slides.forEach((slide, i) => {
      slide.classList.remove('active', 'prev', 'next', 'hidden');

      if (i === currentIndex) {
        slide.classList.add('active');
      } else if (i === (currentIndex - 1 + total) % total) {
        slide.classList.add('prev');
      } else if (i === (currentIndex + 1) % total) {
        slide.classList.add('next');
      } else {
        slide.classList.add('hidden');
      }
    });

    dots.forEach((dot, i) => {
      const isActive = i === currentIndex;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  function goTo(index) {
    currentIndex = ((index % total) + total) % total;
    updateSlideClasses();
  }

  prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
  nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i));
  });

  slides.forEach((slide, i) => {
    slide.addEventListener('click', () => {
      if (i !== currentIndex) goTo(i);
    });
  });

  updateSlideClasses();
})();