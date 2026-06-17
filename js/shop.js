/* ============================================================
   ATELIER NOIR — Shop Logic Module
   Filtering, sorting, cart interactions, product page logic
   ============================================================ */

import { addToCart } from './main.js';

/* ============================================================
   PRODUCT DATA
   ============================================================ */
export const PRODUCTS = [
  {
    id: 1,
    name: 'Dune Tote',
    price: 890,
    collection: 'The Desert Line',
    category: 'bags',
    images: [
      'assets/images/dune-tote-1.jpg',
      'assets/images/dune-tote-2.jpg',
      'assets/images/dune-tote-3.jpg'
    ],
    image: 'assets/images/dune-tote-1.jpg',
    imageHover: 'assets/images/dune-tote-2.jpg',
    description: 'Hand-stitched from full-grain vegetable-tanned leather, the Dune Tote embodies quiet luxury. Its unlined construction softens with age, developing a patina as unique as its owner.',
    colors: ['#2c2218', '#7a6650', '#c9a96a'],
    sizes: ['One Size'],
  },
  {
    id: 2,
    name: 'Nocturne Crossbody',
    price: 640,
    collection: 'Nocturne',
    category: 'bags',
    images: [
      'assets/images/nocturne-crossbody-1.jpg',
      'assets/images/nocturne-crossbody-2.jpg',
      'assets/images/nocturne-crossbody-3.jpg'
    ],
    image: 'assets/images/nocturne-crossbody-1.jpg',
    imageHover: 'assets/images/nocturne-crossbody-2.jpg',
    description: 'Minimal. Refined. The Nocturne Crossbody distills evening elegance into a single gesture. Crafted from Italian nappa leather with hand-finished edges.',
    colors: ['#0a0a0a', '#2c2218'],
    sizes: ['One Size'],
  },
  {
    id: 3,
    name: 'Atlas Weekender',
    price: 1250,
    collection: 'Heritage Leather',
    category: 'bags',
    images: [
      'assets/images/atlas-weekender-1.jpg',
      'assets/images/atlas-weekender-2.jpg',
      'assets/images/atlas-weekender-3.jpg'
    ],
    image: 'assets/images/atlas-weekender-1.jpg',
    imageHover: 'assets/images/atlas-weekender-2.jpg',
    description: 'For those who travel with intention. The Atlas Weekender offers generous proportions with exquisite construction — brass hardware, reinforced base, and a removable shoulder strap.',
    colors: ['#2c2218', '#4a3728'],
    sizes: ['One Size'],
  },
  {
    id: 4,
    name: 'Sahara Card Holder',
    price: 180,
    collection: 'The Desert Line',
    category: 'accessories',
    images: [
      'assets/images/sahara-cardholder-1.jpg',
      'assets/images/sahara-cardholder-2.jpg',
      'assets/images/sahara-cardholder-3.jpg'
    ],
    image: 'assets/images/sahara-cardholder-1.jpg',
    imageHover: 'assets/images/sahara-cardholder-2.jpg',
    description: 'A study in proportion and material. Six card slots and a center pocket, cut from a single piece of bridle leather. Slim enough to forget, beautiful enough to display.',
    colors: ['#2c2218', '#c9a96a', '#0a0a0a'],
    sizes: ['One Size'],
  },
  {
    id: 5,
    name: 'Mirage Belt',
    price: 320,
    collection: 'The Desert Line',
    category: 'accessories',
    images: [
      'assets/images/mirage-belt-1.jpg',
      'assets/images/mirage-belt-2.jpg',
      'assets/images/mirage-belt-3.jpg'
    ],
    image: 'assets/images/mirage-belt-1.jpg',
    imageHover: 'assets/images/mirage-belt-2.jpg',
    description: 'Our signature belt in desert-tanned full-grain leather. Solid brass buckle, hand-burnished edges. Each piece is cut to order.',
    colors: ['#2c2218', '#0a0a0a'],
    sizes: ['85cm', '90cm', '95cm', '100cm', '105cm'],
  },
  {
    id: 6,
    name: 'Eclipse Clutch',
    price: 540,
    collection: 'Nocturne',
    category: 'bags',
    images: [
      'assets/images/eclipse-clutch-1.jpg',
      'assets/images/eclipse-clutch-2.jpg',
      'assets/images/eclipse-clutch-3.jpg'
    ],
    image: 'assets/images/eclipse-clutch-1.jpg',
    imageHover: 'assets/images/eclipse-clutch-2.jpg',
    description: 'The Eclipse Clutch captures light and shadow in its minimal silhouette. Lambskin-lined interior with magnetic closure. An evening essential.',
    colors: ['#0a0a0a', '#2c2218', '#c9a96a'],
    sizes: ['One Size'],
  },
  {
    id: 7,
    name: 'Oasis Backpack',
    price: 1150,
    collection: 'The Desert Line',
    category: 'bags',
    images: [
      'assets/images/oasis-backpack-1.jpg',
      'assets/images/oasis-backpack-2.jpg',
      'assets/images/oasis-backpack-3.jpg'
    ],
    image: 'assets/images/oasis-backpack-1.jpg',
    imageHover: 'assets/images/oasis-backpack-2.jpg',
    description: 'Utilitarian function meets quiet luxury. The Oasis Backpack is constructed from our signature vegetable-tanned leather, featuring padded straps and a dedicated laptop sleeve.',
    colors: ['#2c2218', '#0a0a0a'],
    sizes: ['One Size'],
  },
  {
    id: 8,
    name: 'Crescent Pouch',
    price: 420,
    collection: 'Nocturne',
    category: 'accessories',
    images: [
      'assets/images/crescent-pouch-1.jpg',
      'assets/images/crescent-pouch-2.jpg',
      'assets/images/crescent-pouch-3.jpg'
    ],
    image: 'assets/images/crescent-pouch-1.jpg',
    imageHover: 'assets/images/crescent-pouch-2.jpg',
    description: 'A sculptural piece designed to hold your essentials. The Crescent Pouch features a structured base and a soft, gathered top, finished with a subtle logo emboss.',
    colors: ['#0a0a0a', '#c9a96a'],
    sizes: ['One Size'],
  },
  {
    id: 9,
    name: 'Nomad Wallet',
    price: 250,
    collection: 'Heritage Leather',
    category: 'accessories',
    images: [
      'assets/images/nomad-wallet-1.jpg',
      'assets/images/nomad-wallet-2.jpg',
      'assets/images/nomad-wallet-3.jpg'
    ],
    image: 'assets/images/nomad-wallet-1.jpg',
    imageHover: 'assets/images/nomad-wallet-2.jpg',
    description: 'A classic bifold wallet redefined. Crafted from full-grain leather, it features eight card slots, two bill compartments, and burnished edges that will age beautifully.',
    colors: ['#4a3728', '#2c2218'],
    sizes: ['One Size'],
  },
];


