/**
 * CaseStudyLayout Component
 * Renders the standardized case study template conforming to Phase 4 rules.
 * All project copy comes from data/projects/*.js — layout code remains decoupled.
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
    nextCaseStudy,
    prevCaseStudy,
    processArtifacts
  } = project;

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
      <article class="cs-decision-block reveal-on-scroll" id="${decision.id}">
        <div class="cs-decision-header">
          <span class="cs-decision-badge">Decision ${num}</span>
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

        <div class="cs-annotated-image-wrap">
          <div class="cs-annotated-image-stage">
            <img 
              src="${decision.image}" 
              alt="${decision.imageAlt}" 
              class="cs-annotated-img" 
              loading="lazy" 
              width="1200" 
              height="680"
            >
            <div class="cs-hotspots-layer" aria-hidden="false">
              ${hotspotsHtml}
            </div>
          </div>
          <div class="cs-decision-notes-list" aria-label="Annotated notes for ${decision.title}">
            ${notesHtml}
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Screen gallery markup
  const totalScreens = finalDesign.screens.length;
  const screensHtml = finalDesign.screens.map((screen, idx) => `
    <figure 
      class="cs-gallery-item" 
      data-gallery-index="${idx}"
      tabindex="0"
      role="button"
      aria-label="View screenshot ${idx + 1}: ${screen.alt}"
    >
      <div class="cs-gallery-media aspect-16-10">
        <img 
          src="${screen.image}" 
          alt="${screen.alt}" 
          class="cs-gallery-img" 
          loading="lazy" 
          width="1200" 
          height="750"
        >
        <span class="cs-gallery-zoom-badge" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
        </span>
      </div>
      <figcaption class="cs-gallery-caption">
        <span class="cs-caption-index">${idx + 1} / ${totalScreens}</span>
        <span class="cs-caption-text">${screen.caption}</span>
      </figcaption>
    </figure>
  `).join('');

  // Outcome stat cards markup (same component as homepage proof bar)
  const statCardsHtml = outcome.statCards.map(card => `
    <div class="proof-card">
      <span class="proof-num">${card.number}</span>
      <span class="proof-label">${card.label}</span>
    </div>
  `).join('');

  // Next steps bullets
  const nextStepsHtml = nextSteps.map(step => `
    <li class="cs-step-bullet">
      <span class="cs-bullet-dot" aria-hidden="true"></span>
      <span>${step}</span>
    </li>
  `).join('');

  // Role bullets
  const ownedBulletsHtml = roleAndScope.owned.map(item => `
    <li class="cs-scope-item owned">
      <span class="cs-scope-icon" aria-hidden="true">✓</span>
      <span>${item}</span>
    </li>
  `).join('');

  const othersOwnedBulletsHtml = roleAndScope.othersOwned.map(item => `
    <li class="cs-scope-item others">
      <span class="cs-scope-icon" aria-hidden="true">→</span>
      <span>${item}</span>
    </li>
  `).join('');

  // Process Artefacts Accordion (if present in project data)
  let processArtefactsHtml = '';
  if (processArtifacts && processArtifacts.length > 0) {
    const items = processArtifacts.map(art => `
      <details class="cs-artefact-item">
        <summary class="cs-artefact-summary">
          <span>${art.title}</span>
          <span class="cs-accordion-icon" aria-hidden="true">▾</span>
        </summary>
        <div class="cs-artefact-body">
          ${art.contentHtml}
        </div>
      </details>
    `).join('');

    processArtefactsHtml = `
      <section class="cs-section cs-process-artefacts-section reveal-on-scroll" id="process-artefacts">
        <div class="cs-section-header">
          <h2 class="cs-section-heading">Process artefacts</h2>
          <p class="cs-section-sub">Historical research models, personas, and frameworks maintained for documentation.</p>
        </div>
        <div class="cs-artefacts-accordion">
          ${items}
        </div>
      </section>
    `;
  }

  // Next & Previous Case Study Card
  const nextCaseStudyHtml = `
    <nav class="cs-nav-bottom reveal-on-scroll" aria-label="Case Study Navigation">
      <div class="cs-nav-carousel">
        ${prevCaseStudy ? `
          <a href="${prevCaseStudy.link}" class="cs-nav-card prev-card" aria-label="Previous case study: ${prevCaseStudy.title}">
            <div class="cs-nav-card-media">
              <img src="${prevCaseStudy.image}" alt="${prevCaseStudy.title}" loading="lazy" class="cs-nav-card-img" width="600" height="375">
            </div>
            <div class="cs-nav-card-body">
              <div class="cs-nav-card-eyebrow">← PREVIOUS CASE STUDY</div>
              <h3 class="cs-nav-card-title">${prevCaseStudy.title}</h3>
              <p class="cs-nav-card-desc">${prevCaseStudy.summary}</p>
            </div>
          </a>
        ` : ''}

        ${nextCaseStudy ? `
          <a href="${nextCaseStudy.link}" class="cs-nav-card next-card" aria-label="Next case study: ${nextCaseStudy.title}">
            <div class="cs-nav-card-media">
              <img src="${nextCaseStudy.image}" alt="${nextCaseStudy.title}" loading="lazy" class="cs-nav-card-img" width="600" height="375">
            </div>
            <div class="cs-nav-card-body">
              <div class="cs-nav-card-eyebrow">NEXT CASE STUDY →</div>
              <h3 class="cs-nav-card-title">${nextCaseStudy.title}</h3>
              <p class="cs-nav-card-desc">${nextCaseStudy.summary}</p>
            </div>
          </a>
        ` : ''}
      </div>
    </nav>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}">

  <link rel="icon" href="/favicon.ico" sizes="48x48">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#0A0A0A">

  <!-- Open Graph / Social Sharing -->
  <meta property="og:title" content="${meta.title}">
  <meta property="og:description" content="${meta.description}">
  <meta property="og:image" content="${meta.ogImage || '/og-image.png'}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="${meta.ogImage || '/og-image.png'}">
  <meta name="keywords" content="${meta.keywords}">
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,300..700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
  <link rel="preload" as="image" href="${hero.heroImage}" fetchpriority="high">
  <link rel="stylesheet" href="styles.css">
</head>
<body class="case-study-template">

  <!-- Skip link as first focusable element -->
  <a href="#main-content" class="skip-link">Skip to content</a>

  <!-- Fixed Reading Progress Bar (2px line under header) -->
  <div class="cs-reading-progress" id="cs-reading-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-label="Reading progress">
    <div class="cs-reading-progress-bar" id="cs-reading-progress-bar"></div>
  </div>

  <!-- NAVIGATION -->
  <header class="site-nav" id="top">
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
              <svg viewBox="0 0 24 24" class="sheet-social-icon" aria-hidden="true"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-4.085 0-6.625-2.748-6.625-6.84 0-4.225 2.684-6.892 6.471-6.892 4.103 0 6.136 2.924 5.753 6.944h-9.351c.143 2.087 1.664 3.656 3.753 3.656 1.848 0 2.879-.824 3.324-1.868h1.776zm-8.854-5.352h6.586c-.161-1.802-1.399-3.08-3.264-3.08-1.954 0-3.136 1.294-3.322 3.08zm-14.872-6.648h5.922c3.154 0 4.908 1.492 4.908 3.781 0 1.611-.871 2.766-2.28 3.27 1.778.508 2.802 1.879 2.802 3.736 0 2.569-1.977 4.213-5.316 4.213h-6.036v-15zm3.02 6.096h2.49c1.242 0 2.05-.623 2.05-1.637 0-.964-.784-1.579-2.026-1.579h-2.514v3.216zm0 5.864h2.723c1.455 0 2.378-.711 2.378-1.815 0-1.127-.923-1.801-2.454-1.801h-2.647v3.616z"></path></svg>
            </a>
          </div>
          <p class="sheet-status-text">Open to full-time roles · Pune / Remote</p>
        </div>
      </div>
    </div>
  </header>

  <!-- Sticky Mobile Section Nav Pill (<1280px) -->
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
      <nav class="cs-toc-sheet-nav" aria-label="Sections on this page">
        <a href="#tldr" class="cs-toc-sheet-link">Overview &amp; TL;DR</a>
        <a href="#problem" class="cs-toc-sheet-link">The problem</a>
        <a href="#role-and-scope" class="cs-toc-sheet-link">My role and scope</a>
        <a href="#key-decisions" class="cs-toc-sheet-link">Key decisions</a>
        <a href="#final-design" class="cs-toc-sheet-link">Final design</a>
        <a href="#outcome" class="cs-toc-sheet-link">Outcome &amp; metrics</a>
        <a href="#what-id-do-next" class="cs-toc-sheet-link">What I'd do next</a>
        ${processArtifacts && processArtifacts.length > 0 ? `<a href="#process-artefacts" class="cs-toc-sheet-link">Process artefacts</a>` : ''}
      </nav>
    </div>
  </div>

  <main id="main-content" class="cs-main">
    
    <!-- Hero Section -->
    <section class="cs-hero" id="hero">
      <div class="container">
        
        <div class="cs-breadcrumb reveal-on-scroll">
          <a href="work.html" class="cs-back-btn">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
            <span>All Selected Work</span>
          </a>
        </div>

        <div class="cs-hero-header reveal-on-scroll">
          <div class="cs-eyebrow-chip">${hero.eyebrow}</div>
          <h1 class="cs-hero-title">${hero.title}</h1>
          <p class="cs-hero-summary">${hero.summary}</p>
        </div>

        <div class="cs-hero-image-wrap reveal-on-scroll">
          <img 
            src="${hero.heroImage}" 
            alt="${hero.heroImageAlt || hero.title}" 
            class="cs-hero-image" 
            width="1200" 
            height="675"
            fetchpriority="high"
          >
        </div>

      </div>
    </section>

    <!-- Case Study Rail Layout Container (>=1280px Left Rail TOC + Content) -->
    <div class="container cs-layout-container">
      
      <!-- Sticky Desktop Left-Rail TOC (>=1280px) -->
      <aside class="cs-desktop-toc" id="cs-desktop-toc" aria-label="Page navigation">
        <div class="cs-toc-sticky-box">
          <div class="cs-toc-rail-title">ON THIS PAGE</div>
          <nav class="cs-toc-rail-nav">
            <a href="#tldr" class="cs-rail-link active" data-section="tldr">TL;DR</a>
            <a href="#problem" class="cs-rail-link" data-section="problem">The problem</a>
            <a href="#role-and-scope" class="cs-rail-link" data-section="role-and-scope">Role &amp; scope</a>
            <a href="#key-decisions" class="cs-rail-link" data-section="key-decisions">Key decisions</a>
            <a href="#final-design" class="cs-rail-link" data-section="final-design">Final design</a>
            <a href="#outcome" class="cs-rail-link" data-section="outcome">Outcome</a>
            <a href="#what-id-do-next" class="cs-rail-link" data-section="what-id-do-next">What's next</a>
            ${processArtifacts && processArtifacts.length > 0 ? `<a href="#process-artefacts" class="cs-rail-link" data-section="process-artefacts">Artefacts</a>` : ''}
          </nav>
        </div>
      </aside>

      <!-- Main Prose & Sections Body -->
      <div class="cs-content-body">
        
        <!-- SECTION 1: TL;DR Card -->
        <section class="cs-section cs-tldr-section reveal-on-scroll" id="tldr">
          <div class="cs-tldr-card">
            <div class="cs-tldr-meta-grid">
              <div class="cs-tldr-item">
                <span class="cs-tldr-label">ROLE</span>
                <span class="cs-tldr-val">${tldr.role}</span>
              </div>
              <div class="cs-tldr-item">
                <span class="cs-tldr-label">TEAM</span>
                <span class="cs-tldr-val">${tldr.team}</span>
              </div>
              <div class="cs-tldr-item">
                <span class="cs-tldr-label">TIMELINE</span>
                <span class="cs-tldr-val">${tldr.timeline}</span>
              </div>
              <div class="cs-tldr-item">
                <span class="cs-tldr-label">PLATFORM</span>
                <span class="cs-tldr-val">${tldr.platform}</span>
              </div>
              <div class="cs-tldr-item">
                <span class="cs-tldr-label">STATUS</span>
                <span class="cs-tldr-val">${tldr.status}</span>
              </div>
            </div>
            <div class="cs-tldr-outcome">
              <span class="cs-tldr-outcome-label">KEY OUTCOME</span>
              <p class="cs-tldr-outcome-text">${tldr.keyOutcome}</p>
            </div>
          </div>
        </section>

        <!-- SECTION 2: The Problem -->
        <section class="cs-section cs-problem-section reveal-on-scroll" id="problem">
          <div class="cs-section-header">
            <h2 class="cs-section-heading">The problem</h2>
          </div>
          <div class="cs-prose">
            ${problem.paragraphs.map(p => `<p>${p}</p>`).join('')}
            ${problem.pullQuote ? `
              <blockquote class="cs-pull-quote">
                <p>“${problem.pullQuote}”</p>
              </blockquote>
            ` : ''}
          </div>
        </section>

        <!-- SECTION 3: My Role and Scope -->
        <section class="cs-section cs-role-section reveal-on-scroll" id="role-and-scope">
          <div class="cs-section-header">
            <h2 class="cs-section-heading">My role and scope</h2>
          </div>
          <div class="cs-scope-grid">
            <div class="cs-scope-col">
              <h3 class="cs-scope-title">What I owned</h3>
              <ul class="cs-scope-list">
                ${ownedBulletsHtml}
              </ul>
            </div>
            <div class="cs-scope-col">
              <h3 class="cs-scope-title">What others owned</h3>
              <ul class="cs-scope-list">
                ${othersOwnedBulletsHtml}
              </ul>
            </div>
          </div>
        </section>

        <!-- SECTION 4: Key Decisions -->
        <section class="cs-section cs-decisions-section reveal-on-scroll" id="key-decisions">
          <div class="cs-section-header">
            <h2 class="cs-section-heading">Key decisions</h2>
            <p class="cs-section-sub">Four pivotal product decisions shaping ergonomics, safety, and operations.</p>
          </div>
          <div class="cs-decision-blocks-list">
            ${decisionBlocksHtml}
          </div>
        </section>

        <!-- SECTION 5: Final Design (Screen Gallery) -->
        <section class="cs-section cs-gallery-section reveal-on-scroll" id="final-design">
          <div class="cs-section-header">
            <h2 class="cs-section-heading">Final design</h2>
            <p class="cs-section-sub">End-to-end interface gallery. Tap any screen to inspect in fullscreen.</p>
          </div>

          <!-- Screen Gallery (Carousel on mobile, Grid on desktop) -->
          <div class="cs-gallery-container ${finalDesign.galleryType === 'phone' ? 'gallery-phone-grid' : 'gallery-web-grid'}" id="cs-gallery-container">
            ${screensHtml}
          </div>

          <!-- Mobile Gallery Counter -->
          <div class="cs-gallery-counter-bar" id="cs-gallery-counter-bar" aria-live="polite">
            <span class="cs-counter-pill" id="cs-counter-pill">1 / ${totalScreens}</span>
          </div>
        </section>

        <!-- SECTION 6: Outcome (Stat Cards) -->
        <section class="cs-section cs-outcome-section reveal-on-scroll" id="outcome">
          <div class="cs-section-header">
            <h2 class="cs-section-heading">Outcome</h2>
            <p class="cs-section-sub">Measurable impact on agency turnaround and operational safety.</p>
          </div>
          <div class="proof-scroll-container">
            ${statCardsHtml}
          </div>
        </section>

        <!-- SECTION 7: What I'd Do Next -->
        <section class="cs-section cs-next-steps-section reveal-on-scroll" id="what-id-do-next">
          <div class="cs-section-header">
            <h2 class="cs-section-heading">What I'd do next</h2>
          </div>
          <ul class="cs-steps-list">
            ${nextStepsHtml}
          </ul>
        </section>

        <!-- Optional Collapsed Process Artefacts Accordion -->
        ${processArtefactsHtml}

        <!-- Next / Previous Case Study Navigation -->
        ${nextCaseStudyHtml}

      </div>
    </div>

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

  <!-- FOOTER / CONTACT SECTION -->
  <footer class="site-footer" id="contact">
    <div class="container">
      <div class="footer-top-row reveal-on-scroll">
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
        <p class="footer-copyright">Design and build by Digambar Patil</p>
        <a href="#top" class="footer-back-to-top">Back to top ↑</a>
      </div>
    </div>
  </footer>

  <script src="script.js"></script>
</body>
</html>
`;
}
