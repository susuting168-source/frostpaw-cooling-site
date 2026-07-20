const nav = document.querySelector('[data-nav]');
const toggle = document.querySelector('[data-menu-toggle], [data-nav-toggle]');
const modal = document.querySelector('[data-modal]');
const modalContent = document.querySelector('[data-modal-content]');
const modalPanel = modal?.querySelector('.modal-panel');

if (toggle && nav) {
  toggle.setAttribute('aria-expanded', 'false');

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  nav.addEventListener('click', event => {
    if (event.target.matches('a')) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('click', event => {
    if (!nav.classList.contains('is-open')) return;
    if (!nav.contains(event.target) && !toggle.contains(event.target)) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const heroSlider = document.querySelector('[data-hero-slider]');
if (heroSlider) {
  const slides = [...heroSlider.querySelectorAll('[data-hero-slide]')];
  const dots = [...heroSlider.querySelectorAll('[data-hero-dot]')];
  const prevBtn = heroSlider.querySelector('[data-hero-prev]');
  const nextBtn = heroSlider.querySelector('[data-hero-next]');
  let current = 0;
  let timer;

  const showSlide = index => {
    if (!slides.length) return;
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === current));
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));
  };

  const stopAuto = () => {
    if (timer) clearInterval(timer);
  };

  const startAuto = () => {
    stopAuto();
    if (slides.length > 1) {
      timer = setInterval(() => showSlide(current + 1), 4800);
    }
  };

  if (prevBtn) prevBtn.addEventListener('click', () => {
    showSlide(current - 1);
    startAuto();
  });

  if (nextBtn) nextBtn.addEventListener('click', () => {
    showSlide(current + 1);
    startAuto();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      startAuto();
    });
  });

  heroSlider.addEventListener('mouseenter', stopAuto);
  heroSlider.addEventListener('mouseleave', startAuto);

  showSlide(0);
  startAuto();
}

const createImageGallery = (title, images) => {
  if (!images.length) return '';

  const mainImage = images[0];
  const thumbs = images.length > 1
    ? `<div class="modal-thumbs">${images.map((src, index) => `
        <button class="modal-thumb ${index === 0 ? 'is-active' : ''}" type="button" data-modal-thumb="${src}" aria-label="Show product image ${index + 1}">
          <img src="${src}" alt="${title} image ${index + 1}">
        </button>`).join('')}
      </div>`
    : '';

  return `
    <div class="modal-gallery">
      <img class="modal-main-image" src="${mainImage}" alt="${title}" data-modal-main-image>
      ${thumbs}
    </div>`;
};

const createDetailsList = items => {
  if (!items.length) return '';
  return `<ul class="modal-detail-list">${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
};

const createActions = detail => {
  const detailButton = detail
    ? `<a class="btn btn-outline full" href="${detail}">View Product Detail</a>`
    : '';

  return `
    <div class="modal-actions">
      ${detailButton}
      <a class="btn btn-primary full" href="contact.html" data-modal-close>Request Wholesale Quote →</a>
    </div>`;
};

const createCarTravelModal = (title, subtitle, desc, gallery, detailItems, kicker) => {
  const whatsappText = encodeURIComponent(`Hello FrostPaw Cooling, I would like a wholesale quote for ${title}.`);
  const features = detailItems.slice(0, 3);

  return `
    <div class="modal-car-travel-layout">
      ${createImageGallery(title, gallery)}
      <div class="modal-car-travel-copy">
        <p class="modal-kicker">${kicker || 'FrostPaw Travel Product'}</p>
        <h3 id="product-modal-title">${title}</h3>
        ${subtitle ? `<p class="modal-car-travel-subtitle">${subtitle}</p>` : ''}
        <p class="modal-car-travel-description">${desc}</p>
        <ul class="modal-car-travel-features">${features.map(item => `<li>${item}</li>`).join('')}</ul>
        <a class="modal-whatsapp-cta" href="https://api.whatsapp.com/send?phone=8615277383017&amp;text=${whatsappText}" target="_blank" rel="noopener">Get a Quote on WhatsApp &#x2192;</a>
      </div>
    </div>`;
};

const openModal = card => {
  if (!modal || !modalContent || !card) return;

  const title = card.dataset.product || 'Product';
  const subtitle = card.dataset.subtitle || '';
  const desc = card.dataset.desc || '';
  const img = card.dataset.img || 'assets/images/product-classic.webp';
  const detail = card.dataset.detail || '';
  const gallery = card.dataset.gallery
    ? card.dataset.gallery.split('|').map(item => item.trim()).filter(Boolean)
    : [img];
  const detailItems = card.dataset.details
    ? card.dataset.details.split('||').map(item => item.trim()).filter(Boolean)
    : [];
  const isCarTravel = card.dataset.modalLayout === 'car-travel';
  const modalKicker = card.dataset.modalKicker || '';

  modalPanel?.classList.toggle('modal-panel--car-travel', isCarTravel);

  modalContent.innerHTML = isCarTravel
    ? createCarTravelModal(title, subtitle, desc, gallery, detailItems, modalKicker)
    : `
      ${createImageGallery(title, gallery)}
      <h3 id="product-modal-title">${title}</h3>
      ${subtitle ? `<p class="modal-subtitle">${subtitle}</p>` : ''}
      <p>${desc}</p>
      ${createDetailsList(detailItems)}
      ${createActions(detail)}
    `;

  const mainImage = modalContent.querySelector('[data-modal-main-image]');
  const thumbs = modalContent.querySelectorAll('[data-modal-thumb]');
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      if (!mainImage) return;
      mainImage.src = thumb.dataset.modalThumb;
      thumbs.forEach(item => item.classList.remove('is-active'));
      thumb.classList.add('is-active');
    });
  });

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
};

const closeModal = () => {
  if (!modal) return;
  modal.classList.remove('is-open');
  modalPanel?.classList.remove('modal-panel--car-travel');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
};

document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', event => {
    if (event.target.closest('a, button')) return;
    openModal(card);
  });
  card.addEventListener('keydown', event => {
    if (event.target.closest('a, button')) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openModal(card);
    }
  });
  card.setAttribute('tabindex', '0');
});

if (modal) {
  modal.addEventListener('click', event => {
    if (event.target.closest('[data-modal-close]')) {
      closeModal();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
}

document.querySelectorAll('[data-quote-form]').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get('name') || '';
    const email = formData.get('email') || '';
    const phone = formData.get('phone') || '';
    const company = formData.get('company') || '';
    const country = formData.get('country') || '';
    const quantity = formData.get('moq') || '';
    const message = formData.get('message') || '';
    const note = form.querySelector('[data-form-note]');

    const whatsappMessage = [
      'Hello FrostPaw Cooling, I would like to get a wholesale quote for pet cooling mats.',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone / WhatsApp: ${phone}`,
      `Company: ${company}`,
      `Country / Region: ${country}`,
      `Estimated Quantity: ${quantity}`,
      `Message: ${message || 'Please share product catalog, MOQ, pricing and OEM options.'}`,
      '',
      `Source: ${window.location.href}`
    ].join('\n');

    const whatsappUrl = `https://api.whatsapp.com/send?phone=8615277383017&text=${encodeURIComponent(whatsappMessage)}`;

    if (note) {
      note.textContent = 'Opening WhatsApp with your inquiry details...';
    }

    window.open(whatsappUrl, '_blank', 'noopener');
  });
});
