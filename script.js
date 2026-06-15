// ── NAVBAR: scroll shadow + active link ──
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);

  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
});

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
});

document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) navLinksEl.classList.remove('open');
});

// ── TABS ──
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = 'tab-' + btn.dataset.tab;
    const parent = btn.closest('.container') || btn.closest('section');

    btn.closest('.tabs').querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('.tab-content').forEach(tc => {
      if (tc.id === targetId) tc.classList.add('active');
      else if (btn.closest('section').contains(tc)) tc.classList.remove('active');
    });
  });
});

// ── ACCORDION ──
document.querySelectorAll('.accordion-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const body = btn.nextElementSibling;
    const isOpen = btn.classList.contains('open');

    // Sluit alle andere in dezelfde groep
    btn.closest('.accordion-group').querySelectorAll('.accordion-btn').forEach(b => {
      b.classList.remove('open');
      b.nextElementSibling.classList.remove('open');
    });

    if (!isOpen) {
      btn.classList.add('open');
      body.classList.add('open');
    }
  });
});

// ── FILM LINK BUTTONS ──
document.querySelectorAll('.film-card').forEach(card => {
  const input = card.querySelector('.link-input');
  const btn   = card.querySelector('.link-btn');
  if (!input || !btn) return;

  input.addEventListener('input', () => {
    const val = input.value.trim();
    btn.href = val || '#';
    btn.style.opacity = val ? '1' : '0.5';
  });
  btn.style.opacity = '0.5';
});

// ── FOOTER JAAR ──
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── EDITABLE AREA: verwijder placeholder bij typen ──
document.querySelectorAll('[contenteditable]').forEach(el => {
  el.addEventListener('focus', () => el.classList.add('focused'));
  el.addEventListener('blur',  () => el.classList.remove('focused'));
});

// ── LESSITUATIE SCHERM ──
const lsScreen     = document.getElementById('lsScreen');
const lsBack       = document.getElementById('lsBack');
const lsTitle      = document.getElementById('lsTitle');
const lsNavTitle   = document.getElementById('lsNavTitle');
const lsVideo      = document.getElementById('lsVideo');
const lsFileInput  = document.getElementById('lsFileInput');
const lsUploadText = document.getElementById('lsUploadText');
const lsIframe     = document.getElementById('lsIframe');
const lsUploadLabel = document.getElementById('lsUploadLabel');

document.querySelectorAll('.film-card[data-situatie]').forEach(card => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', () => {
    const title   = card.dataset.title;
    const video   = card.dataset.video;
    const lesplan = card.dataset.lesplan || '';

    lsTitle.textContent    = title;
    lsNavTitle.textContent = title;
    lsVideo.src            = video;

    // Lesplan: automatisch laden als pad bekend is
    if (lesplan) {
      lsIframe.src = lesplan + '#toolbar=0&navpanes=0&scrollbar=1&view=FitH';
      lsIframe.classList.remove('hidden');
      lsUploadLabel.style.display = 'none';
    } else {
      lsIframe.src = '';
      lsIframe.classList.add('hidden');
      lsUploadLabel.style.display = '';
      lsUploadText.textContent = 'Lesplan selecteren (PDF)';
    }

    lsScreen.classList.add('open');
    lsScreen.scrollTop = 0;
    window.scrollTo(0, 0);
  });
});

function closeLsScreen() {
  lsScreen.classList.remove('open');
  lsVideo.pause();
  lsVideo.src = '';
}

lsBack.addEventListener('click', closeLsScreen);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLsScreen(); });

// Lesplan PDF inladen
lsFileInput.addEventListener('change', () => {
  const file = lsFileInput.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  lsUploadText.textContent = file.name;
  lsUploadLabel.style.borderStyle = 'solid';
  lsUploadLabel.style.borderColor = 'var(--blue)';
  lsIframe.src = url;
  lsIframe.classList.remove('hidden');
});

// ── SMOOTH SCROLL voor nav links ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navLinksEl.classList.remove('open');
    }
  });
});

// ── FILE UPLOAD: bestandsnaam tonen ──
document.querySelectorAll('.file-upload input[type="file"]').forEach(input => {
  input.addEventListener('change', () => {
    const label = input.closest('.file-upload').querySelector('span');
    if (input.files.length === 0) { label.textContent = 'Bestand uploaden'; return; }
    if (input.files.length === 1) {
      label.textContent = input.files[0].name;
    } else {
      label.textContent = `${input.files.length} bestanden geselecteerd`;
    }
  });
});
