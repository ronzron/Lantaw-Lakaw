// ============================================================
//  Lantaw-Lakaw — main.js
// ============================================================

(function () {
  'use strict';

  /* ---- Navbar scroll effect ---- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  /* ---- Mobile hamburger ---- */
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    // Close when a link is tapped
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ---- Active nav link ---- */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---- Scroll-to-top button ---- */
  const scrollBtn = document.getElementById('scrollTop');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---- Photo Lightbox ---- */
  const lightbox        = document.getElementById('lightbox');
  const lightboxImg     = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose   = document.getElementById('lightboxClose');
  const lightboxPrev    = document.getElementById('lightboxPrev');
  const lightboxNext    = document.getElementById('lightboxNext');
  const galleryItems    = Array.from(document.querySelectorAll('.gallery-item[data-img]'));
  let currentLightbox   = 0;

  function openLightbox(index) {
    currentLightbox = index;
    const item = galleryItems[index];
    lightboxImg.src = item.dataset.img;
    lightboxImg.alt = item.dataset.caption || '';
    lightboxCaption.textContent = item.dataset.caption || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  function shiftLightbox(dir) {
    const next = (currentLightbox + dir + galleryItems.length) % galleryItems.length;
    openLightbox(next);
  }

  if (lightbox) {
    galleryItems.forEach((item, i) => {
      item.addEventListener('click', () => openLightbox(i));
    });
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => shiftLightbox(-1));
    lightboxNext.addEventListener('click', () => shiftLightbox(1));
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowLeft')  shiftLightbox(-1);
      if (e.key === 'ArrowRight') shiftLightbox(1);
    });
  }

  /* ---- Trail filter tabs ---- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const trailCards = document.querySelectorAll('.trail-detail-card[data-difficulty]');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        trailCards.forEach(card => {
          card.style.display =
            (filter === 'all' || card.dataset.difficulty === filter) ? '' : 'none';
        });
      });
    });
  }

})();
