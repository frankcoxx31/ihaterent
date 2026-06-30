/**
 * Generates local-SEO "mobile notary in <town>" landing pages for
 * integrityclosingsclt.com, reusing the existing site's CSS for visual
 * consistency. Also wires Apache routing (.htaccess) + sitemap.xml.
 *
 * Run from the repo root:
 *   node scripts/gen-location-pages.mjs
 *
 * Output: public/mobile-notary-<slug>-nc.html (one per town)
 * Idempotent: re-running overwrites the pages and de-dupes .htaccess/sitemap.
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, '..', 'public');
const HUB = 'service-locations-mobile-services-north-carolina';
const PHONE_TEL = '9805401890';
const PHONE_DISPLAY = '980-540-1890';
const SITE = 'https://www.integrityclosingsclt.com';
const TODAY = new Date().toISOString().slice(0, 10);

// ─── Reuse the site's CSS (extract <style> from the hub page) ─────────────────
const hubHtml = readFileSync(join(PUBLIC, `${HUB}.html`), 'utf-8');
const BASE_CSS = (hubHtml.match(/<style>([\s\S]*?)<\/style>/) || [, ''])[1];

const EXTRA_CSS = `
    /* location-page additions */
    #breadcrumb { background: var(--off-white); border-bottom: 1px solid var(--gray-light); }
    #breadcrumb .container { padding-top: 14px; padding-bottom: 14px; }
    .crumbs { font-size: 12px; color: var(--gray-mid); }
    .crumbs a { color: var(--tan-dark); text-decoration: none; }
    .crumbs a:hover { color: var(--navy); }
    #local { padding: 64px 0; }
    #local .section-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: var(--tan-dark); margin-bottom: 12px; }
    #local h2 { font-family: var(--font-serif); font-size: clamp(1.7rem, 4vw, 2.3rem); color: var(--navy); font-weight: 400; margin-bottom: 20px; }
    #local p { color: #555; font-size: 15px; line-height: 1.85; max-width: 760px; margin: 0 0 18px; }
    .nearby-grid { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 8px; }
    .nearby-link { background: var(--white); border: 1px solid var(--gray-light); border-radius: 100px; padding: 8px 18px; font-size: 13px; font-weight: 600; color: var(--navy); text-decoration: none; box-shadow: 0 1px 4px rgba(0,0,0,.06); transition: background .2s, color .2s; }
    .nearby-link:hover { background: var(--navy); color: var(--tan); }
    .related-services { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 8px; }
    .related-services a { color: var(--tan-dark); font-size: 13px; font-weight: 600; text-decoration: none; }
    .related-services a:hover { color: var(--navy); }
