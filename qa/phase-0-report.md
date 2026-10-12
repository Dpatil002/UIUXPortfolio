# Phase 0 Audit & Architecture Map: digambarpatil.com

**Execution Date:** October 12, 2026  
**Auditor:** Senior Design Engineer  
**Mode:** Read-only architectural mapping & baseline audit (Zero source modifications applied)  
**Baseline Screenshots Directory:** `qa/baseline/` (36 total full-page captures across 4 viewports)

---

## 1. Repository & Technical Architecture Map

| Architectural Pillar | Current Implementation | Details & Observations |
| :--- | :--- | :--- |
| **Framework & Version** | Pure Static HTML5 / Vanilla JS | No JS frameworks (No Next.js, Vite, React runtime, or Astro). No `package.json` at project root. |
| **Router** | Native Browser MPA (Multi-Page App) | Native document requests between `.html` files. Hosted on Netlify (`netlify.toml` handles caching & security headers). |
| **Styling Approach** | Monolithic Global CSS (`styles.css`) | Single stylesheet of ~7,957 lines (~162 KB). No CSS Modules, Sass, or active Tailwind compiler at build time. |
| **Global Styles & Tokens** | `:root` in `styles.css` | Comprehensive CSS Custom Properties defined across lines 1–120 (neutrals, accent tokens: `--gold`, `--emerald`, `--plum`, `--amber`, typography, glassmorphism filters, border radiuses). |
| **Components Directory** | `components/ui/` | Contains React/TypeScript components (`button.tsx`, `button-with-icon.tsx`, `cursor-trail.tsx`, `lib/utils.ts`). *Note: These are isolated component templates not directly bundled into the static HTML pages.* HTML pages use reusable CSS classes (`.btn-pill-solid`, `.site-nav`, `.nav-mobile-drawer`, `.site-footer`). |
| **Page Content Storage** | Inline Hardcoded Static HTML | All page copy, headlines, meta badges, case study narratives, and metrics are written directly in HTML files. No external JSON/Markdown content store. |
| **Asset & Image Storage** | `assets/images/` | 47 raster and vector assets (`.jpg`, `.png`, `.svg`). Resumes stored in `assets/` (`resume.pdf`, `Digambar_Patil_Resume.pdf`). |
| **Case Study Architecture** | Standalone File-Per-Case-Study | Built as separate custom HTML pages sharing navigation and footer paradigms, but with tailored editorial layouts. |

---

## 2. Complete Route Inventory

The site contains **9 total routes**:

1. **`/` (`index.html`)** — Homepage & Selected Work Showcase (Hero, Marquee, Featured Carousel, What I Do, Selected Work List, Kind Words, About Teaser, Footer)
2. **`/work` (`work.html`)** — Selected Projects Grid (Category filter tabs: All, Websites, Web Applications, Mobile Apps)
3. **`/about` (`about.html`)** — About & Background (Biography, Design Philosophy, Career Experience, Tools & Methodologies, Personal Interests)
4. **`/tythas-control-center` (`tythas-control-center.html`)** — B2B SaaS Enterprise UX Case Study (Logistics ERP, Design System, Live Metrics)
5. **`/soche` (`soche.html`)** — Luxury D2C & Wholesale Spice Platform Case Study (Shopify Plus, B2B wholesale portal)
6. **`/raya` (`raya.html`)** — AI-Powered Voice & Vision Fitness Coach Case Study (India-first conversational health UX)
7. **`/before-two` (`before-two.html`)** — Tap2Order QR Food Ordering UX Case Study (High-contrast dark-mode restaurant ordering)
8. **`/copper-chocs` (`copper-chocs.html`)** — Artisanal Bakery E-Commerce & Gifting UX Case Study
9. **`/elixir-helps` (`elixir-helps.html`)** — Healthcare Accessibility & Clinic Booking Web UX Case Study

---

## 3. Baseline Screenshots Matrix

All 9 routes have been rendered and captured at 4 viewport widths (2x DPR) into `qa/baseline/`:

