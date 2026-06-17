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
const lsYoutube    = document.getElementById('lsYoutube');
const lsFileInput  = document.getElementById('lsFileInput');
const lsUploadText = document.getElementById('lsUploadText');
const lsIframe       = document.getElementById('lsIframe');
const lsClickOverlay = document.getElementById('lsClickOverlay');
const lsUploadLabel  = document.getElementById('lsUploadLabel');
const lsDocLabel        = document.getElementById('lsDocLabel');
const lsFsTitle         = document.getElementById('lsFsTitle');
const lsVidPlaceholder  = document.getElementById('lsVidPlaceholder');
const lsDoc2Block       = document.getElementById('lsDoc2Block');
const lsDoc2Toggle      = document.getElementById('lsDoc2Toggle');
const lsDoc2Body        = document.getElementById('lsDoc2Body');
const lsDoc2Label       = document.getElementById('lsDoc2Label');
const lsIframe2         = document.getElementById('lsIframe2');
const lsFullscreenBtn2  = document.getElementById('lsFullscreenBtn2');
let currentDoc2Src = '';

document.querySelectorAll('.film-card[data-situatie]').forEach(card => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', () => {
    const title          = card.dataset.title;
    const video          = card.dataset.video          || '';
    const youtube        = card.dataset.youtube        || '';
    const lesplan        = card.dataset.lesplan        || '';
    const doclabel       = card.dataset.doclabel       || 'Lesplan';
    const vidplaceholder = card.dataset.vidplaceholder || '';
    const lesplan2       = card.dataset.lesplan2       || '';
    const doclabel2      = card.dataset.doclabel2      || '';

    lsTitle.textContent    = title;
    lsNavTitle.textContent = title;
    lsDocLabel.textContent = doclabel;
    lsFsTitle.textContent  = doclabel;

    // Video: lokaal, YouTube, of placeholder afbeelding
    lsVidPlaceholder.classList.add('hidden');
    lsVidPlaceholder.src = '';
    if (youtube) {
      lsVideo.classList.add('hidden');
      lsVideo.src = '';
      lsYoutube.src = `https://www.youtube.com/embed/${youtube}?rel=0`;
      lsYoutube.classList.remove('hidden');
    } else if (video) {
      lsYoutube.classList.add('hidden');
      lsYoutube.src = '';
      lsVideo.src = video;
      lsVideo.classList.remove('hidden');
    } else if (vidplaceholder) {
      lsYoutube.classList.add('hidden');
      lsYoutube.src = '';
      lsVideo.classList.add('hidden');
      lsVideo.src = '';
      lsVidPlaceholder.src = vidplaceholder;
      lsVidPlaceholder.classList.remove('hidden');
    } else {
      lsYoutube.classList.add('hidden');
      lsYoutube.src = '';
      lsVideo.src = '';
      lsVideo.classList.remove('hidden');
    }

    // Lesplan: reset en dichtklappen
    const lsImg = document.getElementById('lsImg');
    lsLesplanToggle.classList.remove('open');
    lsLesplanBody.classList.add('hidden');
    lsFullscreenBtn.classList.add('hidden');
    lsIframe.src = ''; lsIframe.classList.add('hidden');
    lsImg.src = '';    lsImg.classList.add('hidden');
    lsClickOverlay.classList.add('hidden');
    currentLesplanSrc = '';
    currentLesplanIsImg = false;

    if (lesplan) {
      const isImage = /\.(png|jpg|jpeg|webp)$/i.test(lesplan);
      currentLesplanSrc   = isImage ? lesplan : lesplan + '#toolbar=0&navpanes=0&scrollbar=1';
      currentLesplanIsImg = isImage;
      lsUploadLabel.style.display = 'none';
      if (isImage) { lsImg.src = lesplan; lsImg.classList.remove('hidden'); }
      else          { lsIframe.src = currentLesplanSrc; lsIframe.classList.remove('hidden'); }
      lsClickOverlay.classList.remove('hidden');
    } else {
      lsUploadLabel.style.display = '';
      lsUploadText.textContent = 'Lesplan selecteren (PDF)';
    }

    // Tweede document blok
    lsDoc2Block.classList.add('hidden');
    lsDoc2Toggle.classList.remove('open');
    lsDoc2Body.classList.add('hidden');
    lsIframe2.src = ''; lsIframe2.classList.add('hidden');
    lsFullscreenBtn2.classList.add('hidden');
    currentDoc2Src = '';
    if (lesplan2) {
      lsDoc2Label.textContent = doclabel2;
      currentDoc2Src = lesplan2 + '#toolbar=0&navpanes=0&scrollbar=1';
      lsDoc2Block.classList.remove('hidden');
    }

    lsScreen.classList.add('open');
    lsScreen.scrollTop = 0;
    window.scrollTo(0, 0);
  });
});

