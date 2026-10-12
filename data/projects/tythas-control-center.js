/**
 * Project Data: Tythas Control Center
 * Multi-Tenant Website Management Platform
 * 
 * Strict separation: all copy and metadata lives here.
 * Never touches layout code in components/CaseStudyLayout.js.
 */

export const project = {
  meta: {
    title: "Tythas Control Center — Multi-Tenant SaaS Platform UX Case Study | Digambar Patil",
    description: "A multi-tenant website management platform I designed and built for Tythas Digital — one dashboard to run every client site's pages, blog, SEO, forms, leads and uptime.",
    slug: "tythas-control-center",
    keywords: "Product Design, UI/UX Design, Multi-Tenant SaaS, Design System, Information Architecture, Next.js, Tailored CMS, B2B Platform",
    ogImage: "/og-image.png"
  },

  hero: {
    eyebrow: "B2B SaaS · Shipped",
    title: "Tythas Control Center",
    summary: "A multi-tenant website management platform that replaces fragmented client logins with one central dashboard for CMS, SEO, leads, and uptime.",
    heroImage: "assets/images/tythas_control_center_hero.svg",
    heroImageAlt: "Tythas Control Center — Multi-Tenant Web Platform Architecture and UI Showcase"
  },

  tldr: {
    role: "Lead Product Designer & Design Engineer",
    team: "Solo (Self-Initiated Agency Platform)",
    timeline: "Sept 2026 (Phases 1–7 Shipped)",
    platform: "Next.js 14 · Web Application",
    status: "Shipped (Phase 8 Active)",
    keyOutcome: "Consolidated 6 client site workflows into 1 unified dashboard, cutting developer intervention on routine updates to zero."
  },

  problem: {
    paragraphs: [
      "Tythas is the digital agency I run. The moment a client site shipped, it became its own disconnected island — a separate WordPress admin, a different hosting cPanel, sometimes an ad-hoc script I'd written once and never documented.",
      "There was no single place to see which sites needed attention, no consistent way to publish a page across different tech stacks, and nothing watching for SEO gaps, lead capture failures, or server uptime.",
      "A five-minute copy change became an urgent developer ticket for me personally, and more than once I learned about a broken form or expired SSL certificate directly from the client — not from an automated system."
    ],
    pullQuote: "A five-minute content change often became an urgent ticket for me personally, and more than once I heard about an expired SSL directly from the client."
  },

  roleAndScope: {
    owned: [
      "Product architecture, information architecture, and end-to-end design system tokens",
      "Interactive UX workflows: WYSIWYG editor, schema generator, unified leads CRM, and health telemetry",
      "Front-end engineering in Next.js 14, React, Tailwind CSS, and edge API integration",
      "Defensive state machine logic preventing unverified writes to client repositories"
    ],
    othersOwned: [
      "Legacy WordPress client hosting environments and DNS configurations",
      "Third-party marketing ad campaigns generating inbound client traffic"
    ]
  },

  keyDecisions: [
    {
      id: "decision-connector",
      title: "Universal Connector Bridge vs. Bespoke Client Plugins",
      optionsConsidered: "Considered writing bespoke WordPress plugins per client repo, or forcing all clients into a rigid headless CMS migration with high maintenance overhead.",
      whatIChoseAndWhy: "Engineered a universal decoupled connector bridge. Abstracted WordPress REST APIs and Next.js server webhooks behind a single capability layer so operators never need to know the underlying stack.",
      image: "assets/images/tythas_decision_connector.svg",
      imageAlt: "Universal Connector Bridge Architecture Diagram",
      hotspots: [
        {
          id: 1,
          x: 18,
          y: 46,
          noteTitle: "Unified Dashboard Surface",
          noteText: "One consistent authoring UI regardless of target CMS or custom framework."
        },
        {
          id: 2,
          x: 50,
          y: 35,
          noteTitle: "Decoupled Capability Handshake",
          noteText: "Verifies read/write permissions before unlocking any publishing controls."
        },
        {
          id: 3,
          x: 82,
          y: 46,
          noteTitle: "Multi-Stack Client Targets",
          noteText: "Directly bridges to WordPress, Next.js, and static webhooks without client plugins."
        }
      ]
    },
    {
      id: "decision-editor",
      title: "Continuous WYSIWYG Ergonomics vs. Block-Picker Friction",
      optionsConsidered: "Built an experimental Notion-style block editor with nested slash commands and floating inspector panels.",
      whatIChoseAndWhy: "Client testing revealed immediate friction ('We just need a writing box like classic WordPress'). Grounded in Jakob's Law, I pivoted to a continuous writing canvas with 10 persistent top-level tools and instant mobile viewport emulation.",
      image: "assets/images/tythas_decision_editor.svg",
      imageAlt: "Continuous WYSIWYG Editor with Live Mobile Viewport Emulation",
      hotspots: [
        {
          id: 1,
          x: 24,
          y: 11,
          noteTitle: "10-Icon Persistent Toolbar",
          noteText: "Essential formatting visible without digging through nested block menus (Hick's Law)."
        },
        {
          id: 2,
          x: 28,
          y: 52,
          noteTitle: "Inline Structured FAQ Accordion",
          noteText: "Writing copy automatically outputs valid Schema.org JSON-LD structured data."
        },
        {
          id: 3,
          x: 74,
          y: 48,
          noteTitle: "Instant Mobile Viewport Emulation",
          noteText: "390x844 responsive preview updates in real-time as content is drafted."
        }
      ]
    },
    {
      id: "decision-gating",
      title: "Connection-State Gating for Defensive Operations",
      optionsConsidered: "Considered optimistic UI where publish buttons are always active, displaying error toasts only after network failure.",
      whatIChoseAndWhy: "Adopted strict 4-state connection gating (Disconnected → Audit Only → Analyzing → Connected). Grounded in Postel's Law and Error Prevention: write actions are physically disabled until the bridge verifies live API authenticity.",
      image: "assets/images/tythas_decision_gating.svg",
      imageAlt: "Defensive Connection-State Machine and Write Protection",
      hotspots: [
        {
          id: 1,
          x: 49,
          y: 22,
          noteTitle: "4-Phase Verification Machine",
          noteText: "Sites progress systematically through verified capability states before write access."
        },
        {
          id: 2,
          x: 26,
          y: 64,
          noteTitle: "Gated Write Interception",
          noteText: "Locked state disables destructive buttons with clear guidance preventing ghost clicks."
        },
        {
          id: 3,
          x: 74,
          y: 64,
          noteTitle: "Verified Edge Execution",
          noteText: "Live buttons unlock only when cryptographically signed webhooks are confirmed."
        }
      ]
    },
    {
      id: "decision-attention",
      title: "Single Attention Queue vs. Distributed Notification Feeds",
      optionsConsidered: "Considered keeping notifications isolated within their respective tabs (CMS tab, SEO tab, Uptime tab) or relying on email alerts.",
      whatIChoseAndWhy: "Aggregated all high-priority operational signals across every client domain into one centralized Priority Attention Queue, sorted by severity (Critical, Warning, Leads).",
      image: "assets/images/tythas_decision_attention.svg",
      imageAlt: "Priority Attention Queue Multi-Tenant Operational Triage",
      hotspots: [
        {
          id: 1,
          x: 24,
          y: 15,
          noteTitle: "Severity-Based Filtering",
          noteText: "Immediate triage tabs for Critical outages, Warnings, and Inbound Leads."
        },
        {
          id: 2,
          x: 50,
          y: 32,
          noteTitle: "Cross-Tenant Domain Attribution",
          noteText: "Clear badges designate which client property requires operational intervention."
        },
        {
          id: 3,
          x: 86,
          y: 35,
          noteTitle: "One-Click Direct Action",
          noteText: "Direct deep-links allow immediate renewal or response without switching contexts."
        }
      ]
    }
  ],

  finalDesign: {
    galleryType: "web",
    screens: [
      {
        id: "screen-1",
        image: "assets/images/tythas_screen_dashboard.svg",
        alt: "Multi-Tenant Portfolio Dashboard",
        caption: "Multi-tenant dashboard overview showing connected agency sites, uptime status, and lead volume."
      },
      {
        id: "screen-2",
        image: "assets/images/tythas_screen_editor.svg",
        alt: "Continuous Content & Schema Editor",
        caption: "Distraction-free WYSIWYG editor with live mobile preview and inline FAQ schema generation."
      },
      {
        id: "screen-3",
        image: "assets/images/tythas_screen_seo.svg",
        alt: "Technical SEO & Schema Studio",
        caption: "Automated JSON-LD schema builder emitting validated structured data without code modifications."
      },
      {
        id: "screen-4",
        image: "assets/images/tythas_screen_leads.svg",
        alt: "Unified Leads Inbox & Attribution CRM",
        caption: "Centralized leads inbox aggregating form submissions across all tenant domains with UTM source attribution."
      },
      {
        id: "screen-5",
        image: "assets/images/tythas_screen_health.svg",
        alt: "Infrastructure Health & Uptime Telemetry",
        caption: "Real-time health telemetry monitoring HTTP responses, SSL expirations, and Core Web Vitals across tenants."
      }
    ]
  },

  outcome: {
    statCards: [
      { number: "6→1", label: "Workflows consolidated into one central dashboard" },
      { number: "0", label: "Developer tickets required for routine client copy updates" },
      { number: "100%", label: "Verified write protection with zero ghost publishing errors" },
      { number: "0.8s", label: "Average Largest Contentful Paint across managed sites" }
    ]
  },

  nextSteps: [
    "Complete Phase 8 production migration on Vercel Edge with automated PostgreSQL connection pooling.",
    "Expand connector adapter library to support Shopify Storefront API and Webflow webhooks natively.",
    "Introduce AI-powered meta description and alt-text generator with human-in-the-loop review."
  ],

  nextCaseStudy: {
    title: "Raya",
    eyebrow: "Next case study",
    category: "AI Health · Concept",
    summary: "AI workout coach concept that turns skipped workouts into 5-minute wins.",
    link: "raya.html",
    image: "assets/images/raya_hero.svg"
  },

  prevCaseStudy: {
    title: "Before Two",
    eyebrow: "Previous case study",
    category: "Hospitality Ops · Shipped",
    summary: "Offline-first, photo-verified housekeeping for luxury villa hosts.",
    link: "before-two.html",
    image: "assets/images/before_two_hero.svg"
  },

  processArtifacts: [
    {
      title: "User Personas & Needs Hierarchy (Agency Owner vs Content Manager)",
      contentHtml: `
        <div class="cs-artefact-grid">
          <div class="cs-artefact-card">
            <h4>Agency Owner (Digambar)</h4>
            <p><strong>Primary Role:</strong> Principal &amp; Solo Founder running client operations.</p>
            <p><strong>Needs Hierarchy:</strong> Foundational uptime &gt; Safety (no destructive actions without backend verification) &gt; Belonging (all clients conform to one mental model) &gt; Growth (scale without adding headcount).</p>
          </div>
          <div class="cs-artefact-card">
            <h4>Content Manager</h4>
            <p><strong>Primary Role:</strong> Marketing operator / agency collaborator.</p>
            <p><strong>Core Requirement:</strong> Draft articles and review leads on assigned websites without wrestling with complex multi-block builders.</p>
          </div>
        </div>
      `
    },
    {
      title: "Eisenhower Prioritisation Matrix & 5-Whys Root Cause Analysis",
      contentHtml: `
        <div class="cs-artefact-grid">
          <div class="cs-artefact-card">
            <h4>Eisenhower Matrix</h4>
            <p><strong>Do First (Urgent/Important):</strong> Fix missing CSS custom token in globals.css causing invisible input text across 7 modal files.</p>
            <p><strong>Schedule (Important/Not Urgent):</strong> Build Test/Demo Mode for live prospective client presentations.</p>
            <p><strong>Delegate/Hotfix:</strong> Feature-flag unverified buttons during live stakeholder calls.</p>
          </div>
          <div class="cs-artefact-card">
            <h4>5-Whys: The Invisible Text Defect</h4>
            <p>Input text was white on white &rarr; Used custom utility \`bg-surface-hover\` &rarr; Referenced \`--color-surface-hover\` &rarr; Property was undefined in globals.css &rarr; Tailwind silently dropped undefined classes. Declaring the token at root instantly fixed all 99 instances.</p>
          </div>
        </div>
      `
    },
    {
      title: "Cognitive UI/UX Laws Applied",
      contentHtml: `
        <div class="cs-artefact-grid">
          <div class="cs-artefact-card">
            <h4>Jakob's Law &amp; Hick's Law</h4>
            <p>Pivoted blog editor back to familiar continuous writing canvas with 10 persistent toolbar icons, cutting cognitive decision time.</p>
          </div>
          <div class="cs-artefact-card">
            <h4>Miller's Law &amp; Postel's Law</h4>
            <p>Chunked dozens of health metrics into 6 logical tiles. Gated write actions until HMAC server readiness is cryptographically verified.</p>
          </div>
        </div>
      `
    },
    {
      title: "Information Architecture (9 Scoped Product Areas)",
      contentHtml: `
        <div class="cs-artefact-grid">
          <div class="cs-artefact-card">
            <h4>Overview &amp; Content</h4>
            <p>Multi-Site Dashboard, Health &amp; Analysis, Priority Attention List, Pages Visual Editor, Blog WYSIWYG, Media Library, Lead Capture Forms.</p>
          </div>
          <div class="cs-artefact-card">
            <h4>SEO &amp; Infrastructure</h4>
            <p>JSON-LD Schema Studio, Technical Crawl Audit, 301 Redirects Manager, Connector Adapters, RBAC, Security &amp; Uptime Alerts.</p>
          </div>
        </div>
      `
    }
  ]
};