| Route | 360px Viewport | 390px Viewport | 768px Viewport | 1440px Viewport |
| :--- | :--- | :--- | :--- | :--- |
| **`/`** | [`home_360.png`](qa/baseline/home_360.png) | [`home_390.png`](qa/baseline/home_390.png) | [`home_768.png`](qa/baseline/home_768.png) | [`home_1440.png`](qa/baseline/home_1440.png) |
| **`/work`** | [`work_360.png`](qa/baseline/work_360.png) | [`work_390.png`](qa/baseline/work_390.png) | [`work_768.png`](qa/baseline/work_768.png) | [`work_1440.png`](qa/baseline/work_1440.png) |
| **`/about`** | [`about_360.png`](qa/baseline/about_360.png) | [`about_390.png`](qa/baseline/about_390.png) | [`about_768.png`](qa/baseline/about_768.png) | [`about_1440.png`](qa/baseline/about_1440.png) |
| **`/tythas-control-center`** | [`tythas-control-center_360.png`](qa/baseline/tythas-control-center_360.png) | [`tythas-control-center_390.png`](qa/baseline/tythas-control-center_390.png) | [`tythas-control-center_768.png`](qa/baseline/tythas-control-center_768.png) | [`tythas-control-center_1440.png`](qa/baseline/tythas-control-center_1440.png) |
| **`/soche`** | [`soche_360.png`](qa/baseline/soche_360.png) | [`soche_390.png`](qa/baseline/soche_390.png) | [`soche_768.png`](qa/baseline/soche_768.png) | [`soche_1440.png`](qa/baseline/soche_1440.png) |
| **`/raya`** | [`raya_360.png`](qa/baseline/raya_360.png) | [`raya_390.png`](qa/baseline/raya_390.png) | [`raya_768.png`](qa/baseline/raya_768.png) | [`raya_1440.png`](qa/baseline/raya_1440.png) |
| **`/before-two`** | [`before-two_360.png`](qa/baseline/before-two_360.png) | [`before-two_390.png`](qa/baseline/before-two_390.png) | [`before-two_768.png`](qa/baseline/before-two_768.png) | [`before-two_1440.png`](qa/baseline/before-two_1440.png) |
| **`/copper-chocs`** | [`copper-chocs_360.png`](qa/baseline/copper-chocs_360.png) | [`copper-chocs_390.png`](qa/baseline/copper-chocs_390.png) | [`copper-chocs_768.png`](qa/baseline/copper-chocs_768.png) | [`copper-chocs_1440.png`](qa/baseline/copper-chocs_1440.png) |
| **`/elixir-helps`** | [`elixir-helps_360.png`](qa/baseline/elixir-helps_360.png) | [`elixir-helps_390.png`](qa/baseline/elixir-helps_390.png) | [`elixir-helps_768.png`](qa/baseline/elixir-helps_768.png) | [`elixir-helps_1440.png`](qa/baseline/elixir-helps_1440.png) |

---

## 4. Mobile Ergonomics & Quality Audit (360px Viewport)

### 4.1 Route-by-Route Breakdown

#### 1. Home (`/`)
* **Horizontal Scroll:** **No** (Controlled via `overflow-x: clip / hidden`). Note: Marquee track (`.marquee-track`) overflows offscreen intentionally inside an `overflow: hidden` wrapper.
* **Text < 14px:** **72 instances**. Primary offenders: `.meta-label` (11px uppercase), `.featured-tag` (12px), `.stat-label` (12px), timestamp dates (12.8px).
* **Tap Targets < 44×44px:** **16 targets**. Carousel indicator dots (`.dot`, 24×24px and 32×24px), social links in footer (32px height), carousel arrow navigation buttons.
* **Images > Viewport / Missing Lazy:** 0 wider than 360px. Above-fold hero images are eager (proper), below-fold images contain `loading="lazy"`.
* **Hover-Only Interactions:** Desktop cursor-following gradient spotlight (`.cursor-spotlight`) and card lift states (`.project-image-card:hover`) lack distinct touch equivalents.
* **Sections with Vertical Padding > 64px on Mobile:** **5 sections**:
  * `section#work.selected-work-section`: 72px top / 72px bottom
  * `section.what-i-do-section`: 72px top / 72px bottom
  * `section.kind-words-section`: 72px top / 72px bottom
  * `section#resume.things-section`: 72px top / 72px bottom
  * `footer#contact.site-footer`: 88px top / 48px bottom

#### 2. Work (`/work`)
* **Horizontal Scroll:** **No**. Filter button group (`.work-filter-bar`) flex-wraps or scrolls horizontally smoothly.
* **Text < 14px:** **17 instances**. Filter button text (`.work-filter-btn`: 13.12px), card metadata tags (`.project-tag`: 12px).
* **Tap Targets < 44×44px:** **11 targets**. Filter buttons (`.work-filter-btn`: height 40px, width 51px to 134px), card arrow buttons.
* **Images > Viewport / Missing Lazy:** 0 wider than viewport.
* **Hover-Only Interactions:** Project card zoom and border glow trigger on `:hover` only.
* **Sections with Vertical Padding > 64px on Mobile:** **2 sections**:
  * `section.work-header-section`: 72px top / 56px bottom
  * `footer#contact.site-footer`: 88px top / 48px bottom