`;

// ─── Town data — each page gets genuinely unique local content ────────────────
const towns = [
  {
    slug: 'concord', name: 'Concord', county: 'Cabarrus County', img: '/concord.jpg',
    lat: 35.4087, lng: -80.5795,
    heroLead: 'Certified mobile notary and loan signing agent serving Concord and all of Cabarrus County — we bring the signing table to your home, office, or hospital room, 7 days a week.',
    intro: 'Integrity Closings CLT provides professional mobile notary services throughout Concord, NC. Whether you are closing on a home near Concord Mills, finalizing estate documents, or need an urgent signing at Atrium Health Cabarrus, Frank Coxx comes to you — on your schedule.',
    local: 'From downtown Concord to the neighborhoods around Charlotte Motor Speedway and out toward Kannapolis, we cover every corner of Cabarrus County. Same-day and after-hours appointments are available for time-sensitive real estate closings, powers of attorney, and legal documents.',
    nearby: ['midland', 'locust', 'salisbury'],
  },
  {
    slug: 'gastonia', name: 'Gastonia', county: 'Gaston County', img: '/gastiona.png',
    lat: 35.2621, lng: -81.1873,
    heroLead: 'Reliable mobile notary and Notary Signing Agent serving Gastonia and Gaston County — flexible scheduling including evenings and weekends.',
    intro: 'Integrity Closings CLT brings mobile notary and loan signing services to Gastonia, NC and the surrounding Gaston County communities. We meet you wherever is convenient — your home, your workplace, or CaroMont Regional Medical Center.',
    local: 'We serve all of Gastonia, from the downtown district out to Belmont and Mount Holly, and travel readily across the Catawba River into Charlotte. Same-day signings are available for refinances, purchases, and personal documents.',
    nearby: ['charlotte', 'matthews', 'mint-hill'],
  },
  {
    slug: 'monroe', name: 'Monroe', county: 'Union County', img: '/monroe-1.jpg',
    lat: 34.9854, lng: -80.5495,
    heroLead: 'Mobile notary and loan signing agent serving Monroe and Union County — real estate closings, powers of attorney, and personal documents at your door.',
    intro: 'Integrity Closings CLT is your trusted mobile notary in Monroe, NC. We handle loan signings, wills and trusts, powers of attorney, and all general notarizations across Union County — coming to your home, office, or care facility.',
    local: 'We cover Monroe and the fast-growing communities of Indian Trail, Stallings, Waxhaw, and Weddington, plus bedside signings at Atrium Health Union. Evening and weekend appointments are available for urgent documents.',
    nearby: ['matthews', 'mint-hill', 'locust'],
  },
  {
    slug: 'matthews', name: 'Matthews', county: 'Mecklenburg County', img: '/matthews-1.jpg',
    lat: 35.1168, lng: -80.7237,
    heroLead: 'Convenient mobile notary and Notary Signing Agent in Matthews, NC — loan signings, refinances, and personal documents at your home or office.',
    intro: 'Integrity Closings CLT provides mobile notary services throughout Matthews, NC. From real estate closings to medical directives at Novant Health Matthews Medical Center, we come to you anywhere in town.',
    local: 'We serve all of Matthews and the neighboring areas of Mint Hill, Stallings, and Indian Trail, with quick access to the greater Charlotte metro. Same-day and after-hours signings are available.',
    nearby: ['mint-hill', 'monroe', 'charlotte'],
  },
  {
    slug: 'mint-hill', name: 'Mint Hill', county: 'Mecklenburg County', img: '/mint-hill.jpg',
    lat: 35.1796, lng: -80.6473,
    heroLead: 'Your local mobile notary in Mint Hill, NC — Frank Coxx is based right here, offering fast, dependable signing services 7 days a week.',
    intro: 'Integrity Closings CLT is proud to call Mint Hill home. As your neighborhood mobile notary and certified Notary Signing Agent, Frank Coxx provides real estate, business, and personal document notarizations right where you are — often the same day.',
    local: 'Being based in Mint Hill means the fastest response times in town and across the surrounding Mecklenburg County areas of Matthews and east Charlotte. Need an urgent or after-hours signing? We are just minutes away.',
    nearby: ['matthews', 'monroe', 'charlotte'],
  },
  {
    slug: 'salisbury', name: 'Salisbury', county: 'Rowan County', img: '/salisbury-nc.jpg',
    lat: 35.6709, lng: -80.4742,
    heroLead: 'Mobile notary and loan signing agent serving Salisbury and Rowan County — flexible scheduling including evenings and weekends.',
    intro: 'Integrity Closings CLT delivers professional mobile notary and loan signing services across Salisbury, NC. Whether it is a closing in historic downtown, an estate document, or a signing at Novant Health Rowan Medical Center, we travel to you.',
    local: 'We serve Salisbury and the surrounding Rowan County communities including Kannapolis and China Grove, as well as the Catawba College area. Same-day and weekend appointments are available.',
    nearby: ['concord', 'midland', 'locust'],
  },
  {
    slug: 'locust', name: 'Locust', county: 'Stanly County', img: '/locust.png',
    lat: 35.2640, lng: -80.4242,
    heroLead: 'Mobile notary serving Locust, NC and Stanly County — we come to you for loan signings, legal documents, and general notarizations.',
    intro: 'Integrity Closings CLT provides reliable mobile notary services to Locust, NC and the surrounding Stanly County area. From real estate closings to powers of attorney, Frank Coxx brings certified notary service to your home or office.',
    local: 'We serve Locust and nearby Oakboro, Albemarle, and Midland, with easy reach into Cabarrus County. Same-day and after-hours signings are available for time-sensitive documents.',
    nearby: ['midland', 'concord', 'monroe'],
  },
  {
    slug: 'midland', name: 'Midland', county: 'Cabarrus County', img: '/midland.png',
    lat: 35.2376, lng: -80.5098,
    heroLead: 'Mobile notary serving Midland, NC and Cabarrus County — dependable, on-location signing services 7 days a week.',
    intro: 'Integrity Closings CLT offers mobile notary and loan signing services throughout Midland, NC. We meet you at your home, office, or anywhere convenient for closings, estate documents, and general notarizations.',
    local: 'We cover Midland and the neighboring communities of Locust, Harrisburg, and Concord across Cabarrus County. Same-day and evening appointments are available.',
    nearby: ['locust', 'concord', 'monroe'],
  },
];

// Charlotte already has an existing page in the sitemap; allow linking to it.
const EXISTING = {
  charlotte: { name: 'Charlotte', url: '/mobile-notary-charlotte-nc' },
};

const bySlug = Object.fromEntries(towns.map(t => [t.slug, t]));
function nearbyLink(slug) {
  if (bySlug[slug]) return { name: bySlug[slug].name, url: `/mobile-notary-${slug}-nc` };
  if (EXISTING[slug]) return EXISTING[slug];
  return null;
}

const SERVICES = [
  ['fa-home', 'Real Estate Closings', 'Purchase, sale, and refinance loan signings with a certified Notary Signing Agent at your location.'],
  ['fa-file-contract', 'Legal Documents', 'Wills, trusts, power of attorney, affidavits, and all legal documents notarized on-site.'],
  ['fa-briefcase', 'Business Documents', 'Corporate resolutions, contracts, agreements, and business filings handled promptly.'],
  ['fa-user-shield', 'Personal Documents', 'I-9 verifications, vehicle titles, medical directives, and more.'],
  ['fa-hospital', 'Hospital Visits', 'Compassionate service for patients who need documents notarized at medical facilities.'],
  ['fa-clock', 'After-Hours & Same-Day', 'Urgent signings available evenings, weekends, and holidays.'],
];

const RELATED = [
  ['/loan-signing-agent-charlotte-nc', 'Loan Signing Agent'],
  ['/hospital-notary-charlotte-nc', 'Hospital Notary'],
  ['/estate-notary-charlotte-nc', 'Estate &amp; POA Notary'],
  ['/after-hours-mobile-notary-charlotte-nc', 'After-Hours Notary'],
];

function page(t) {
  const url = `${SITE}/mobile-notary-${t.slug}-nc`;
  const title = `Mobile Notary ${t.name}, NC | Loan Signing Agent | Integrity Closings CLT`;
  const desc = `Mobile notary and loan signing agent in ${t.name}, NC (${t.county}). ${t.heroLead.replace(/—/g, '-')} Call ${PHONE_DISPLAY}.`;

  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${url}#business`,
    name: `Integrity Closings CLT — Mobile Notary ${t.name}`,
    description: t.intro,
    url,
    telephone: `+1-${PHONE_TEL.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}`,
    image: `${SITE}${t.img}`,
    priceRange: '$$',
    founder: { '@type': 'Person', name: 'Frank Coxx' },
    areaServed: { '@type': 'City', name: `${t.name}, NC` },
    address: { '@type': 'PostalAddress', addressLocality: t.name, addressRegion: 'NC', addressCountry: 'US' },
    geo: { '@type': 'GeoCoordinates', latitude: t.lat, longitude: t.lng },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '07:00', closes: '21:00',
    },
  };

  const nearbyHtml = t.nearby
    .map(nearbyLink).filter(Boolean)
    .map(n => `<a class="nearby-link" href="${n.url}">Notary in ${n.name} <i class="fas fa-arrow-right" style="font-size:10px"></i></a>`)
    .join('\n        ');

  const servicesHtml = SERVICES
    .map(([icon, h, p]) => `      <div class="service-card"><i class="fas ${icon}"></i><h3>${h}</h3><p>${p}</p></div>`)
    .join('\n');

  const relatedHtml = RELATED
    .map(([href, label]) => `<a href="${href}">${label}</a>`)
    .join('\n        ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${desc}" />
  <link rel="canonical" href="${url}" />
  <meta name="robots" content="index, follow" />
  <meta property="og:title" content="Mobile Notary ${t.name}, NC | Integrity Closings CLT" />
  <meta property="og:description" content="${t.heroLead}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="${SITE}${t.img}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&family=Cormorant+Garamond:ital,wght@0,400;1,300;1,400&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
  <script type="application/ld+json">${JSON.stringify(jsonld)}</script>
  <style>${BASE_CSS}${EXTRA_CSS}</style>
</head>
<body>

<nav id="top-nav">
  <a href="/" class="nav-logo-text">Integrity Closings CLT</a>
  <ul class="nav-links-list">
    <li><a href="/">Home</a></li>
    <li><a href="/${HUB}">Locations</a></li>
    <li><a href="#services">Services</a></li>
    <li><a href="tel:${PHONE_TEL}" class="nav-cta-btn">${PHONE_DISPLAY}</a></li>
  </ul>
</nav>

<section id="breadcrumb">
  <div class="container">
    <p class="crumbs"><a href="/">Home</a> &nbsp;/&nbsp; <a href="/${HUB}">Service Locations</a> &nbsp;/&nbsp; ${t.name}, NC</p>
  </div>
</section>

<section id="hero">
  <div class="container">
    <div class="hero-badge"><i class="fas fa-map-marker-alt"></i> Serving ${t.county}</div>
    <h1>Mobile Notary in<br><span>${t.name}, North Carolina</span></h1>
    <p class="lead">${t.heroLead}</p>
    <div class="hero-btns">
      <a href="tel:${PHONE_TEL}" class="btn-primary"><i class="fas fa-phone"></i>&nbsp; Call ${PHONE_DISPLAY}</a>
      <a href="/book" class="btn-outline">Book Online</a>
    </div>
  </div>
</section>

<div id="stats">
  <div class="stat-item"><div class="stat-num">7</div><div class="stat-label">Days a Week</div></div>
  <div class="stat-item"><div class="stat-num">100%</div><div class="stat-label">Mobile — We Come to You</div></div>
  <div class="stat-item"><div class="stat-num">NSA</div><div class="stat-label">Certified Signing Agent</div></div>
  <div class="stat-item"><div class="stat-num">$$</div><div class="stat-label">Fair, Upfront Pricing</div></div>
</div>

<section id="intro">
  <div class="container">
    <p class="section-eyebrow">${t.name}, NC</p>
    <h2>Trusted Mobile Notary Serving ${t.name}</h2>
    <p>${t.intro}</p>
  </div>
</section>

<section id="services">
  <div class="container">
    <p class="section-eyebrow">What We Notarize</p>
    <h2>Notary Services Available in ${t.name}</h2>
    <div class="services-grid">
${servicesHtml}
    </div>
  </div>
</section>

<section id="local">
  <div class="container">
    <p class="section-eyebrow">Local Coverage</p>
    <h2>Serving All of ${t.name} &amp; ${t.county}</h2>
    <p>${t.local}</p>
    <p style="margin-bottom:10px;font-weight:600;color:var(--navy);">Nearby service areas:</p>
    <div class="nearby-grid">
        ${nearbyHtml}
    </div>
    <p style="margin-top:28px;margin-bottom:10px;font-weight:600;color:var(--navy);">Popular services:</p>
    <div class="related-services">
        ${relatedHtml}
    </div>
  </div>
</section>

<section id="cta">
  <h2>Need a Notary in ${t.name}?</h2>
  <p>Available 7 days a week throughout ${t.county}. Call now to schedule — we come to you.</p>
  <a href="tel:${PHONE_TEL}" class="cta-phone">${PHONE_DISPLAY}</a>
  <div class="hero-btns">
    <a href="tel:${PHONE_TEL}" class="btn-primary">Call to Book Now</a>
    <a href="/book" class="btn-outline">Book Online</a>
  </div>
</section>

<footer id="footer">
  <p>&copy; 2026 Integrity Closings CLT &mdash; Frank Coxx, Certified Notary Signing Agent</p>
  <a href="/${HUB}">All Service Areas</a>
</footer>

</body>
</html>
`;
}

// ─── Generate pages ───────────────────────────────────────────────────────────
const generated = [];
for (const t of towns) {
  const file = `mobile-notary-${t.slug}-nc.html`;
  writeFileSync(join(PUBLIC, file), page(t), 'utf-8');
  generated.push({ slug: t.slug, file });
  console.log(`✓ ${file}`);
}

// ─── Update .htaccess (extensionless routing) ─────────────────────────────────
{
  const path = join(PUBLIC, '.htaccess');
  let ht = readFileSync(path, 'utf-8');
  const marker = '# --- location pages (generated) ---';
  // Remove any previous generated block so re-runs stay clean.
  ht = ht.replace(new RegExp(`\\n*${marker}[\\s\\S]*?# --- end location pages ---\\n?`), '\n');
  const rules = generated
    .map(g => `  RewriteRule ^mobile-notary-${g.slug}-nc$ /${g.file} [L]`)
    .join('\n');
  const block = `\n  ${marker}\n${rules}\n  # --- end location pages ---\n`;
  // Insert before the catch-all fallback condition.
  ht = ht.replace(/(\s*RewriteCond %\{REQUEST_FILENAME\} !-f)/, `${block}$1`);
  writeFileSync(path, ht, 'utf-8');
  console.log('✓ .htaccess updated');
}

