// --- INTRO: aparición secuencial de octágonos, logo y texto al cargar ---
(function initIntroSequence() {
  const html = document.documentElement;
  const items = Array.from(document.querySelectorAll('.intro-item'));
  if (!items.length) return;

  // Bloquea el scroll mientras dura la intro
  html.classList.add('intro-lock');
  window.scrollTo(0, 0);

  const steps = {
    1: items.filter(el => el.dataset.introStep === '1'), // octágonos
    2: items.filter(el => el.dataset.introStep === '2'), // logo
    3: items.filter(el => el.dataset.introStep === '3')  // texto
  };

  function showStep(stepEls) {
    stepEls.forEach(el => el.classList.add('intro-show'));
  }

  function startSequence() {
    showStep(steps[1]);
    setTimeout(() => showStep(steps[2]), 700);
    setTimeout(() => showStep(steps[3]), 1400);
    setTimeout(() => {
      html.classList.remove('intro-lock');
    }, 2200);
  }

  // Pequeño delay inicial para asegurar que todo esté pintado
  window.requestAnimationFrame(() => {
    setTimeout(startSequence, 150);
  });
})();

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

