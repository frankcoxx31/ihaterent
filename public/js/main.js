// ── CURSOR ───────────────────────────────────────────────────
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top = my + 'px';
});

(function tickRing() {
  rx += (mx - rx) * 0.11;
  ry += (my - ry) * 0.11;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(tickRing);
})();

function addHoverListeners() {
  document.querySelectorAll('a, button, .prop-card, .show-card, .svc-item').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('grow'));
    el.addEventListener('mouseleave', () => ring.classList.remove('grow'));
  });
}

// ── SCROLL PROGRESS + NAVBAR ─────────────────────────────────
const prog = document.getElementById('scroll-progress');
const nav = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const s = window.scrollY;
  const h = document.documentElement.scrollHeight - window.innerHeight;
  prog.style.width = (s / h * 100) + '%';
  nav.classList.toggle('scrolled', s > 60);
});

// ── LOADER ───────────────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('out');
    document.body.classList.remove('loading');
    setTimeout(() => {
      document.querySelectorAll('.word').forEach((w, i) => {
        setTimeout(() => w.classList.add('in'), i * 140);
      });
    }, 100);
  }, 2000);
});

// ── MOBILE NAV ───────────────────────────────────────────────
const burger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  mobileNav.classList.toggle('open');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});

mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    burger.classList.remove('active');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── COUNTER ANIMATION ────────────────────────────────────────
function runCounter(el) {
  if (el.dataset.done) return;
  el.dataset.done = '1';
  const target = parseFloat(el.dataset.target);
  const dec = parseInt(el.dataset.dec || 0);
  const dur = 1800, fps = 60, steps = dur / (1000 / fps);
  let frame = 0;
  const t = setInterval(() => {
    frame++;
    const cur = target * (frame / steps);
    if (frame >= steps) { el.textContent = dec ? target.toFixed(dec) : Math.floor(target); clearInterval(t); return; }
    el.textContent = dec ? cur.toFixed(dec) : Math.floor(cur);
  }, 1000 / fps);
}

// ── INTERSECTION OBSERVER ────────────────────────────────────
function setupObserver() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      entry.target.querySelectorAll('.cnt').forEach(runCounter);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.18 });

  document.querySelectorAll('.reveal, .stat-cell').forEach(el => io.observe(el));
}

// ── CARD SPOTLIGHT ───────────────────────────────────────────
function setupSpotlight() {
  document.querySelectorAll('.prop-card').forEach(card => {
    const sp = card.querySelector('.card-spotlight');
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      sp.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
      sp.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
    });
  });
}

// ── HORIZONTAL SCROLL DRAG ───────────────────────────────────
function setupDrag() {
  const sc = document.getElementById('show-scroll');
  let down = false, startX, left;
  sc.addEventListener('mousedown', e => { down = true; startX = e.pageX - sc.offsetLeft; left = sc.scrollLeft; });
  sc.addEventListener('mouseleave', () => down = false);
  sc.addEventListener('mouseup', () => down = false);
  sc.addEventListener('mousemove', e => {
    if (!down) return;
    e.preventDefault();
    sc.scrollLeft = left - (e.pageX - sc.offsetLeft - startX) * 1.6;
  });
}

// ── RENDER HELPERS ───────────────────────────────────────────
function imgUrl(id, w = 800) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=85`;
}

function tagClass(t) {
  return t === 'new' ? 'tag-new' : t === 'exclusive' ? 'tag-exclusive' : 'tag-sold';
}

function renderGrid(properties) {
  const grid = document.getElementById('props-grid');
  properties.forEach((p, i) => {
    const el = document.createElement('div');
    el.className = `prop-card reveal d${(i % 3) + 1}`;
    el.innerHTML = `
      <div class="card-img-box">
        <img src="${imgUrl(p.imgs[0])}" alt="${p.title}" loading="lazy">
        <div class="card-spotlight"></div>
        <span class="card-tag ${tagClass(p.tag)}">${p.tag}</span>
      </div>
      <div class="card-body">
        <div class="card-price">${p.price}</div>
        <div class="card-name">${p.title}</div>
        <div class="card-loc">${p.city}</div>
        <div class="card-sep"></div>
        <div class="card-specs">
          <div class="spec"><span class="spec-ico">⬡</span><span><strong>${p.beds}</strong> Bed</span></div>
          <div class="spec"><span class="spec-ico">◈</span><span><strong>${p.baths}</strong> Bath</span></div>
          <div class="spec"><span class="spec-ico">◻</span><span><strong>${p.sqft}</strong> ft²</span></div>
        </div>
      </div>`;
    grid.appendChild(el);
  });
}

function renderShowcase(properties) {
  const sc = document.getElementById('show-scroll');
  properties.forEach(p => {
    const el = document.createElement('div');
    el.className = 'show-card';
    el.innerHTML = `
      <img src="${imgUrl(p.imgs[0], 600)}" alt="${p.title}" loading="lazy">
      <div class="show-card-over"></div>
      <div class="show-card-body">
        <div class="show-card-type">${p.type} &bull; ${p.city}</div>
        <div class="show-card-name">${p.title}</div>
        <div class="show-card-price">${p.price}</div>
      </div>`;
    sc.appendChild(el);
  });
}

// ── BOOTSTRAP ────────────────────────────────────────────────
async function init() {
  try {
    const res = await fetch('/api/properties');
    const properties = await res.json();
    renderGrid(properties.slice(0, 6));
    renderShowcase(properties.slice(6, 12));
  } catch (err) {
    console.error('Failed to load properties:', err);
  } finally {
    setupSpotlight();
    setupDrag();
    setupObserver();
    addHoverListeners();
  }
}

init();
