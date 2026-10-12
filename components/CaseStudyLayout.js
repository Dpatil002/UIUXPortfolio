/**
 * CaseStudyLayout Component — Phase 4b Editorial Dark Theme
 * 
 * Strict editorial dark theme scoped to .case-study:
 * - Newsreader 300/400 (display serif) + Instrument Sans 400/500 (text/UI)
 * - Self-hosted woff2 with Google Fonts fallback, font-display: swap
 * - Color tokens: --cs-bg: #121417, --cs-surface: #1A1D21, --cs-line: rgba(253,253,253,.12)
 * - 4 Editorial chapters: Overview, Challenge, Approach, Outcome
 * - High-contrast accessible typography (contrast > 4.5:1)
 * - Decoupled content from data/projects/*.js
 */

import { DP_MARK_SVG } from './Logo.js';

export function renderCaseStudy(project) {
  const {
    meta,
    hero,
    tldr,
    problem,
    roleAndScope,
    keyDecisions,
    finalDesign,
    outcome,
    nextSteps,
    moreProjects = [],
    nextCaseStudy,
    prevCaseStudy,
    processArtifacts
  } = project;

  // Build more projects list (ensure 3 items)
  let displayProjects = moreProjects;
  if (!displayProjects || displayProjects.length === 0) {
    displayProjects = [];
    if (nextCaseStudy) {
      displayProjects.push({
        title: nextCaseStudy.title,
        tags: nextCaseStudy.category || "Case Study",
        image: nextCaseStudy.image,
        link: nextCaseStudy.link
      });
    }
    if (prevCaseStudy) {
      displayProjects.push({
        title: prevCaseStudy.title,
        tags: prevCaseStudy.category || "Case Study",
        image: prevCaseStudy.image,
        link: prevCaseStudy.link
      });
    }
  }

  // Hero meta list items
  const heroMetaList = hero.meta || [
    { label: "Scope", value: "Product Architecture · Design System" },
    { label: "Role", value: tldr.role },
    { label: "Client/Context", value: tldr.team },
    { label: "Year", value: "2026" },
    { label: "Status", value: tldr.status }
  ];

  // Decision blocks markup
  const decisionBlocksHtml = keyDecisions.map((decision, index) => {
    const num = String(index + 1).padStart(2, '0');
    const hotspotsHtml = decision.hotspots.map(spot => `
      <button 
        class="cs-hotspot" 
        data-hotspot-id="${spot.id}" 
        data-decision-id="${decision.id}"
        style="left: ${spot.x}%; top: ${spot.y}%;"
        aria-label="Hotspot ${spot.id}: ${spot.noteTitle}"
        aria-expanded="false"
      >
        <span class="cs-hotspot-ring"></span>
        <span class="cs-hotspot-dot">${spot.id}</span>
      </button>
    `).join('');

    const notesHtml = decision.hotspots.map(spot => `
      <div 
        class="cs-decision-note" 
        data-note-id="${spot.id}"
        data-decision-id="${decision.id}"
        tabindex="0"
        role="button"
        aria-pressed="false"
      >
        <span class="cs-note-num">${spot.id}</span>
        <div class="cs-note-body">
          <h4 class="cs-note-title">${spot.noteTitle}</h4>
          <p class="cs-note-text">${spot.noteText}</p>
        </div>
      </div>
    `).join('');

    return `
      <article class="cs-decision-subblock" id="${decision.id}">
        <div class="cs-decision-meta-row">
          <span class="cs-decision-badge">DECISION ${num}</span>
          <h3 class="cs-decision-title">${decision.title}</h3>
        </div>

        <div class="cs-decision-comparison">
          <div class="cs-options-considered">
            <h4 class="cs-col-subheading">Options considered</h4>
            <p>${decision.optionsConsidered}</p>
          </div>
          <div class="cs-chosen-decision">
            <h4 class="cs-col-subheading">What I chose and why</h4>
            <p>${decision.whatIChoseAndWhy}</p>
          </div>
        </div>

        <div class="cs-figure-mat cs-fade-rise" id="mat-${decision.id}">
          <div class="cs-annotated-wrap">
            <img 
              src="${decision.image}" 
              alt="${decision.imageAlt || decision.title}" 
              class="cs-annotated-img"
              loading="lazy"
              data-lightbox-src="${decision.image}"
              data-caption="${decision.title}"
            >
            <div class="cs-hotspots-layer">
              ${hotspotsHtml}
            </div>
          </div>
        </div>

        <div class="cs-decision-notes-list">
          ${notesHtml}
        </div>
      </article>
    `;
  }).join('');

  // Screens gallery markup
  const screens = finalDesign.screens || [];
  const totalScreens = screens.length;
  const screensHtml = screens.map((screen, idx) => `
    <figure class="cs-screen-figure cs-fade-rise" id="${screen.id || `screen-${idx + 1}`}">
      <div class="cs-figure-mat">
        <img 
          src="${screen.image}" 
          alt="${screen.alt}" 
          class="cs-gallery-img"
          loading="lazy"
          data-screen-index="${idx}"
          data-lightbox-src="${screen.image}"
          data-caption="${screen.caption}"
        >
      </div>
      <figcaption class="cs-figure-caption">
        <span class="cs-caption-index">${String(idx + 1).padStart(2, '0')}.</span> ${screen.caption}
      </figcaption>
    </figure>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}">
  <meta name="theme-color" content="#121417">

  <!-- Open Graph / Social Sharing -->
  <meta property="og:title" content="${meta.title}">
  <meta property="og:description" content="${meta.description}">
  <meta property="og:image" content="${meta.ogImage || '/og-image.png'}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="${meta.ogImage || '/og-image.png'}">
  <meta name="keywords" content="${meta.keywords}">
  
  <link rel="icon" href="/favicon.ico" sizes="48x48">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">

  <!-- Preload Newsreader 300 + Instrument Sans 400 only -->
  <link rel="preload" href="assets/fonts/newsreader-300.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="assets/fonts/instrument-sans-400.woff2" as="font" type="font/woff2" crossorigin>
  
  <!-- Google Fonts fallback with font-display: swap -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300;1,6..72,400&display=swap" rel="stylesheet">
  
  <!-- Preload LCP hero screenshot -->
  <link rel="preload" as="image" href="${hero.heroImage}" fetchpriority="high">
  
  <link rel="stylesheet" href="styles.css">
</head>
<body class="case-study">

  <!-- Skip link as first focusable element -->
  <a href="#main-content" class="skip-link">Skip to content</a>

  <!-- Fixed Reading Progress Bar (1px line, --cs-text at 40%) -->
  <div class="cs-reading-progress" id="cs-reading-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-label="Reading progress">
    <div class="cs-reading-progress-bar" id="cs-reading-progress-bar"></div>
  </div>

  <!-- NAVIGATION HEADER -->
  <header class="site-nav cs-dark-nav" id="top">
    <div class="container">
      <div class="nav-inner">
        <a href="/" class="nav-brand" id="nav-brand" aria-label="Digambar Patil — home">
          ${DP_MARK_SVG}
          <span class="brand-wordmark">
            <span class="brand-name">Digambar Patil</span>
            <span class="brand-title">Product Designer</span>
          </span>
        </a>
        <button class="nav-hamburger" id="nav-hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav-sheet">
          <span class="hamburger-bar"></span>
          <span class="hamburger-bar"></span>
        </button>
        <nav class="nav-links desktop-nav" id="nav-links" aria-label="Main Navigation">
          <a href="work.html" class="nav-link active" id="nav-work">Work</a>
          <a href="about.html" class="nav-link" id="nav-about">About</a>
          <a href="assets/Digambar_Patil_Resume.pdf" target="_blank" rel="noopener noreferrer" class="nav-link" id="nav-resume">Resume <span class="nav-external-icon" aria-hidden="true">↗</span></a>
          <a href="#contact" class="nav-contact-btn" id="nav-contact">Contact</a>
        </nav>
      </div>
    </div>

    <!-- Mobile Navigation Sheet (<768px) -->
    <div class="mobile-nav-sheet" id="mobile-nav-sheet" aria-hidden="true">
      <div class="sheet-inner">
        <nav class="sheet-nav-list" aria-label="Mobile Navigation">
          <a href="work.html" class="sheet-nav-link active" id="sheet-nav-work">Work</a>
          <a href="about.html" class="sheet-nav-link" id="sheet-nav-about">About</a>
          <a href="assets/Digambar_Patil_Resume.pdf" target="_blank" rel="noopener noreferrer" class="sheet-nav-link" id="sheet-nav-resume">Resume <span class="nav-external-icon" aria-hidden="true">↗</span></a>
          <a href="#contact" class="sheet-nav-link" id="sheet-nav-contact">Contact</a>
        </nav>
        <div class="sheet-footer">
          <a href="mailto:contact@digambarpatil.com" class="sheet-btn-primary">Email me</a>
          <div class="sheet-social-row">
            <a href="https://www.linkedin.com/in/digambar-patil-6847081aa/" target="_blank" rel="noopener noreferrer" class="sheet-social-link" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" class="sheet-social-icon" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.95 0-1.66.71-1.66 1.66 0 .93.71 1.64 1.66 1.64.92 0 1.63-.71 1.63-1.64 0-.95-.71-1.66-1.63-1.66z"></path></svg>
            </a>
            <a href="https://www.behance.net/digambarpatil2" target="_blank" rel="noopener noreferrer" class="sheet-social-link" aria-label="Behance">
              <svg viewBox="0 0 24 24" class="sheet-social-icon" aria-hidden="true"><path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-4.726 3-3.859 0-6-2.587-6-6 0-3.473 2.15-6 6-6 3.738 0 5.642 2.502 5.642 6 0 .546-.073 1.026-.142 1.275H16.03c.09 1.584 1.218 2.725 2.84 2.725 1.417 0 2.215-.658 2.531-1.5l2.325.5zm-5.726-5.5h3.69c-.114-1.392-1.04-2.225-2.23-2.225-1.282 0-2.193.858-2.36 2.225zM2 17h4.838c2.253 0 3.662-1.042 3.662-2.758 0-1.283-.815-2.075-1.928-2.317 1.036-.375 1.65-1.258 1.65-2.358C10.222 7.85 8.948 7 6.838 7H2v10zm2.703-8.208h2.07c1.03 0 1.62.466 1.62 1.241 0 .808-.62 1.292-1.62 1.292H4.703V8.792zm0 4.225h2.247c1.173 0 1.83.508 1.83 1.392 0 .891-.657 1.391-1.83 1.391H4.703v-2.783z"></path></svg>
            </a>
          </div>
          <p class="sheet-status-text">Open to full-time roles · Pune / Remote</p>
        </div>
      </div>
    </div>
  </header>

  <!-- Sticky Mobile Section Nav Pill (<1024px) -->
  <div class="cs-sticky-toc-pill-wrap" id="cs-sticky-toc-pill-wrap">
    <button class="cs-toc-pill" id="cs-toc-pill" aria-expanded="false" aria-controls="cs-toc-sheet">
      <span>On this page</span>
      <span class="cs-pill-chevron" aria-hidden="true">▾</span>
    </button>
  </div>

  <!-- Mobile Bottom Sheet TOC -->
  <div class="cs-toc-sheet-backdrop" id="cs-toc-sheet-backdrop" aria-hidden="true">
    <div class="cs-toc-sheet" id="cs-toc-sheet" role="dialog" aria-modal="true" aria-label="Table of contents">
      <div class="cs-toc-sheet-handle-bar"></div>
      <div class="cs-toc-sheet-header">
        <h3 class="cs-toc-sheet-title">On this page</h3>
        <button class="cs-toc-sheet-close" id="cs-toc-sheet-close" aria-label="Close table of contents">✕</button>
      </div>
      <nav class="cs-toc-sheet-nav" aria-label="Chapters on this page">
        <a href="#overview" class="cs-toc-sheet-link">1. Overview</a>
        <a href="#challenge" class="cs-toc-sheet-link">2. Challenge</a>
        <a href="#approach" class="cs-toc-sheet-link">3. Approach</a>
        <a href="#outcome" class="cs-toc-sheet-link">4. Outcome</a>
        ${processArtifacts && processArtifacts.length > 0 ? `<a href="#process-artefacts" class="cs-toc-sheet-link">Process artefacts</a>` : ''}
        <a href="#more-projects" class="cs-toc-sheet-link">More projects</a>
      </nav>
    </div>
  </div>

  <main id="main-content" class="cs-main">
    
    <!-- HERO SECTION -->
    <section class="cs-hero" id="hero">
      <div class="container">
        
        <div class="cs-breadcrumb">
          <a href="work.html" class="cs-back-btn">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
            <span>All Selected Work</span>
          </a>
        </div>

        <div class="cs-hero-header">
          <div class="cs-hero-eyebrow">${hero.projectName || hero.eyebrow}</div>
          <h1 class="cs-hero-title">${hero.title}</h1>
          <p class="cs-hero-summary">${hero.summary}</p>

          <!-- META LIST as <dl> -->
          <dl class="cs-hero-meta">
            ${heroMetaList.map(item => `
              <div class="cs-meta-item">
                <dt class="cs-meta-label">${item.label}</dt>
                <dd class="cs-meta-value">${item.value}</dd>
              </div>
            `).join('')}
          </dl>
        </div>

        <!-- HERO IMAGE (16:10, on --cs-surface, radius 8px, mobile edge-to-edge) -->
        <div class="cs-hero-image-wrap">
          <img 
            src="${hero.heroImage}" 
            alt="${hero.heroImageAlt || hero.title}" 
            class="cs-hero-image" 
            width="1200" 
            height="750"
            fetchpriority="high"
          >
        </div>

      </div>
    </section>

    <!-- CONTENT CHAPTERS CONTAINER -->
    <div class="container cs-content-container">

      <!-- CHAPTER 1: OVERVIEW -->
      <section class="cs-chapter" id="overview">
        <div class="cs-chapter-grid">
          <div class="cs-chapter-aside">
            <h2 class="cs-chapter-title">Overview</h2>
          </div>
          <div class="cs-chapter-content">
            <!-- TL;DR Key Outcome Callout -->
            <div class="cs-tldr-editorial">
              <span class="cs-tldr-badge">TL;DR · KEY OUTCOME</span>
              <p class="cs-tldr-outcome-text">${tldr.keyOutcome}</p>
            </div>

            <!-- The Problem Prose -->
            <div class="cs-prose">
              <h3 class="cs-section-subtitle">The problem</h3>
              ${problem.paragraphs.map(p => `<p>${p}</p>`).join('')}
              ${problem.pullQuote ? `
                <blockquote class="cs-pull-quote">
                  <p>"${problem.pullQuote}"</p>
                </blockquote>
              ` : ''}
            </div>
          </div>
        </div>
      </section>

      <!-- CHAPTER 2: CHALLENGE -->
      <section class="cs-chapter" id="challenge">
        <div class="cs-chapter-grid">
          <div class="cs-chapter-aside">
            <h2 class="cs-chapter-title">Challenge</h2>
          </div>
          <div class="cs-chapter-content">
            <div class="cs-prose">
              <h3 class="cs-section-subtitle">My role and scope</h3>
              <p class="cs-scope-intro">Here is how ownership was partitioned across product architecture, interface design, and client operational constraints:</p>
              
              <div class="cs-scope-split">
                <div class="cs-scope-col">
                  <h4 class="cs-scope-col-title">What I owned</h4>
                  <ul class="cs-scope-list">
                    ${roleAndScope.owned.map(item => `<li>${item}</li>`).join('')}
                  </ul>
                </div>
                ${roleAndScope.othersOwned && roleAndScope.othersOwned.length > 0 ? `
                  <div class="cs-scope-col">
                    <h4 class="cs-scope-col-title">What others owned / constraints</h4>
                    <ul class="cs-scope-list cs-scope-list-muted">
                      ${roleAndScope.othersOwned.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CHAPTER 3: APPROACH -->
      <section class="cs-chapter" id="approach">
        <div class="cs-chapter-grid">
          <div class="cs-chapter-aside">
            <h2 class="cs-chapter-title">Approach</h2>
          </div>
          <div class="cs-chapter-content">
            <div class="cs-prose">
              <h3 class="cs-section-subtitle">Key architectural decisions</h3>
              <p>Every core interaction was architected through rigorous evaluation of cognitive trade-offs, defensive failure states, and operator ergonomics.</p>
            </div>

            <!-- Decision Blocks (H3 sub-blocks) -->
            <div class="cs-decisions-list">
              ${decisionBlocksHtml}
            </div>

            <!-- Final Design Screen Gallery -->
            <div class="cs-gallery-section" id="final-design">
              <h3 class="cs-section-subtitle">Final design</h3>
              <p class="cs-gallery-intro">Production-ready interface workflows operating across client tenants:</p>
              
              <!-- Screen gallery figures on --cs-surface mats -->
              <div class="cs-editorial-gallery">
                ${screensHtml}
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- CHAPTER 4: OUTCOME -->
      <section class="cs-chapter" id="outcome">
        <div class="cs-chapter-grid">
          <div class="cs-chapter-aside">
            <h2 class="cs-chapter-title">Outcome</h2>
          </div>
          <div class="cs-chapter-content">
            
            <!-- Outcome Stats (Number in Newsreader 300, 48px/64px, label 13px beneath, 1px --cs-line top rule, no card bg) -->
            <div class="cs-outcome-stats-rule">
              <div class="cs-stats-editorial-grid">
                ${outcome.statCards.map(s => `
                  <div class="cs-stat-editorial-item">
                    <span class="cs-stat-editorial-number">${s.number}</span>
                    <span class="cs-stat-editorial-label">${s.label}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- What I'd Do Next (3 bullets) -->
            <div class="cs-prose cs-next-steps-editorial">
              <h3 class="cs-section-subtitle">What I'd do next</h3>
              <ul class="cs-next-steps-list">
                ${nextSteps.map(step => `<li>${step}</li>`).join('')}
              </ul>
            </div>

          </div>
        </div>
      </section>

      <!-- PROCESS ARTEFACTS ACCORDION (Stays last, collapsed) -->
      ${processArtifacts && processArtifacts.length > 0 ? `
        <section class="cs-chapter cs-chapter-artefacts" id="process-artefacts">
          <div class="cs-chapter-grid">
            <div class="cs-chapter-aside">
              <h2 class="cs-chapter-title">Artefacts</h2>
            </div>
            <div class="cs-chapter-content">
              <details class="cs-artefacts-accordion">
                <summary class="cs-artefacts-summary">
                  <span class="cs-artefacts-summary-text">Process artefacts &amp; research frameworks (${processArtifacts.length})</span>
                  <span class="cs-accordion-chevron" aria-hidden="true">▾</span>
                </summary>
                <div class="cs-artefacts-drawer">
                  ${processArtifacts.map(art => `
                    <div class="cs-artefact-section">
                      <h4 class="cs-artefact-title">${art.title}</h4>
                      ${art.contentHtml}
                    </div>
                  `).join('')}
                </div>
              </details>
            </div>
          </div>
        </section>
      ` : ''}

    </div>

    <!-- MORE PROJECTS SECTION (replaces single next/prev card) -->
    <section class="cs-more-projects-section" id="more-projects">
      <div class="container">
        <div class="cs-more-projects-header">
          <h2 class="cs-more-projects-title">More projects</h2>
        </div>
        <div class="cs-more-projects-carousel">
          ${displayProjects.map(proj => `
            <a href="${proj.link}" class="cs-more-project-card">
              <div class="cs-more-project-img-wrap">
                <img src="${proj.image}" alt="${proj.title}" class="cs-more-project-img" loading="lazy">
              </div>
              <div class="cs-more-project-info">
                <h3 class="cs-more-project-name">${proj.title}</h3>
                <span class="cs-more-project-tags">${proj.tags}</span>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

  </main>

  <!-- Fullscreen Lightbox Modal -->
  <div class="cs-lightbox" id="cs-lightbox" role="dialog" aria-modal="true" aria-hidden="true" aria-label="Image lightbox">
    <div class="cs-lightbox-backdrop" id="cs-lightbox-backdrop"></div>
    <div class="cs-lightbox-dialog">
      <div class="cs-lightbox-top-bar">
        <span class="cs-lightbox-counter" id="cs-lightbox-counter">1 / ${totalScreens}</span>
        <button class="cs-lightbox-close" id="cs-lightbox-close" aria-label="Close lightbox (Escape)">✕</button>
      </div>
      <div class="cs-lightbox-stage" id="cs-lightbox-stage">
        <button class="cs-lightbox-prev" id="cs-lightbox-prev" aria-label="Previous image (Left arrow)">‹</button>
        <div class="cs-lightbox-img-wrap" id="cs-lightbox-img-wrap">
          <img src="" alt="" id="cs-lightbox-img" class="cs-lightbox-img">
        </div>
        <button class="cs-lightbox-next" id="cs-lightbox-next" aria-label="Next image (Right arrow)">›</button>
      </div>
      <div class="cs-lightbox-caption" id="cs-lightbox-caption"></div>
    </div>
  </div>

  <!-- FOOTER / CONTACT SECTION (Dark Tokens) -->
  <footer class="site-footer cs-dark-footer" id="contact">
    <div class="container">
      <div class="footer-top-row">
        <div class="footer-cta-col">
          <p class="footer-subheading">HAVE A PRODUCT IN MIND?</p>
          <a href="mailto:contact@digambarpatil.com" class="footer-huge-link" id="footer-email-link">
            <span>Let's talk</span>
            <svg class="footer-huge-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>
        </div>
        <div class="footer-meta-col">
          <p class="footer-loc-time"><span id="live-time">Pune, India · IST</span> · Available for Design Roles</p>
          <div class="footer-socials">
            <a href="https://www.linkedin.com/in/digambar-patil-6847081aa/" target="_blank" rel="noopener noreferrer" class="footer-social-link">LinkedIn ↗</a>
            <a href="https://www.behance.net/digambarpatil2" target="_blank" rel="noopener noreferrer" class="footer-social-link">Behance ↗</a>
            <a href="assets/Digambar_Patil_Resume.pdf" target="_blank" rel="noopener noreferrer" class="footer-social-link">Resume ↗</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom-row">
        <p class="footer-copyright">© 2026 Digambar Patil. Crafted with care.</p>
        <a href="#top" class="footer-back-to-top">Back to top ↑</a>
      </div>
    </div>
  </footer>

  <script src="script.js"></script>
</body>
</html>
`;
}
