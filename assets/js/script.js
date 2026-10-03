'use strict';

if (window.lucide) window.lucide.createIcons();

const header = document.querySelector('[data-header]');
const navbar = document.querySelector('[data-navbar]');
const overlay = document.querySelector('[data-overlay]');
const navOpenBtn = document.querySelector('[data-nav-open-btn]');
const navCloseBtn = document.querySelector('[data-nav-close-btn]');
const desktopMenu = window.matchMedia('(min-width: 1200px)');

function setMenuOpen(open, restoreFocus = false) {
  const isOpen = open && !desktopMenu.matches;
  navbar.classList.toggle('active', isOpen);
  overlay.classList.toggle('active', isOpen);
  document.body.classList.toggle('nav-open', isOpen);
  navOpenBtn.setAttribute('aria-expanded', String(isOpen));
  navbar.inert = !desktopMenu.matches && !isOpen;

  if (isOpen) navCloseBtn.focus();
  if (restoreFocus) navOpenBtn.focus();
}

navOpenBtn.addEventListener('click', () => setMenuOpen(true));
navCloseBtn.addEventListener('click', () => setMenuOpen(false, true));
overlay.addEventListener('click', () => setMenuOpen(false, true));
document.querySelectorAll('[data-nav-link]').forEach(link => {
  link.addEventListener('click', () => setMenuOpen(false));
});
desktopMenu.addEventListener('change', () => setMenuOpen(false));
setMenuOpen(false);

document.addEventListener('keydown', event => {
  if (!navbar.classList.contains('active')) return;

  if (event.key === 'Escape') setMenuOpen(false, true);
  if (event.key !== 'Tab') return;

  const focusable = [...navbar.querySelectorAll('a[href], button')];
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

function updateHeaderSize() {
  document.documentElement.style.setProperty('--header-top-height', `${header.querySelector('.header-top').offsetHeight}px`);
  document.documentElement.style.setProperty('--header-height', `${header.querySelector('.header-bottom').offsetHeight}px`);
}

new ResizeObserver(updateHeaderSize).observe(header);
updateHeaderSize();

function updateHeaderState() {
  header.classList.toggle('active', window.scrollY >= 40);
}

window.addEventListener('scroll', updateHeaderState, { passive: true });
updateHeaderState();

const propertyItems = [...document.querySelectorAll('.property-list > li')];
const propertySearch = document.querySelector('[data-property-search]');
const favoriteFilter = document.querySelector('[data-favorite-filter]');
const propertyCount = document.querySelector('[data-property-count]');
const emptyProperties = document.querySelector('[data-property-empty]');
const favoritesKey = 'fethiye-emlak-favorites';
let savedProperties = new Set();

// Favorites still work for this visit when browser storage is unavailable.
try {
  const stored = JSON.parse(localStorage.getItem(favoritesKey) || '[]');
  if (Array.isArray(stored)) savedProperties = new Set(stored.filter(id => typeof id === 'string'));
} catch {
  savedProperties = new Set();
}

function updatePropertyFilter() {
  const query = propertySearch.value.trim().toLocaleLowerCase('tr-TR');
  let count = 0;

  propertyItems.forEach(item => {
    const matchesSearch = item.dataset.searchText.includes(query);
    const matchesSaved = !favoriteFilter.checked || savedProperties.has(item.dataset.propertyId);
    item.hidden = !(matchesSearch && matchesSaved);
    if (!item.hidden) count++;
  });

  propertyCount.textContent = `${count} ilan`;
  emptyProperties.hidden = count > 0;
  document.querySelector('.property-list').scrollLeft = 0;
}

propertyItems.forEach(item => {
  const image = item.querySelector('.card-banner img');
  const title = item.querySelector('.card-title').textContent.trim();
  const location = item.querySelector('.banner-actions address').textContent.trim();
  const saveButton = item.querySelector('[data-save-property]');
  item.dataset.propertyId = image.getAttribute('src').split('/').pop();
  item.dataset.searchText = `${title} ${location}`.toLocaleLowerCase('tr-TR');

  function updateSaveButton() {
    const saved = savedProperties.has(item.dataset.propertyId);
    saveButton.setAttribute('aria-pressed', String(saved));
    saveButton.setAttribute('aria-label', `${title} ilanını ${saved ? 'kaydedilenlerden çıkar' : 'kaydet'}`);
    saveButton.dataset.tooltip = saved ? 'Kaydedilenlerden çıkar' : 'İlanı kaydet';
  }

  saveButton.addEventListener('click', () => {
    const id = item.dataset.propertyId;
    if (savedProperties.has(id)) savedProperties.delete(id);
    else savedProperties.add(id);

    try { localStorage.setItem(favoritesKey, JSON.stringify([...savedProperties])); } catch { /* Storage is optional. */ }
    updateSaveButton();
    updatePropertyFilter();
  });

  updateSaveButton();
});

propertySearch.addEventListener('input', updatePropertyFilter);
favoriteFilter.addEventListener('change', updatePropertyFilter);
updatePropertyFilter();

document.querySelectorAll('[data-show-favorites]').forEach(button => button.addEventListener('click', event => {
  event.preventDefault();
  propertySearch.value = '';
  favoriteFilter.checked = true;
  updatePropertyFilter();
  document.querySelector('#property').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  favoriteFilter.focus({ preventScroll: true });
}));

document.querySelectorAll('[data-search-link]').forEach(link => link.addEventListener('click', () => {
  favoriteFilter.checked = false;
  updatePropertyFilter();
  propertySearch.focus({ preventScroll: true });
}));

const propertyDialog = document.querySelector('[data-property-dialog]');

document.querySelectorAll('[data-property-details]').forEach(button => {
  button.addEventListener('click', event => {
    event.preventDefault();
    const card = button.closest('.property-card');
    const image = card.querySelector('.card-banner img');
    const dialogImage = propertyDialog.querySelector('[data-dialog-image]');
    dialogImage.src = image.src;
    dialogImage.alt = image.alt;
    propertyDialog.querySelector('[data-dialog-title]').textContent = card.querySelector('.card-title').textContent.trim();
    propertyDialog.querySelector('[data-dialog-price]').textContent = card.querySelector('.card-price').textContent.trim();
    propertyDialog.querySelector('[data-dialog-location]').textContent = card.querySelector('.banner-actions address').textContent.trim();
    propertyDialog.querySelector('[data-dialog-description]').textContent = card.querySelector('.card-text').textContent.trim();

    const details = [...card.querySelectorAll('.card-item')].map(item => {
      const detail = document.createElement('li');
      detail.textContent = `${item.querySelector('strong').textContent} ${item.querySelector('span').textContent}`;
      return detail;
    });
    propertyDialog.querySelector('[data-dialog-details]').replaceChildren(...details);
    propertyDialog.showModal();
    document.body.classList.add('dialog-open');
  });
});

document.querySelector('[data-dialog-close]').addEventListener('click', () => propertyDialog.close());
document.querySelector('[data-dialog-contact]').addEventListener('click', () => propertyDialog.close());
propertyDialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
propertyDialog.addEventListener('click', event => {
  const bounds = propertyDialog.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (event.target === propertyDialog && outside) propertyDialog.close();
});