// ─── Update sitemap.xml ───────────────────────────────────────────────────────
{
  const path = join(PUBLIC, 'sitemap.xml');
  let sm = readFileSync(path, 'utf-8');
  for (const t of towns) {
    const loc = `${SITE}/mobile-notary-${t.slug}-nc`;
    if (sm.includes(`<loc>${loc}</loc>`)) continue; // de-dupe
    const entry = `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    sm = sm.replace('</urlset>', `${entry}</urlset>`);
  }
  writeFileSync(path, sm, 'utf-8');
  console.log('✓ sitemap.xml updated');
}

// ─── Link the hub page's location cards to their new pages ────────────────────
{
  const path = join(PUBLIC, `${HUB}.html`);
  let hub = readFileSync(path, 'utf-8');
  let linked = 0;
  for (const t of towns) {
    const plain = `<h3>${t.name}, NC</h3>`;
    const linkedH3 = `<h3><a href="/mobile-notary-${t.slug}-nc" style="color:inherit;text-decoration:none">${t.name}, NC</a></h3>`;
    if (hub.includes(plain)) { hub = hub.replace(plain, linkedH3); linked++; }
  }
  writeFileSync(path, hub, 'utf-8');
  console.log(`✓ hub page: linked ${linked} location cards`);
}

console.log(`\nDone. Generated ${generated.length} location pages.`);