#### 3. About (`/about`)
* **Horizontal Scroll:** **No**.
* **Text < 14px:** **65 instances**. Career dates (`.exp-duration`: 12.5px), location markers (`.exp-location`: 13px), sub-role durations (`.exp-duration-sub`: 12px), skills category chips (12.8px).
* **Tap Targets < 44×44px:** **1 target**. Footer email link (`#footer-email`: computed clickable height 22px).
* **Images > Viewport / Missing Lazy:** 0 wider than viewport.
* **Hover-Only Interactions:** Workspace photo card hover tilt and experience item active borders.
* **Sections with Vertical Padding > 64px on Mobile:** **7 sections**:
  * `section.about-hero-section`: 72px top / 56px bottom
  * `section.about-philosophy-section`: 72px top / 72px bottom
  * `section.about-experience-section`: 72px top / 72px bottom
  * `section.about-skills-tools-section`: 72px top / 72px bottom
  * `section.about-life-section`: 72px top / 72px bottom
  * `section.about-music-section`: 72px top / 72px bottom
  * `footer#contact.site-footer`: 88px top / 48px bottom

#### 4. Tythas Control Center (`/tythas-control-center`)
* **Horizontal Scroll:** **No** at document level. Roadmap pill container scrolls horizontally via dedicated touch wrapper.
* **Text < 14px:** **159 instances**. Badges (`.cs-tag-badge`: 12px), metadata labels (`.cs-meta-label`: 12px), metric descriptions, data table cells.
* **Tap Targets < 44×44px:** **5 targets**. Back button (`.cs-back-btn`: 181×23px), footer social pills (`.footer-social-link`: height 26px).
* **Images > Viewport / Missing Lazy:** 0 wider than viewport.
* **Hover-Only Interactions:** Interactive metric cards and architecture flow tooltips.
* **Sections with Vertical Padding > 64px on Mobile:** **2 sections**:
  * `section.cs-hero-section`: 88px top / 40px bottom
  * `footer#contact.site-footer`: 88px top / 48px bottom

#### 5. Soché (`/soche`)
* **Horizontal Scroll:** **Yes** (Noticeable issue: Sticky Table of Contents `.cs-sticky-toc` links push wide content, causing subpixel document overflow or horizontal drag on narrow screens).
* **Text < 14px:** **251 instances**. Category pills (12px), metadata labels (11.52px), diagram labels (12px), ATS optimization pills (12.8px).
* **Tap Targets < 44×44px:** **16 targets**. Table of contents pills (`.soche-toc-link`: height 38px), external link badges (`.soche-live-badge`: height 32px), back button (height 23px).
* **Images > Viewport / Missing Lazy:** 0 wider than viewport.
* **Hover-Only Interactions:** Browser mockup frame hover-glow and quote cards.
* **Sections with Vertical Padding > 64px on Mobile:** **2 sections**:
  * `section.cs-hero-section.soche-hero`: 88px top / 40px bottom
  * `footer#contact.site-footer`: 88px top / 48px bottom

#### 6. Raya (`/raya`)
* **Horizontal Scroll:** **No** at document level (Task table `.ry-task-table` contained in scroll container with width 820px).
* **Text < 14px:** **219 instances**. Tag badges (12px), meta labels (12px), persona demographic cards (12.8px), benchmark matrix headers (13px).
* **Tap Targets < 44×44px:** **5 targets**. Back button (height 23px), footer social pills (height 26px).
* **Images > Viewport / Missing Lazy:** 0 wider than viewport.
* **Hover-Only Interactions:** Voice interaction waveform cards and prototype modal triggers.
* **Sections with Vertical Padding > 64px on Mobile:** **2 sections**:
  * `section.cs-hero-section`: 88px top / 40px bottom
  * `footer#contact.site-footer`: 88px top / 48px bottom

#### 7. Before Two (`/before-two`)
* **Horizontal Scroll:** **No** at document level (Matrix table `.cs-matrix-table` width 650px inside touch-scroll wrapper).
* **Text < 14px:** **202 instances**. Metadata labels (12px), research percentage callouts, usability test quotes (13px).
* **Tap Targets < 44×44px:** **18 targets**. Table of contents links (`.cs-toc-link`: height 35px), back button (height 23px), footer links.
* **Images > Viewport / Missing Lazy:** 0 wider than viewport.
* **Hover-Only Interactions:** QR flow card hover transitions.
* **Sections with Vertical Padding > 64px on Mobile:** **2 sections**:
  * `section.cs-hero-section`: 88px top / 40px bottom
  * `footer#contact.site-footer`: 88px top / 48px bottom

