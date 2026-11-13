// The standalone nav preview (repo logeshmaximus/highlights-chicago-services-dropdown): the same site header
// as the brand pages, on the /services hero. One self-contained index.html: the header CSS and JS are inlined.
import fs from 'fs';
import { siteHeader } from '../lib/site-nav.mjs';
import { SERVICES_MENU } from '../content/nav.mjs';

const BRAND_PREVIEW = 'https://logeshmaximus.github.io/highlights-chicago-brand-pages/';
const LOGO = 'https://cdn.prod.website-files.com/69f58d69563c4c5bf9b01c60/6a3c3c20491b43b0858c1876_highlights-chicago-logo.webp';

export function dropdownPage() {
  const css = fs.readFileSync(new URL('../static/assets/css/site-nav.css', import.meta.url), 'utf8');
  const js = fs.readFileSync(new URL('../static/assets/js/site-nav.js', import.meta.url), 'utf8');
  const brandsHref = `${BRAND_PREVIEW}brands/`;
  const live = SERVICES_MENU.columns.reduce((n, c) => n + c.items.length, 0);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="robots" content="noindex">
<title>Site Nav Preview</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600&display=swap">
<style>
html{-webkit-text-size-adjust:100%}
body{margin:0;background:#fff;color:#181515;font:400 16px/26px Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
/* Preview controls: not part of the component */
.review{background:#F6F6F6;border-bottom:1px solid #E4E4E4;font-size:13px;line-height:16px;color:#6B6B6B}
.review-inner{width:min(1200px,calc(100% - 48px));margin-inline:auto;display:flex;flex-wrap:wrap;gap:4px 18px;align-items:center;min-height:40px;padding-block:4px}
.review strong{color:#181515;font-weight:600}
.review label{display:inline-flex;gap:7px;align-items:center;min-height:32px;cursor:pointer;color:#181515;font-weight:500}
.review input{width:16px;height:16px;margin:0;accent-color:#223D90}
.review a{color:#223D90;font-weight:600}
/* Hero: same as highlightschicago.com/services, for context */
.hero{position:relative;overflow:hidden;padding:84px 0;background:#15202A;color:#fff}
.hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.hero::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(21,32,42,.95),rgba(21,32,42,.84) 40%,rgba(21,32,42,.42) 68%,rgba(21,32,42,.28))}
.hero-inner{position:relative;z-index:1;width:min(1200px,calc(100% - 48px));margin-inline:auto}
.hero h1{font:500 clamp(42px,6vw,86px)/.96 "Space Grotesk",system-ui,sans-serif;letter-spacing:-.055em;max-width:820px;margin:0 0 24px}
.hero p{font-size:18px;line-height:30px;color:#FFFFFFCC;max-width:690px;margin:0 0 30px}
.hero-actions{display:flex;flex-wrap:wrap;gap:12px}
.hero-actions a{padding:13px 24px;border:1px solid #fff;border-radius:28px;font-weight:700;line-height:24px;text-decoration:none;color:#fff}
.hero-actions a:first-child{background:#fff;color:#223D90}
@media(max-width:768px){.hero{padding:56px 0}}
@media(max-width:480px){.review-inner,.hero-inner{width:calc(100% - 32px)}}
${css}
</style>
</head>
<body>
<div class="review"><div class="review-inner">
<span>Services menu: <strong>${live}</strong> live pages, exactly what visitors get. Brands opens the <a href="${BRAND_PREVIEW}brands/">brands page</a>. Same header as the brand pages preview.</span>
</div></div>
${siteHeader({ logoSrc: LOGO, brandsHref, current: 'services' })}
<section class="hero">
<img src="https://www.highlightschicago.com/services/images/services/electrical-panel-upgrade.jpg" alt="">
<div class="hero-inner">
<h1>Electrical services built around Chicago</h1>
<p>Explore service-specific guidance for safer installations, dependable repairs, and code-conscious electrical work across Chicago homes and businesses.</p>
<div class="hero-actions"><a href="https://www.highlightschicago.com/services#service-directory-title">Explore services</a><a href="https://www.highlightschicago.com/contact-us">Contact us</a></div>
</div>
</section>
<script>
${js}
</script>
</body>
</html>
`;
}
