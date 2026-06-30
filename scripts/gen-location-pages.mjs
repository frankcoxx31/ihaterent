/**
 * Generates local-SEO "mobile notary in <town>" landing pages for
 * integrityclosingsclt.com, reusing the existing site's CSS for visual
 * consistency. Also wires Apache routing (.htaccess) + sitemap.xml and
 * links the hub page's location cards and coverage pills to each page.
 *
 * Run from the repo root:
 *   node scripts/gen-location-pages.mjs
 *
 * Output: public/mobile-notary-<slug>-<state>.html (one per town)
 * Idempotent: re-running overwrites pages and de-dupes .htaccess/sitemap.
 *
 * To add a town: append to the `towns` array and re-run.
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, '..', 'public');
const HUB = 'service-locations-mobile-services-north-carolina';
const PHONE_TEL = '9803724103';
const PHONE_DISPLAY = '980-372-4103';
const SITE = 'https://www.integrityclosingsclt.com';
const DEFAULT_IMG = '/mobile-notary.jpg';
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
  { slug: 'concord', name: 'Concord', county: 'Cabarrus County', img: '/concord.jpg', lat: 35.4087, lng: -80.5795,
    heroLead: 'Certified mobile notary and loan signing agent serving Concord and all of Cabarrus County — we bring the signing table to your home, office, or hospital room, 7 days a week.',
    intro: 'Integrity Closings CLT provides professional mobile notary services throughout Concord, NC. Whether you are closing on a home near Concord Mills, finalizing estate documents, or need an urgent signing at Atrium Health Cabarrus, Frank Coxx comes to you — on your schedule.',
    local: 'From downtown Concord to the neighborhoods around Charlotte Motor Speedway and out toward Kannapolis, we cover every corner of Cabarrus County. Same-day and after-hours appointments are available for time-sensitive real estate closings, powers of attorney, and legal documents.',
    nearby: ['kannapolis', 'harrisburg', 'midland'] },

  { slug: 'gastonia', name: 'Gastonia', county: 'Gaston County', img: '/gastiona.png', lat: 35.2621, lng: -81.1873,
    heroLead: 'Reliable mobile notary and Notary Signing Agent serving Gastonia and Gaston County — flexible scheduling including evenings and weekends.',
    intro: 'Integrity Closings CLT brings mobile notary and loan signing services to Gastonia, NC and the surrounding Gaston County communities. We meet you wherever is convenient — your home, your workplace, or CaroMont Regional Medical Center.',
    local: 'We serve all of Gastonia, from the downtown district out to Belmont and Mount Holly, and travel readily across the Catawba River into Charlotte. Same-day signings are available for refinances, purchases, and personal documents.',
    nearby: ['belmont', 'mount-holly', 'charlotte'] },

  { slug: 'monroe', name: 'Monroe', county: 'Union County', img: '/monroe-1.jpg', lat: 34.9854, lng: -80.5495,
    heroLead: 'Mobile notary and loan signing agent serving Monroe and Union County — real estate closings, powers of attorney, and personal documents at your door.',
    intro: 'Integrity Closings CLT is your trusted mobile notary in Monroe, NC. We handle loan signings, wills and trusts, powers of attorney, and all general notarizations across Union County — coming to your home, office, or care facility.',
    local: 'We cover Monroe and the fast-growing communities of Indian Trail, Stallings, Waxhaw, and Weddington, plus bedside signings at Atrium Health Union. Evening and weekend appointments are available for urgent documents.',
    nearby: ['indian-trail', 'waxhaw', 'matthews'] },

  { slug: 'matthews', name: 'Matthews', county: 'Mecklenburg County', img: '/matthews-1.jpg', lat: 35.1168, lng: -80.7237,
    heroLead: 'Convenient mobile notary and Notary Signing Agent in Matthews, NC — loan signings, refinances, and personal documents at your home or office.',
    intro: 'Integrity Closings CLT provides mobile notary services throughout Matthews, NC. From real estate closings to medical directives at Novant Health Matthews Medical Center, we come to you anywhere in town.',
    local: 'We serve all of Matthews and the neighboring areas of Mint Hill, Stallings, and Indian Trail, with quick access to the greater Charlotte metro. Same-day and after-hours signings are available.',
    nearby: ['mint-hill', 'stallings', 'monroe'] },

  { slug: 'mint-hill', name: 'Mint Hill', county: 'Mecklenburg County', img: '/mint-hill.jpg', lat: 35.1796, lng: -80.6473,
    heroLead: 'Your local mobile notary in Mint Hill, NC — Frank Coxx is based right here, offering fast, dependable signing services 7 days a week.',
    intro: 'Integrity Closings CLT is proud to call Mint Hill home. As your neighborhood mobile notary and certified Notary Signing Agent, Frank Coxx provides real estate, business, and personal document notarizations right where you are — often the same day.',
    local: 'Being based in Mint Hill means the fastest response times in town and across the surrounding Mecklenburg County areas of Matthews and east Charlotte. Need an urgent or after-hours signing? We are just minutes away.',
    nearby: ['matthews', 'charlotte', 'monroe'] },

  { slug: 'salisbury', name: 'Salisbury', county: 'Rowan County', img: '/salisbury-nc.jpg', lat: 35.6709, lng: -80.4742,
    heroLead: 'Mobile notary and loan signing agent serving Salisbury and Rowan County — flexible scheduling including evenings and weekends.',
    intro: 'Integrity Closings CLT delivers professional mobile notary and loan signing services across Salisbury, NC. Whether it is a closing in historic downtown, an estate document, or a signing at Novant Health Rowan Medical Center, we travel to you.',
    local: 'We serve Salisbury and the surrounding Rowan County communities including Kannapolis and China Grove, as well as the Catawba College area. Same-day and weekend appointments are available.',
    nearby: ['kannapolis', 'concord', 'statesville'] },

  { slug: 'locust', name: 'Locust', county: 'Stanly County', img: '/locust.png', lat: 35.2640, lng: -80.4242,
    heroLead: 'Mobile notary serving Locust, NC and Stanly County — we come to you for loan signings, legal documents, and general notarizations.',
    intro: 'Integrity Closings CLT provides reliable mobile notary services to Locust, NC and the surrounding Stanly County area. From real estate closings to powers of attorney, Frank Coxx brings certified notary service to your home or office.',
    local: 'We serve Locust and nearby Oakboro, Albemarle, and Midland, with easy reach into Cabarrus County. Same-day and after-hours signings are available for time-sensitive documents.',
    nearby: ['midland', 'concord', 'monroe'] },

  { slug: 'midland', name: 'Midland', county: 'Cabarrus County', img: '/midland.png', lat: 35.2376, lng: -80.5098,
    heroLead: 'Mobile notary serving Midland, NC and Cabarrus County — dependable, on-location signing services 7 days a week.',
    intro: 'Integrity Closings CLT offers mobile notary and loan signing services throughout Midland, NC. We meet you at your home, office, or anywhere convenient for closings, estate documents, and general notarizations.',
    local: 'We cover Midland and the neighboring communities of Locust, Harrisburg, and Concord across Cabarrus County. Same-day and evening appointments are available.',
    nearby: ['locust', 'harrisburg', 'concord'] },

  // ── Additional coverage towns ──
  { slug: 'huntersville', name: 'Huntersville', county: 'Mecklenburg County', lat: 35.4107, lng: -80.8428,
    heroLead: 'Mobile notary and loan signing agent serving Huntersville and the Lake Norman area — we come to your home, office, or marina, 7 days a week.',
    intro: 'Integrity Closings CLT provides professional mobile notary services throughout Huntersville, NC. From real estate closings in Birkdale to refinances and estate documents, Frank Coxx travels to you anywhere in north Mecklenburg County.',
    local: 'We serve all of Huntersville and the neighboring Lake Norman communities of Cornelius and Davidson, with quick access to uptown Charlotte. Same-day and after-hours appointments are available.',
    nearby: ['cornelius', 'davidson', 'charlotte'] },

  { slug: 'cornelius', name: 'Cornelius', county: 'Mecklenburg County', lat: 35.4868, lng: -80.8601,
    heroLead: 'Reliable mobile notary serving Cornelius and the Lake Norman waterfront — loan signings, legal documents, and personal notarizations at your door.',
    intro: 'Integrity Closings CLT brings mobile notary and loan signing services to Cornelius, NC. Whether you are closing on a lakefront home or finalizing business documents, we meet you wherever is convenient.',
    local: 'We cover Cornelius and the surrounding Lake Norman towns of Huntersville, Davidson, and Mooresville. Evening and weekend signings are available.',
    nearby: ['huntersville', 'davidson', 'mooresville'] },

  { slug: 'davidson', name: 'Davidson', county: 'Mecklenburg County', lat: 35.4993, lng: -80.8486,
    heroLead: 'Mobile notary serving Davidson, NC — convenient, on-location signings for residents, students, and businesses around Davidson College.',
    intro: 'Integrity Closings CLT offers mobile notary and loan signing services throughout Davidson, NC. From real estate closings to powers of attorney, we come to your home or office in north Mecklenburg County.',
    local: 'We serve Davidson and the nearby Lake Norman communities of Cornelius, Huntersville, and Mooresville. Same-day appointments are available for time-sensitive documents.',
    nearby: ['cornelius', 'huntersville', 'mooresville'] },

  { slug: 'mooresville', name: 'Mooresville', county: 'Iredell County', lat: 35.5849, lng: -80.8101,
    heroLead: 'Mobile notary and loan signing agent serving Mooresville and Iredell County — flexible scheduling including evenings and weekends.',
    intro: 'Integrity Closings CLT delivers mobile notary services across Mooresville, NC — known as Race City USA. We handle loan signings, estate documents, and general notarizations at your home, office, or shop.',
    local: 'We serve Mooresville and the surrounding Lake Norman and Iredell County areas including Davidson, Cornelius, and Statesville. Same-day and after-hours signings are available.',
    nearby: ['davidson', 'cornelius', 'statesville'] },

  { slug: 'kannapolis', name: 'Kannapolis', county: 'Cabarrus County', lat: 35.4874, lng: -80.6217,
    heroLead: 'Mobile notary serving Kannapolis and Cabarrus County — we bring certified signing services to your home, office, or care facility.',
    intro: 'Integrity Closings CLT provides reliable mobile notary and loan signing services throughout Kannapolis, NC. From real estate closings near the North Carolina Research Campus to estate documents, we travel to you.',
    local: 'We serve Kannapolis and the neighboring communities of Concord, Salisbury, and China Grove. Same-day and evening appointments are available.',
    nearby: ['concord', 'salisbury', 'midland'] },

  { slug: 'harrisburg', name: 'Harrisburg', county: 'Cabarrus County', lat: 35.3238, lng: -80.6587,
    heroLead: 'Mobile notary serving Harrisburg and Cabarrus County — dependable, on-location signings 7 days a week.',
    intro: 'Integrity Closings CLT offers mobile notary services throughout Harrisburg, NC. We meet you at home, at work, or anywhere convenient for closings, legal documents, and general notarizations.',
    local: 'We cover Harrisburg and the nearby communities of Concord, Midland, and east Charlotte across Cabarrus County. Same-day and after-hours signings are available.',
    nearby: ['concord', 'midland', 'charlotte'] },

  { slug: 'indian-trail', name: 'Indian Trail', county: 'Union County', lat: 35.0768, lng: -80.6692,
    heroLead: 'Mobile notary and loan signing agent serving Indian Trail and Union County — real estate closings and personal documents at your door.',
    intro: 'Integrity Closings CLT is your trusted mobile notary in Indian Trail, NC. We handle loan signings, wills, powers of attorney, and general notarizations throughout Union County.',
    local: 'We serve Indian Trail and the neighboring communities of Stallings, Monroe, and Matthews. Evening and weekend appointments are available.',
    nearby: ['stallings', 'monroe', 'matthews'] },

  { slug: 'stallings', name: 'Stallings', county: 'Union County', lat: 35.0907, lng: -80.7423,
    heroLead: 'Mobile notary serving Stallings, NC — convenient, on-location signing services for homes and businesses in Union County.',
    intro: 'Integrity Closings CLT provides mobile notary and loan signing services throughout Stallings, NC. From refinances to personal documents, we come to you.',
    local: 'We serve Stallings and the surrounding areas of Indian Trail, Matthews, and Monroe. Same-day signings are available.',
    nearby: ['indian-trail', 'matthews', 'monroe'] },

  { slug: 'waxhaw', name: 'Waxhaw', county: 'Union County', lat: 34.9249, lng: -80.7437,
    heroLead: 'Mobile notary and loan signing agent serving Waxhaw and southern Union County — flexible scheduling including evenings and weekends.',
    intro: 'Integrity Closings CLT brings mobile notary services to Waxhaw, NC. Whether closing on a home near the historic downtown or finalizing estate documents, we travel to your location.',
    local: 'We serve Waxhaw and the neighboring communities of Weddington, Marvin, and Monroe. Same-day and after-hours appointments are available.',
    nearby: ['weddington', 'monroe', 'charlotte'] },

  { slug: 'weddington', name: 'Weddington', county: 'Union County', lat: 35.0246, lng: -80.7559,
    heroLead: 'Mobile notary serving Weddington, NC — dependable, on-location signings for homes and families across southern Union County.',
    intro: 'Integrity Closings CLT offers mobile notary and loan signing services throughout Weddington, NC. We come to your home or office for closings, wills, trusts, and general notarizations.',
    local: 'We serve Weddington and the nearby communities of Waxhaw, Matthews, and Monroe. Evening and weekend signings are available.',
    nearby: ['waxhaw', 'matthews', 'monroe'] },

  { slug: 'pineville', name: 'Pineville', county: 'Mecklenburg County', lat: 35.0863, lng: -80.8923,
    heroLead: 'Mobile notary serving Pineville, NC — convenient signing services near the Carolina Place area, 7 days a week.',
    intro: 'Integrity Closings CLT provides mobile notary and loan signing services throughout Pineville, NC. From real estate closings to business documents, we meet you wherever is convenient in south Mecklenburg County.',
    local: 'We serve Pineville and the nearby areas of south Charlotte, Matthews, and the Fort Mill, SC border. Same-day appointments are available.',
    nearby: ['charlotte', 'matthews', 'fort-mill'] },

  { slug: 'belmont', name: 'Belmont', county: 'Gaston County', lat: 35.2429, lng: -81.0376,
    heroLead: 'Mobile notary serving Belmont and Gaston County — loan signings, legal documents, and personal notarizations at your door.',
    intro: 'Integrity Closings CLT brings mobile notary services to Belmont, NC. From closings near downtown to estate documents, we travel to your home or office along the Catawba River.',
    local: 'We serve Belmont and the neighboring communities of Gastonia, Mount Holly, and Cramerton, with quick access into Charlotte. Same-day signings are available.',
    nearby: ['gastonia', 'mount-holly', 'charlotte'] },

  { slug: 'mount-holly', name: 'Mount Holly', county: 'Gaston County', lat: 35.2982, lng: -81.0159,
    heroLead: 'Mobile notary serving Mount Holly and Gaston County — dependable, on-location signing services 7 days a week.',
    intro: 'Integrity Closings CLT offers mobile notary and loan signing services throughout Mount Holly, NC. We come to you for real estate closings, powers of attorney, and general notarizations.',
    local: 'We serve Mount Holly and the nearby communities of Belmont, Gastonia, and northwest Charlotte. Evening and weekend appointments are available.',
    nearby: ['belmont', 'gastonia', 'charlotte'] },

  { slug: 'statesville', name: 'Statesville', county: 'Iredell County', lat: 35.7826, lng: -80.8873,
    heroLead: 'Mobile notary and loan signing agent serving Statesville and Iredell County — flexible scheduling including evenings and weekends.',
    intro: 'Integrity Closings CLT provides mobile notary services across Statesville, NC. From real estate closings to estate documents, we travel to your home, office, or care facility.',
    local: 'We serve Statesville and the surrounding Iredell County communities including Mooresville and Troutman. Same-day and after-hours signings are available.',
    nearby: ['mooresville', 'davidson', 'salisbury'] },

  { slug: 'fort-mill', name: 'Fort Mill', state: 'SC', county: 'York County', lat: 35.0074, lng: -80.9451,
    heroLead: 'Mobile notary and loan signing agent serving Fort Mill, SC and York County — we come to your home or office, 7 days a week.',
    intro: 'Integrity Closings CLT provides professional mobile notary and loan signing services throughout Fort Mill, SC. From Baxter Village closings to estate documents, we travel to you just across the North Carolina line.',
    local: 'We serve Fort Mill and the neighboring communities of Tega Cay, Rock Hill, and Pineville, NC. Same-day and after-hours appointments are available.',
    nearby: ['rock-hill', 'pineville', 'charlotte'] },

  { slug: 'rock-hill', name: 'Rock Hill', state: 'SC', county: 'York County', lat: 34.9249, lng: -81.0251,
    heroLead: 'Mobile notary serving Rock Hill, SC and York County — dependable, on-location signing services including evenings and weekends.',
    intro: 'Integrity Closings CLT offers mobile notary and loan signing services throughout Rock Hill, SC. We meet you at home, at work, or at a care facility for closings, legal documents, and general notarizations.',
    local: 'We serve Rock Hill and the nearby communities of Fort Mill, Tega Cay, and the south Charlotte metro. Same-day signings are available.',
    nearby: ['fort-mill', 'charlotte'] },
];

const stateOf = (t) => t.state || 'NC';
const stateFull = (s) => (s === 'SC' ? 'South Carolina' : 'North Carolina');
const routeOf = (t) => `mobile-notary-${t.slug}-${stateOf(t).toLowerCase()}`;

// Charlotte already has an existing page (in the sitemap) — link to it.
const EXISTING = {
  charlotte: { name: 'Charlotte', url: '/mobile-notary-charlotte-nc', pill: 'Charlotte' },
};

const bySlug = Object.fromEntries(towns.map(t => [t.slug, t]));
function nearbyLink(slug) {
  if (bySlug[slug]) return { name: bySlug[slug].name, url: `/${routeOf(bySlug[slug])}` };
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
  const st = stateOf(t);
  const url = `${SITE}/${routeOf(t)}`;
  const img = t.img || DEFAULT_IMG;
  const title = `Mobile Notary ${t.name}, ${st} | Loan Signing Agent | Integrity Closings CLT`;
  const desc = `Mobile notary and loan signing agent in ${t.name}, ${st} (${t.county}). ${t.heroLead.replace(/—/g, '-')} Call ${PHONE_DISPLAY}.`;

  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${url}#business`,
    name: `Integrity Closings CLT — Mobile Notary ${t.name}`,
    description: t.intro,
    url,
    telephone: `+1-${PHONE_TEL.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}`,
    image: `${SITE}${img}`,
    priceRange: '$$',
    founder: { '@type': 'Person', name: 'Frank Coxx' },
    areaServed: { '@type': 'City', name: `${t.name}, ${st}` },
    address: { '@type': 'PostalAddress', addressLocality: t.name, addressRegion: st, addressCountry: 'US' },
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

  const relatedHtml = RELATED.map(([href, label]) => `<a href="${href}">${label}</a>`).join('\n        ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${desc}" />
  <link rel="canonical" href="${url}" />
  <meta name="robots" content="index, follow" />
  <meta property="og:title" content="Mobile Notary ${t.name}, ${st} | Integrity Closings CLT" />
  <meta property="og:description" content="${t.heroLead}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="${SITE}${img}" />
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
    <p class="crumbs"><a href="/">Home</a> &nbsp;/&nbsp; <a href="/${HUB}">Service Locations</a> &nbsp;/&nbsp; ${t.name}, ${st}</p>
  </div>
</section>

<section id="hero">
  <div class="container">
    <div class="hero-badge"><i class="fas fa-map-marker-alt"></i> Serving ${t.county}</div>
    <h1>Mobile Notary in<br><span>${t.name}, ${stateFull(st)}</span></h1>
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
    <p class="section-eyebrow">${t.name}, ${st}</p>
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
  const route = routeOf(t);
  const file = `${route}.html`;
  writeFileSync(join(PUBLIC, file), page(t), 'utf-8');
  generated.push({ route, file });
  console.log(`✓ ${file}`);
}

// ─── Update .htaccess (extensionless routing) ─────────────────────────────────
{
  const path = join(PUBLIC, '.htaccess');
  let ht = readFileSync(path, 'utf-8');
  const marker = '# --- location pages (generated) ---';
  const escMarker = marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  ht = ht.replace(new RegExp(`\\n*  ${escMarker}[\\s\\S]*?# --- end location pages ---\\n?`, 'g'), '\n');
  const rules = generated.map(g => `  RewriteRule ^${g.route}$ /${g.file} [L]`).join('\n');
  const block = `\n  ${marker}\n${rules}\n  # --- end location pages ---\n`;
  ht = ht.replace(/(\s*RewriteCond %\{REQUEST_FILENAME\} !-f)/, `${block}$1`);
  writeFileSync(path, ht, 'utf-8');
  console.log('✓ .htaccess updated');
}

// ─── Update sitemap.xml ───────────────────────────────────────────────────────
{
  const path = join(PUBLIC, 'sitemap.xml');
  let sm = readFileSync(path, 'utf-8');
  for (const g of generated) {
    const loc = `${SITE}/${g.route}`;
    if (sm.includes(`<loc>${loc}</loc>`)) continue;
    const entry = `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    sm = sm.replace('</urlset>', `${entry}</urlset>`);
  }
  writeFileSync(path, sm, 'utf-8');
  console.log('✓ sitemap.xml updated');
}

// ─── Link the hub page: location cards (h3) + coverage pills ──────────────────
{
  const path = join(PUBLIC, `${HUB}.html`);
  let hub = readFileSync(path, 'utf-8');
  let h3 = 0, pills = 0;

  const linkPill = (text, route) => {
    for (const cls of ['county-pill featured', 'county-pill']) {
      const span = `<span class="${cls}">${text}</span>`;
      if (hub.includes(span)) {
        hub = hub.replace(span, `<a class="${cls}" href="/${route}" style="text-decoration:none">${text}</a>`);
        pills++;
        return;
      }
    }
  };

  for (const t of towns) {
    const route = routeOf(t);
    const plainH3 = `<h3>${t.name}, ${stateOf(t)}</h3>`;
    const linkedH3 = `<h3><a href="/${route}" style="color:inherit;text-decoration:none">${t.name}, ${stateOf(t)}</a></h3>`;
    if (hub.includes(plainH3)) { hub = hub.replace(plainH3, linkedH3); h3++; }
    // pill text: NC towns use bare name; SC towns use "Name, SC"
    linkPill(stateOf(t) === 'SC' ? `${t.name}, SC` : t.name, route);
  }
  // also link the existing Charlotte page from its pill
  linkPill(EXISTING.charlotte.pill, EXISTING.charlotte.url.replace(/^\//, ''));

  writeFileSync(path, hub, 'utf-8');
  console.log(`✓ hub page: linked ${h3} cards + ${pills} coverage pills`);
}

console.log(`\nDone. Generated ${generated.length} location pages.`);