/* ============================================================
   COLLECTION PAGE — FILTER & SORT
   ============================================================ */
let activeFilter = 'all';
let activeSort = 'featured';

export function initCollectionPage() {
  const grid = document.querySelector('.product-grid__grid');
  const chips = document.querySelectorAll('.filter-chip');
  const sortSelect = document.querySelector('.sort-select');
  const countEl = document.querySelector('.collection-hero__count');

  if (!grid) return;

  const params = new URLSearchParams(window.location.search);
  const collectionParam = params.get('collection');
  const heroTitle = document.querySelector('.collection-hero__title');

  if (collectionParam) {
    activeFilter = 'collection:' + collectionParam;
    if (heroTitle) heroTitle.textContent = collectionParam;
    // Deactivate generic chips
    chips.forEach((c) => c.classList.remove('filter-chip--active'));
  }

  // Render initial products based on filter
  updateProducts(grid, countEl, true);

  // Filter chips
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('filter-chip--active'));
      chip.classList.add('filter-chip--active');
      activeFilter = chip.dataset.filter;
      updateProducts(grid, countEl);
    });
  });

  // Sort
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      activeSort = sortSelect.value;
      updateProducts(grid, countEl);
    });
  }

  // Add to bag buttons (delegated)
  grid.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.product-card__add');
    if (addBtn) {
      e.preventDefault();
      addToCart();
      addBtn.textContent = 'Added ✓';
      setTimeout(() => {
        addBtn.textContent = 'Add to Bag';
      }, 1500);
    }
  });
}

