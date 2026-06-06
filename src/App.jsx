import { useEffect, useMemo, useRef, useState } from 'react';

const CALENDLY_URL =
  import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/astmay/15min';
const SHOPIFY_STORE_URL =
  import.meta.env.VITE_SHOPIFY_STORE_URL || 'https://astmay-demo-candle-co.myshopify.com';
const LOOM_EMBED_URL =
  import.meta.env.VITE_LOOM_EMBED_URL ||
  'https://www.loom.com/embed/00000000000000000000000000000000';

const navItems = [
  ['Home', 'home'],
  ['Services', 'services'],
  ['Work', 'work'],
  ['Process', 'process'],
  ['About', 'about'],
  ['Contact', 'contact'],
];

const services = {
  etsy: [
    ['🔎', 'SEO listing refresh', 'Titles, tags, attributes, and descriptions cleaned for buyer search intent.'],
    ['🧵', 'Printify sync', 'Mockups, SKUs, variants, and fulfillment settings checked before launch.'],
    ['⭐', 'Star Seller inbox', 'Fast, calm buyer replies that protect response time and shop trust.'],
    ['🧩', 'Variation setup', 'Sizes, colors, personalization, and pricing organized with fewer buyer errors.'],
  ],
  shopify: [
    ['📦', 'CSV bulk upload', 'Products, images, collections, and metadata prepared for fast imports.'],
    ['📊', 'Inventory reconciliation', 'Stock counts, supplier notes, and low-stock risks made visible.'],
    ['🏷️', 'Order tagging', 'Rules and tags that keep fulfillment, returns, and VIP orders organized.'],
    ['↩️', 'Returns SOP', 'Simple return steps your team can follow without asking you twice.'],
  ],
};

const caseStudies = [
  {
    title: '62% faster listings',
    problem: 'A candle shop had inconsistent titles, weak attributes, and slow listing creation.',
    action: 'Built a reusable listing checklist, tag bank, mockup naming rules, and CSV import template.',
    result: 'New product uploads became easier to review and 62% faster to prepare in the mock workflow.',
  },
  {
    title: 'Inbox to zero in 48h',
    problem: 'Buyer messages were mixed between sizing, shipping, personalization, and refund requests.',
    action: 'Created saved replies, escalation labels, and a calm response workflow for common issues.',
    result: 'The inbox reached zero in a two-day sample sprint without sounding robotic or rushed.',
  },
  {
    title: 'Printify error fix',
    problem: 'A sample product had mismatched variants, incomplete mockups, and risky fulfillment settings.',
    action: 'Audited variant mapping, checked SKUs, replaced incorrect mockups, and documented prevention steps.',
    result: 'The product was launch-ready with fewer fulfillment risks and a clear QA checklist.',
  },
];

const tools = ['Etsy', 'Shopify', 'Printify', 'Canva', 'Klaviyo', 'Gorgias', 'Google Sheets', 'Loom'];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mediaQuery.matches);
    const onChange = () => setReduced(mediaQuery.matches);
    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

function useReveal(options = {}) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, ...options }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options, reduced]);

  return [ref, visible];
}

function Reveal({ as: Component = 'div', className = '', children }) {
  const [ref, visible] = useReveal();
  return (
    <Component ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>
      {children}
    </Component>
  );
}

function TypewriterHeadline({ text }) {
  const words = useMemo(() => text.split(' '), [text]);
  const reduced = usePrefersReducedMotion();
  const [count, setCount] = useState(reduced ? words.length : 0);

  useEffect(() => {
    if (reduced) {
      setCount(words.length);
      return undefined;
    }

    setCount(0);
    const timer = window.setInterval(() => {
      setCount((current) => {
        if (current >= words.length) {
          window.clearInterval(timer);
          return current;
        }
        return current + 1;
      });
    }, 150);

    return () => window.clearInterval(timer);
  }, [reduced, words.length]);

  return (
    <>
      {words.slice(0, count).map((word, index) => (
        <span className="typed-word" key={`${word}-${index}`}>
          {word}{' '}
        </span>
      ))}
      {!reduced && count < words.length ? <span className="cursor" aria-hidden="true" /> : null}
    </>
  );
}

function Header() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-nav ${visible ? 'is-visible' : ''}`}>
      <a className="brand-mark" href="#home" aria-label="Astmay home">
        <span>Astmay</span>
        <small>Ecommerce VA</small>
      </a>
      <nav aria-label="Primary navigation">
        {navItems.map(([label, id]) => (
          <a href={`#${id}`} key={id}>
            {label}
          </a>
        ))}
      </nav>
      <a className="nav-cta" href="#contact">
        Book call
      </a>
    </header>
  );
}