function closeLsScreen() {
  lsScreen.classList.remove('open');
  lsVideo.pause();
  lsVideo.src   = '';
  lsYoutube.src = '';
}

lsBack.addEventListener('click', closeLsScreen);

// Lesplan toggle
const lsLesplanToggle = document.getElementById('lsLesplanToggle');
const lsLesplanBody   = document.getElementById('lsLesplanBody');
const lsFullscreenBtn = document.getElementById('lsFullscreenBtn');
const lsFsOverlay     = document.getElementById('lsFsOverlay');
const lsFsClose       = document.getElementById('lsFsClose');
const lsFsIframe      = document.getElementById('lsFsIframe');
const lsFsImg         = document.getElementById('lsFsImg');

let currentLesplanSrc = '';
let currentLesplanIsImg = false;

function closeDoc1() {
  lsLesplanToggle.classList.remove('open');
  lsLesplanBody.classList.add('hidden');
  lsFullscreenBtn.classList.add('hidden');
}

function openDoc1() {
  lsLesplanToggle.classList.add('open');
  lsLesplanBody.classList.remove('hidden');
  if (currentLesplanSrc) lsFullscreenBtn.classList.remove('hidden');
}

lsLesplanToggle.addEventListener('click', () => {
  const isOpen = lsLesplanToggle.classList.contains('open');
  if (isOpen) {
    closeDoc1();
  } else {
    openDoc1();
  }
});

function openLesplanFullscreen() {
  if (!currentLesplanSrc) return;
  lsFsOverlay.classList.remove('hidden');
  if (currentLesplanIsImg) {
    lsFsImg.src = currentLesplanSrc;
    lsFsImg.classList.remove('hidden');
    lsFsIframe.classList.add('hidden');
  } else {
    const base = currentLesplanSrc.split('#')[0];
    lsFsIframe.src = base + '#toolbar=0&navpanes=0&scrollbar=1';
    lsFsIframe.classList.remove('hidden');
    lsFsImg.classList.add('hidden');
  }
}

lsFullscreenBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  openLesplanFullscreen();
});

// Tweede document blok
lsDoc2Toggle.addEventListener('click', () => {
  const isOpen = lsDoc2Toggle.classList.toggle('open');
  lsDoc2Body.classList.toggle('hidden', !isOpen);
  if (isOpen && currentDoc2Src) {
    lsIframe2.src = currentDoc2Src;
    lsIframe2.classList.remove('hidden');
    lsFullscreenBtn2.classList.remove('hidden');
  } else {
    lsFullscreenBtn2.classList.add('hidden');
  }
});

lsFullscreenBtn2.addEventListener('click', (e) => {
  e.stopPropagation();
  if (!currentDoc2Src) return;
  lsFsTitle.textContent = lsDoc2Label.textContent;
  lsFsOverlay.classList.remove('hidden');
  const base = currentDoc2Src.split('#')[0];
  lsFsIframe.src = base + '#toolbar=0&navpanes=0&scrollbar=1';
  lsFsIframe.classList.remove('hidden');
  lsFsImg.classList.add('hidden');
});

lsClickOverlay.addEventListener('click', (e) => {
  e.stopPropagation();
  openLesplanFullscreen();
});


lsFsClose.addEventListener('click', () => {
  lsFsOverlay.classList.add('hidden');
  lsFsIframe.src = '';
});

document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (!lsFsOverlay.classList.contains('hidden')) {
    lsFsOverlay.classList.add('hidden');
    lsFsIframe.src = '';
  }
});

// Lesplan PDF inladen
lsFileInput.addEventListener('change', () => {
  const file = lsFileInput.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  currentLesplanSrc = url;
  currentLesplanIsImg = false;
  lsUploadText.textContent = file.name;
  lsUploadLabel.style.borderStyle = 'solid';
  lsUploadLabel.style.borderColor = 'var(--blue)';
  lsIframe.src = url;
  lsIframe.classList.remove('hidden');
  lsFullscreenBtn.classList.remove('hidden');
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