function updateProducts(grid, countEl, initial = false) {
  let filtered = [...PRODUCTS];
  
  if (activeFilter !== 'all') {
    if (activeFilter.startsWith('collection:')) {
      const collectionName = activeFilter.replace('collection:', '');
      filtered = filtered.filter(p => p.collection === collectionName);
    } else {
      filtered = filtered.filter(p => p.category === activeFilter);
    }
  }

  // Sort
  switch (activeSort) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'name':
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      break; // featured = default order
  }

  if (countEl) countEl.textContent = `${filtered.length} pieces`;

  if (initial) {
    renderProducts(grid, filtered);
    return;
  }

  // Animate out
  gsap.to(grid.children, {
    opacity: 0,
    y: 20,
    duration: 0.3,
    stagger: 0.03,
    ease: 'power2.in',
    onComplete: () => {
      renderProducts(grid, filtered);
      // Animate in
      gsap.fromTo(
        grid.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: 'power3.out',
        }
      );
    },
  });
}

function renderProducts(grid, products) {
  grid.innerHTML = products
    .map(
      (p) => `
    <article class="product-card" data-category="${p.category}">
      <a href="product.html?id=${p.id}" class="product-card__img-wrap">
        <img src="${p.image}" alt="${p.name}" class="product-card__img product-card__img--primary" loading="lazy" />
        <img src="${p.imageHover}" alt="${p.name} detail" class="product-card__img product-card__img--hover" loading="lazy" />
        <button class="product-card__add" aria-label="Add ${p.name} to bag">Add to Bag</button>
      </a>
      <h3 class="product-card__name">${p.name}</h3>
      <p class="product-card__price">£${p.price.toLocaleString()}</p>
    </article>
  `
    )
    .join('');
}


/* ============================================================
   PRODUCT DETAIL PAGE
   ============================================================ */
export function initProductPage() {
  const pdp = document.querySelector('.pdp');
  if (!pdp) return;

  // Get product ID from URL
  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get('id')) || 1;
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];

  // Fill product data
  fillProductData(product);

  // Image gallery
  initGallery();

  // Size / color selectors
  initSelectors();

  // Accordion
  initAccordions();

  // Add to bag
  const addBtn = document.querySelector('.pdp__add-to-bag');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      addToCart();
      addBtn.querySelector('span').textContent = 'Added to Bag ✓';
      setTimeout(() => {
        addBtn.querySelector('span').textContent = 'Add to Bag';
      }, 2000);
    });
  }

  // Related products
  renderRelatedProducts(product);

  // Image zoom
  initImageZoom();
}

function fillProductData(product) {
  const nameEl = document.querySelector('.pdp__name');
  const priceEl = document.querySelector('.pdp__price');
  const descEl = document.querySelector('.pdp__desc');
  const collectionEl = document.querySelector('.pdp__collection-name');
  const mainImg = document.querySelector('.pdp__main-img');
  const breadcrumbName = document.querySelector('.pdp__breadcrumb-name');

  if (nameEl) nameEl.textContent = product.name;
  if (priceEl) priceEl.textContent = `£${product.price.toLocaleString()}`;
  if (descEl) descEl.textContent = product.description;
  if (collectionEl) collectionEl.textContent = product.collection;
  if (mainImg) {
    mainImg.src = product.image;
    mainImg.alt = product.name;
  }
  if (breadcrumbName) breadcrumbName.textContent = product.name;

  // Set thumbnails
  const thumbContainer = document.querySelector('.pdp__thumbnails');
  if (thumbContainer) {
    thumbContainer.innerHTML = `
      <button class="pdp__thumb pdp__thumb--active" data-img="${product.images[0]}" aria-label="View front image">
        <img src="${product.images[0]}" alt="${product.name} front" loading="lazy" />
      </button>
      <button class="pdp__thumb" data-img="${product.images[1]}" aria-label="View 3/4 angle image">
        <img src="${product.images[1]}" alt="${product.name} 3/4 angle" loading="lazy" />
      </button>
      <button class="pdp__thumb" data-img="${product.images[2]}" aria-label="View macro detail image">
        <img src="${product.images[2]}" alt="${product.name} macro detail" loading="lazy" />
      </button>
    `;
  }

  // Colors
  const colorContainer = document.querySelector('.pdp__color-options');
  if (colorContainer && product.colors) {
    colorContainer.innerHTML = product.colors
      .map(
        (c, i) => `
      <button class="pdp__color-option ${i === 0 ? 'pdp__color-option--active' : ''}"
              aria-label="Select color ${c}">
        <span class="pdp__color-swatch" style="background: ${c}"></span>
      </button>
    `
      )
      .join('');
  }

  // Sizes
  const sizeContainer = document.querySelector('.pdp__size-options');
  if (sizeContainer && product.sizes) {
    sizeContainer.innerHTML = product.sizes
      .map(
        (s, i) => `
      <button class="pdp__option ${i === 0 ? 'pdp__option--active' : ''}">${s}</button>
    `
      )
      .join('');
  }
}