#### 8. Copper Chocs (`/copper-chocs`)
* **Horizontal Scroll:** **Yes** (`.cs-sticky-toc .cs-toc-link.cc-link` chips overflow the viewport container without flex-shrink limits).
* **Text < 14px:** **162 instances**. E-commerce tags (12px), ingredient matrix pills (12.5px), UX audit notes.
* **Tap Targets < 44×44px:** **12 targets**. Back button (height 23px), live store link (`COPPERCHOCS.COM ↗`: height 32px), TOC navigation chips (height 35px).
* **Images > Viewport / Missing Lazy:** 0 wider than viewport.
* **Hover-Only Interactions:** Product card image swaps and chocolate packaging showcase cards.
* **Sections with Vertical Padding > 64px on Mobile:** **2 sections**:
  * `section.cs-hero-section`: 88px top / 40px bottom
  * `footer#contact.site-footer`: 88px top / 48px bottom

#### 9. Elixir Helps (`/elixir-helps`)
* **Horizontal Scroll:** **No** at document level.
* **Text < 14px:** **165 instances**. Healthcare specialty pills (12px), timeline labels (12px), patient journey steps.
* **Tap Targets < 44×44px:** **10 targets**. Back button (height 23px), live site link badge (height 32px), TOC link chips (height 35px).
* **Images > Viewport / Missing Lazy:** 0 wider than viewport.
* **Hover-Only Interactions:** Before/after UI comparison sliders.
* **Sections with Vertical Padding > 64px on Mobile:** **2 sections**:
  * `section.cs-hero-section`: 88px top / 40px bottom
  * `footer#contact.site-footer`: 88px top / 48px bottom

---

## 5. Mobile Lighthouse Performance & CWV Audits

Audited in Mobile Emulation Mode (Moto G Power profile, Simulated 4G, CPU Throttling):

| Metric / Category | Route: `/` (`index.html`) | Route: `/raya` (`raya.html`) | Target Benchmark |
| :--- | :--- | :--- | :--- |
| **Performance** | **63 / 100** ⚠️ | **74 / 100** 🟡 | ≥ 90 |
| **Accessibility** | **98 / 100** ✅ | **94 / 100** ✅ | ≥ 95 |
| **Best Practices** | **96 / 100** ✅ | **96 / 100** ✅ | ≥ 95 |
| **SEO** | **100 / 100** 🏆 | **100 / 100** 🏆 | 100 |
| **LCP (Largest Contentful Paint)** | **15.5 s** 🛑 *(Hero image payload)* | **4.2 s** 🟡 *(Uncompressed SVG hero)* | < 2.5 s |
| **CLS (Cumulative Layout Shift)** | **0.00** 🏆 | **0.00** 🏆 | < 0.1 |
| **INP (Interaction to Next Paint)** | **Passed / Responsive** | **Passed / Responsive** | < 200 ms |

### Performance Bottlenecks Identified:
1. **LCP on `/` (15.5s):** The hero photograph `assets/images/portrait.jpg` / `featured_hero.jpg` is served as an unoptimized high-res raster asset (~780 KB+) without responsive `<picture>` srcset or WebP/AVIF modern image formats.
2. **Render-Blocking CSS:** `styles.css` is loaded synchronously as a 162 KB single file before First Contentful Paint.
3. **Web Font Loading:** Google Fonts (`Newsreader`, `Plus Jakarta Sans`, `Space Grotesk`) are requested via 4 separate `<link>` stylesheets rather than combined or preloaded.

---

## 6. Comprehensive Hard-Coded Email Inventory

Grep audit of all email strings across the entire codebase revealed **18 instances** across HTML files and UI components, including a **critical identity inconsistency**:

| File Path | Line # | Hard-Coded Value | Element Context | Role / Inconsistency Note |
| :--- | :--- | :--- | :--- | :--- |
| [`index.html`](index.html#L46) | 46 | `contact@digambarpatil.com` | `<a id="nav-contact">` | Main custom domain email |
| [`index.html`](index.html#L799) | 799 | `contact@digambarpatil.com` | `<a id="cta-contact-btn">` | CTA button email |
| [`index.html`](index.html#L1213-L1214) | 1213–1214 | `contact@digambarpatil.com` | `<a id="footer-email">` | Footer link and anchor text |
| [`work.html`](work.html#L45) | 45 | `contact@digambarpatil.com` | `<a id="nav-contact">` | Main custom domain email |
| [`work.html`](work.html#L276-L277) | 276–277 | `contact@digambarpatil.com` | `<a id="footer-email">` | Footer link and anchor text |
| [`about.html`](about.html#L45) | 45 | `contact@digambarpatil.com` | `<a id="nav-contact">` | Main custom domain email |
| [`about.html`](about.html#L367-L368) | 367–368 | `contact@digambarpatil.com` | `<a id="footer-email">` | Footer link and anchor text |
| [`soche.html`](soche.html#L46) | 46 | `contact@digambarpatil.com` | `<a id="nav-contact">` | Main custom domain email |
| [`soche.html`](soche.html#L1216-L1217) | 1216–1217 | `contact@digambarpatil.com` | `<a id="footer-email">` | Footer link and anchor text |
| [`before-two.html`](before-two.html#L45) | 45 | `contact@digambarpatil.com` | `<a id="nav-contact">` | Main custom domain email |
| [`before-two.html`](before-two.html#L1303-L1304) | 1303–1304 | `contact@digambarpatil.com` | `<a id="footer-email">` | Footer link and anchor text |
| [`copper-chocs.html`](copper-chocs.html#L45) | 45 | `contact@digambarpatil.com` | `<a id="nav-contact">` | Main custom domain email |
| [`copper-chocs.html`](copper-chocs.html#L1244-L1245) | 1244–1245 | `contact@digambarpatil.com` | `<a id="footer-email">` | Footer link and anchor text |
| [`elixir-helps.html`](elixir-helps.html#L45) | 45 | `contact@digambarpatil.com` | `<a id="nav-contact">` | Main custom domain email |
| [`elixir-helps.html`](elixir-helps.html#L1095-L1096) | 1095–1096 | `contact@digambarpatil.com` | `<a id="footer-email">` | Footer link and anchor text |
| [`components/ui/button-with-icon.tsx`](components/ui/button-with-icon.tsx#L34) | 34 | `contact@digambarpatil.com` | Default prop in component | Main custom domain email |
| **[`tythas-control-center.html`](tythas-control-center.html#L46)** | **46** | **`patildigambarr@gmail.com`** | `<a id="nav-contact">` | ⚠️ **MISMATCH:** Personal Gmail used instead of domain |
| **[`tythas-control-center.html`](tythas-control-center.html#L1051)** | **1051** | **`patildigambarr@gmail.com`** | `<a id="footer-email-link">` | ⚠️ **MISMATCH:** Personal Gmail used instead of domain |
| **[`raya.html`](raya.html#L45)** | **45** | **`patildigambarr@gmail.com`** | `<a id="nav-contact">` | ⚠️ **MISMATCH:** Personal Gmail used instead of domain |
| **[`raya.html`](raya.html#L1275)** | **1275** | **`patildigambarr@gmail.com`** | `<a id="footer-email-link">` | ⚠️ **MISMATCH:** Personal Gmail used instead of domain |

---

## 7. Strategic Recommendations for Upcoming Phases

1. **Email Normalization:** Standardize all navigation and footer contact links to either `contact@digambarpatil.com` or `patildigambarr@gmail.com` across `tythas-control-center.html` and `raya.html`.
2. **Mobile Typography Scale (360px):** Upgrade all sub-14px metadata labels, pills, and date indicators using fluid CSS `clamp(0.875rem, ...)` or setting an explicit mobile base of `14px` with `letter-spacing` and uppercase styling for microcopy readability.
3. **Touch Targets (44×44px):** Expand clickable hit areas for `.dot` carousel buttons, `.footer-social-link`, `.cs-back-btn`, and TOC chips via pseudo-elements (`::after` with minimum 44px bounding box).
4. **Horizontal Scroll Elimination:** Contain `.cs-sticky-toc` in a strict flex-wrap or `overflow-x: auto; -webkit-overflow-scrolling: touch` container on `soche.html` and `copper-chocs.html`.
5. **Mobile Vertical Section Rhythm:** Restructure desktop section padding (`72px`–`88px`) into a mobile-first base (`clamp(2.5rem, 6vw, 4rem)`) so vertical scroll fatigue is minimized on mobile viewports.
6. **LCP & Image Optimization:** Convert hero portrait and showcase covers to responsive WebP with `fetchpriority="high"` on hero images.