function Hero() {
  const reduced = usePrefersReducedMotion();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (reduced) return undefined;
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduced]);

  return (
    <section id="home" className="hero section-pad">
      <div
        className="dot-field"
        style={{ transform: reduced ? 'none' : `translate3d(0, ${scrollY * 0.3}px, 0)` }}
        aria-hidden="true"
      />
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">Portfolio for Etsy + Shopify sellers</span>
          <h1>
            <TypewriterHeadline text="Shopify & Etsy VA for US & UK brands — listings, ops, and inbox handled while you sleep" />
          </h1>
          <p className="hero-subcopy">
            Clear ecommerce support with timezone overlap for EST and GMT. See sample workflows, listing improvements,
            inbox systems, and Shopify operations before booking a call.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              See Etsy Work
            </a>
            <a className="button button-secondary" href="#contact">
              Book 15-min call
            </a>
          </div>
        </div>
        <div className="hero-card" aria-label="Portfolio preview card">
          <div className="metric-card main-metric">
            <span>Mock portfolio proof</span>
            <strong>3 demos</strong>
            <p>Listing refresh, Shopify order flow, and case study cards.</p>
          </div>
          <div className="mini-dashboard">
            <div><span>Listings</span><strong>Ready</strong></div>
            <div><span>Inbox</span><strong>Zero</strong></div>
            <div><span>Orders</span><strong>Tagged</strong></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const [active, setActive] = useState('etsy');
  const [direction, setDirection] = useState('right');

  function switchTab(tab) {
    if (tab === active) return;
    setDirection(tab === 'etsy' ? 'left' : 'right');
    setActive(tab);
  }

  return (
    <Reveal as="section" id="services" className="section-pad services-section">
      <div className="container section-heading">
        <span className="eyebrow">Services</span>
        <h2>Focused support for the exact ecommerce work owners hand off first.</h2>
        <p>
          Choose the platform you sell on. Each card explains the operational outcome, not a vague VA task list.
        </p>
      </div>
      <div className="container">
        <div className="tab-switch" role="tablist" aria-label="Service type">
          <button className={active === 'etsy' ? 'active' : ''} onClick={() => switchTab('etsy')} role="tab">
            Etsy VA
          </button>
          <button className={active === 'shopify' ? 'active' : ''} onClick={() => switchTab('shopify')} role="tab">
            Shopify VA
          </button>
        </div>
        <div className={`service-grid slide-${direction}`} key={active}>
          {services[active].map(([icon, title, outcome], index) => (
            <article className="service-card" style={{ '--delay': `${index * 100}ms` }} key={title}>
              <span className="service-icon">{icon}</span>
              <h3>{title}</h3>
              <p>{outcome}</p>
              <a href="#work">see example</a>
            </article>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function ListingBeforeAfter() {
  const [reveal, setReveal] = useState(52);
  const [dragging, setDragging] = useState(false);
  const sliderRef = useRef(null);

  function updateFromPointer(clientX) {
    const rect = sliderRef.current.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setReveal(Math.max(0, Math.min(100, Math.round(next))));
  }

  function handlePointerDown(event) {
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromPointer(event.clientX);
  }

  function handlePointerMove(event) {
    if (dragging) updateFromPointer(event.clientX);
  }

  function handlePointerUp() {
    setDragging(false);
  }

  function handleClick() {
    if (window.innerWidth <= 720 && !dragging) setReveal((current) => (current > 50 ? 0 : 100));
  }

  return (
    <article className="work-card before-after-card">
      <div className="work-card-header">
        <span className="pill">Demo 01</span>
        <h3>Etsy before/after listing refresh</h3>
        <p>Drag to compare a messy listing layout with a cleaner search-ready version.</p>
      </div>
      <div
        className="comparison"
        ref={sliderRef}
        style={{ '--reveal': `${reveal}%` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClick={handleClick}
        role="slider"
        aria-label="Drag to compare Etsy listing"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={reveal}
        tabIndex="0"
      >
        <div className="listing-panel listing-before">
          <span className="compare-label">Before</span>
          <h4>Handmade Candle Nice Gift</h4>
          <p>tags: candle, gift, home, nice, pretty</p>
          <ul>
            <li>Missing occasion keywords</li>
            <li>No material or scent detail</li>
            <li>Unclear personalization notes</li>
          </ul>
        </div>
        <div className="listing-panel listing-after">
          <span className="compare-label">After</span>
          <h4>Personalized Soy Candle Gift for Her</h4>
          <p>tags: soy candle, bridesmaid gift, self care, custom label</p>
          <ul>
            <li>Keyword-led title structure</li>
            <li>Clear variation and scent details</li>
            <li>Buyer-friendly delivery notes</li>
          </ul>
        </div>
        <div className="compare-handle">
          <span>{reveal}%</span>
        </div>
      </div>
      <small className="hint">Drag to compare. On mobile, tap the sample to toggle.</small>
    </article>
  );
}

function ShopifyDemo() {
  return (
    <article className="work-card shopify-demo-card">
      <div className="work-card-header">
        <span className="pill">Demo 02</span>
        <h3>Shopify demo store operations</h3>
        <p>An iPhone-frame walkthrough of order tagging, inventory checks, and fulfillment notes.</p>
      </div>
      <div className="phone-frame" onClick={() => window.open(SHOPIFY_STORE_URL, '_blank', 'noopener,noreferrer')}>
        <div className="phone-speaker" />
        <div className="phone-screen">
          <iframe src={SHOPIFY_STORE_URL} title="Astmay Demo Candle Co Shopify store" loading="lazy" />
          <div className="order-loop" aria-hidden="true">
            <div className="loop-topbar">Astmay Demo Candle Co</div>
            <div className="order-card-loop one"><strong>Order #1048</strong><span>Tag: VIP + Gift note</span></div>
            <div className="order-card-loop two"><strong>Inventory check</strong><span>Vanilla Soy Candle: 14 left</span></div>
            <div className="order-card-loop three"><strong>Return SOP</strong><span>Reply template selected</span></div>
          </div>
        </div>
        <span className="open-store-label">Click to open full store</span>
      </div>
      <div className="loom-card">
        <h4>Loom workflow walkthrough</h4>
        <iframe src={LOOM_EMBED_URL} title="Loom ecommerce VA workflow walkthrough" loading="lazy" allowFullScreen />
      </div>
    </article>
  );
}

function CaseStudyAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <article className="work-card accordion-card">
      <div className="work-card-header">
        <span className="pill">Demo 03</span>
        <h3>Step-by-step case study samples</h3>
        <p>Problem → Action → Result examples built from realistic ecommerce VA workflows.</p>
      </div>
      <div className="accordion-list">
        {caseStudies.map((study, index) => (
          <div className={`case-item ${open === index ? 'open' : ''}`} key={study.title}>
            <button onClick={() => setOpen(index)} aria-expanded={open === index}>
              <span>{study.title}</span>
              <strong>{open === index ? '−' : '+'}</strong>
            </button>
            <div className="case-body">
              <p><span>⚠️ Problem</span>{study.problem}</p>
              <p><span>🛠️ Action</span>{study.action}</p>
              <p><span>✅ Result</span>{study.result}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function Work() {
  return (
    <Reveal as="section" id="work" className="section-pad work-section">
      <div className="container section-heading">
        <span className="eyebrow">Work samples</span>
        <h2>Mock samples that prove ecommerce thinking before a client call.</h2>
        <p>
          The goal is to show how the work looks in practice: listings, Shopify admin routines, and clean case studies.
        </p>
      </div>
      <div className="container work-grid">
        <ListingBeforeAfter />
        <ShopifyDemo />
        <CaseStudyAccordion />
      </div>
    </Reveal>
  );
}

function Process() {
  const stepRefs = useRef([]);
  const [activeStep, setActiveStep] = useState(0);
  const [sectionRef, visible] = useReveal();
  const steps = [
    ['Audit', 'Review listings, store setup, inbox pressure, fulfillment risks, and urgent handoff needs.'],
    ['Setup', 'Create templates, naming rules, checklists, saved replies, tags, and SOPs.'],
    ['Daily Ops', 'Handle recurring ecommerce tasks with clean updates and escalation notes.'],
  ];

  useEffect(() => {
    const onScroll = () => {
      const center = window.innerHeight / 2;
      const distances = stepRefs.current.map((node) => Math.abs(node.getBoundingClientRect().top - center));
      const next = distances.indexOf(Math.min(...distances));
      if (next >= 0) setActiveStep(next);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="process" ref={sectionRef} className={`section-pad process-section reveal ${visible ? 'is-visible' : ''}`}>
      <div className="container section-heading">
        <span className="eyebrow">Process</span>
        <h2>Simple handoff, clear setup, calm daily execution.</h2>
      </div>
      <div className={`container timeline ${visible ? 'draw' : ''}`}>
        <svg viewBox="0 0 900 80" preserveAspectRatio="none" aria-hidden="true">
          <path d="M20 40 H880" />
        </svg>
        {steps.map(([title, body], index) => (
          <article
            className={`timeline-step ${activeStep === index ? 'active' : ''}`}
            key={title}
            ref={(node) => { stepRefs.current[index] = node; }}
          >
            <span>{index + 1}</span>
            <h3>{title}</h3>
            <p>{body}</p>
            <div className="tooltip">
              {index === 0 && 'Deliverables: audit notes, risk list, task priority map'}
              {index === 1 && 'Deliverables: templates, SOPs, product rules, inbox labels'}
              {index === 2 && 'Deliverables: daily updates, issue log, clean handoff summary'}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <Reveal as="section" id="about" className="section-pad about-section">
      <div className="container about-grid">
        <figure className="photo-card" aria-label="Astmay ecommerce VA portrait placeholder">
          <div className="photo-inner">VA</div>
          <figcaption>Calm ecommerce support for busy shop owners.</figcaption>
        </figure>
        <div className="about-copy">
          <span className="eyebrow">About</span>
          <h2>I help Etsy and Shopify owners keep listings, inbox, and store operations organized.</h2>
          <p>
            My work style is clear, documented, and calm. I focus on product listing quality, buyer support, store upkeep,
            and repeatable systems that make your ecommerce day easier to manage.
          </p>
          <p>
            Tools I can organize around include Etsy, Shopify, Printify, Canva, Google Sheets, Loom, email support tools,
            and simple SOP systems for recurring tasks.
          </p>
          <div className="tools-marquee" aria-label="Tool stack marquee">
            <div>
              {[...tools, ...tools].map((tool, index) => <span key={`${tool}-${index}`}>{tool}</span>)}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function FloatingField({ label, type = 'text', value, onChange, required = true }) {
  const valid = value.length > 2 && (type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));

  return (
    <label className={`floating-field ${valid ? 'valid' : ''}`}>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} />
      <span>{label}</span>
      {valid ? <strong aria-hidden="true">✓</strong> : null}
    </label>
  );
}

function LazyCalendly() {
  const [ref, visible] = useReveal({ rootMargin: '180px' });
  return (
    <div className="calendly-shell" ref={ref}>
      {visible ? (
        <iframe src={CALENDLY_URL} title="Book a 15-minute ecommerce VA call" loading="lazy" />
      ) : (
        <div className="calendly-placeholder">Calendly loads when this section comes into view.</div>
      )}
    </div>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', shop: '' });
  const [state, setState] = useState('idle');

  function update(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setState('submitting');
    window.setTimeout(() => setState('success'), 1000);
  }

  return (
    <Reveal as="section" id="contact" className="section-pad contact-section">
      <div className="container section-heading">
        <span className="eyebrow">Contact</span>
        <h2>Book a short call or send your shop URL for a quick fit check.</h2>
        <p>Calendly is set up for EST/GMT conversations. WhatsApp is available for faster coordination.</p>
      </div>
      <div className="container contact-grid">
        <form className="contact-form" onSubmit={handleSubmit}>
          <FloatingField label="Your name" value={form.name} onChange={(value) => update('name', value)} />
          <FloatingField label="Email address" type="email" value={form.email} onChange={(value) => update('email', value)} />
          <FloatingField label="Shop URL" value={form.shop} onChange={(value) => update('shop', value)} />
          <button className={`button button-primary submit-button ${state}`} type="submit" disabled={state === 'submitting'}>
            {state === 'idle' && 'Send shop details'}
            {state === 'submitting' && <span className="spinner" aria-label="Submitting" />}
            {state === 'success' && 'Request received'}
          </button>
          {state === 'success' ? <Confetti /> : null}
          <a className="whatsapp-button" href="https://wa.me/000000000000" target="_blank" rel="noreferrer">
            Message on WhatsApp
          </a>
        </form>
        <LazyCalendly />
      </div>
    </Reveal>
  );
}

function Confetti() {
  return (
    <div className="confetti" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, index) => <span key={index} style={{ '--i': index }} />)}
    </div>
  );
}

function Footer() {
  const [accepted, setAccepted] = useState(() => localStorage.getItem('astmay-cookie-ok') === 'yes');

  function acceptCookies() {
    localStorage.setItem('astmay-cookie-ok', 'yes');
    setAccepted(true);
  }

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <strong>Astmay Ecommerce VA</strong>
          <p>Interactive portfolio for Etsy and Shopify sellers in the US, UK, and EU.</p>
        </div>
        <div className="footer-links">
          <a href="/privacy-gdpr.html">Privacy / GDPR</a>
          <a href="/terms.html">Terms</a>
          <a href="mailto:hello@astmay.space">hello@astmay.space</a>
        </div>
      </div>
      {!accepted ? (
        <div className="cookie-notice">
          <p>This site uses essential cookies and embedded tools such as Calendly, Loom, and Shopify demos.</p>
          <button onClick={acceptCookies}>Accept</button>
        </div>
      ) : null}
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Work />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