function initGallery() {
  const mainImg = document.querySelector('.pdp__main-img');
  const thumbs = document.querySelectorAll('.pdp__thumb');

  document.addEventListener('click', (e) => {
    const thumb = e.target.closest('.pdp__thumb');
    if (!thumb || !mainImg) return;

    // Update active
    document.querySelectorAll('.pdp__thumb').forEach((t) => t.classList.remove('pdp__thumb--active'));
    thumb.classList.add('pdp__thumb--active');

    // Crossfade
    gsap.to(mainImg, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        mainImg.src = thumb.dataset.img;
        gsap.to(mainImg, {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        });
      },
    });
  });
}

function initSelectors() {
  document.addEventListener('click', (e) => {
    const option = e.target.closest('.pdp__option');
    if (option) {
      option.parentElement
        .querySelectorAll('.pdp__option')
        .forEach((o) => o.classList.remove('pdp__option--active'));
      option.classList.add('pdp__option--active');
    }

    const color = e.target.closest('.pdp__color-option');
    if (color) {
      document
        .querySelectorAll('.pdp__color-option')
        .forEach((c) => c.classList.remove('pdp__color-option--active'));
      color.classList.add('pdp__color-option--active');
    }
  });
}

function initAccordions() {
  document.querySelectorAll('.pdp__accordion-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.pdp__accordion-item');
      const content = item.querySelector('.pdp__accordion-content');
      const isOpen = item.classList.contains('pdp__accordion-item--open');

      if (isOpen) {
        item.classList.remove('pdp__accordion-item--open');
        gsap.to(content, {
          maxHeight: 0,
          duration: 0.4,
          ease: 'power3.inOut',
        });
      } else {
        item.classList.add('pdp__accordion-item--open');
        gsap.to(content, {
          maxHeight: content.scrollHeight + 20,
          duration: 0.4,
          ease: 'power3.inOut',
        });
      }
    });
  });
}

function initImageZoom() {
  const imgWrap = document.querySelector('.pdp__main-img-wrap');
  const img = document.querySelector('.pdp__main-img');
  if (!imgWrap || !img) return;

  imgWrap.addEventListener('mousemove', (e) => {
    const rect = imgWrap.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    img.style.transformOrigin = `${x}% ${y}%`;
  });

  imgWrap.addEventListener('mouseleave', () => {
    img.style.transformOrigin = 'center center';
  });
}

function renderRelatedProducts(currentProduct) {
  const grid = document.querySelector('.related__grid');
  if (!grid) return;

  const related = PRODUCTS.filter((p) => p.id !== currentProduct.id).slice(0, 4);

  grid.innerHTML = related
    .map(
      (p) => `
    <article class="product-card">
      <a href="product.html?id=${p.id}" class="product-card__img-wrap">
        <img src="${p.image}" alt="${p.name}" class="product-card__img product-card__img--primary" loading="lazy" />
        <img src="${p.imageHover}" alt="${p.name} detail" class="product-card__img product-card__img--hover" loading="lazy" />
      </a>
      <h3 class="product-card__name">${p.name}</h3>
      <p class="product-card__price">£${p.price.toLocaleString()}</p>
    </article>
  `
    )
    .join('');
}
