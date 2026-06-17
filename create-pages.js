const fs = require('fs');
let template = fs.readFileSync('index.html', 'utf8');

// Find the header end
const headerEnd = template.indexOf('<!-- ============================================================') + '<!-- ============================================================\n'.length;
// Find the first instance after headerEnd that starts a new section, which is Hero
const firstSectionStart = template.indexOf('<!-- ============================================================', headerEnd);

// Find the footer start
const footerStart = template.indexOf('<!-- ============================================================\n       FOOTER');

let topPart = template.substring(0, firstSectionStart);
let bottomPart = template.substring(footerStart);

// Clean up any double header/nav imports and replace links globally in templates
// Ensure header links point to our-story.html instead of anchor or story.html
topPart = topPart.replace(/href="index\.html#craft"/g, 'href="our-story.html"');
topPart = topPart.replace(/href="story\.html"/g, 'href="our-story.html"');
bottomPart = bottomPart.replace(/href="index\.html#craft"/g, 'href="our-story.html"');
bottomPart = bottomPart.replace(/href="story\.html"/g, 'href="our-story.html"');

// Create dynamic titles for SEO
const storyTopPart = topPart.replace(
  '<title>ATELIER NOIR — Crafted in Shadow. Worn in Light.</title>',
  '<title>Our Story — ATELIER NOIR</title>'
);

const journalTopPart = topPart.replace(
  '<title>ATELIER NOIR — Crafted in Shadow. Worn in Light.</title>',
  '<title>The Journal — ATELIER NOIR</title>'
);

// ── OUR STORY PAGE CONTENT ──
const storyContent = `
  <!-- ============================================================
       STORY HERO
       ============================================================ -->
  <section class="hero hero--slim" id="story-hero" aria-label="Story Hero">
    <div class="hero__grain" aria-hidden="true"></div>
    <div class="hero__bg" aria-hidden="true">
      <img src="assets/images/collection-desert.jpg" alt="Desert dunes landscape" loading="eager" />
    </div>

    <div class="hero__content">
      <p class="eyebrow hero__eyebrow">OUR STORY</p>
      <h1 class="hero__title">
        <span class="word"><span class="word-inner">Forged</span></span>
        <span class="word"><span class="word-inner">by</span></span>
        <span class="word"><span class="word-inner">time.</span></span>
      </h1>
      <p class="hero__subtitle">
        A slow dialogue between desert sands, raw earth, and the generational patience of hand craftsmanship.
      </p>
    </div>
  </section>

  <!-- ============================================================
       SECTION 1: HERITAGE
       ============================================================ -->
  <section class="story-section section" id="story-heritage" aria-label="Heritage">
    <div class="container container--narrow">
      <div class="story-block" data-reveal>
        <p class="eyebrow">01 — The Heritage</p>
        <h2 class="serif-title">Born from the silence of the dunes.</h2>
        <div class="divider" data-draw-line></div>
        <p class="body-lg">
          ATELIER NOIR was founded in the shadow of the Saharan basin, a landscape defined by wind, silence, and the patient endurance of earth. We did not set out to create products; we set out to capture a quiet way of living.
        </p>
        <p class="body-md" style="color: var(--muted); margin-top: var(--sp-16);">
          Our journey began in a search for raw authenticity. We partnered with generational tanneries and local artisans who understand that leather is not merely a material, but a living medium that records the passage of time. Each hide is selected by hand, ensuring its natural variations are celebrated rather than corrected.
        </p>
      </div>
      
      <div class="story-image-wrap" data-parallax-wrapper data-reveal-img style="margin-top: var(--sp-64); aspect-ratio: 16/9; overflow: hidden; border: 1px solid var(--line);">
        <img src="assets/images/craft.jpg" alt="Artisan hands stitching leather" class="story-img" data-parallax="-0.1" style="width:100%; height:120%; object-fit:cover;" />
      </div>
    </div>
  </section>

  <!-- ============================================================
       SECTION 2: THE WORKSHOP
       ============================================================ -->
  <section class="story-section section" id="story-workshop" aria-label="The Workshop">
    <div class="container">
      <div class="story-split-grid">
        <div class="story-image-wrap" data-parallax-wrapper data-reveal-img style="aspect-ratio: 4/5; overflow: hidden; border: 1px solid var(--line);">
          <img src="assets/images/dune-tote-2.jpg" alt="Hands refining Dune Tote" class="story-img" data-parallax="0.08" style="width:100%; height:120%; object-fit:cover;" />
        </div>
        <div class="editorial__content" data-reveal style="display: flex; flex-direction: column; justify-content: center; padding: 0 var(--sp-40);">
          <p class="eyebrow">02 — The Workshop</p>
          <h2 class="serif-title">Generational hands, enduring stitches.</h2>
          <div class="divider" data-draw-line></div>
          <p class="body-md" style="color: var(--muted); margin-bottom: var(--sp-24);">
            Inside our dusty, sunlit workshop, there is no hum of machinery — only the rhythmic sound of awls piercing hide and threads being pulled tight. Every single piece is hand-cut and saddle-stitched by hand.
          </p>
          <p class="body-md" style="color: var(--muted);">
            Saddle-stitching is a labor of intense patience. Unlike machine lock-stitches, which unravel if a single thread breaks, a hand-sewn saddle stitch remains strong for generations. We reinforce stress points with solid brass rivets, ensuring our bags carry the weight of your travels.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- ============================================================
       SECTION 3: MATERIALS
       ============================================================ -->
  <section class="story-section section" id="story-materials" aria-label="Materials">
    <div class="container">
      <div class="materials-header-block" data-reveal style="text-align: center; max-width: 600px; margin: 0 auto var(--sp-64) auto;">
        <p class="eyebrow">03 — Materials</p>
        <h2 class="serif-title">The elements of time.</h2>
        <div class="divider" data-draw-line style="margin: var(--sp-24) auto;"></div>
      </div>
      
      <div class="materials-grid">
        <!-- Column 1: Leather -->
        <article class="material-card" data-reveal>
          <div class="material-card__img-wrap" style="border: 1px solid var(--line);">
            <img src="assets/images/look-5.jpg" alt="Tan and dark leather goods" class="material-img" />
          </div>
          <h3 class="material-card__title">Vegetable-Tanned Leather</h3>
          <p class="material-card__desc">
            Sourced from select tanneries, our full-grain leather is tanned using organic bark and plant vegetable extracts. Free from synthetic coatings, it breathes, softens, and develops a rich tone.
          </p>
        </article>
        
        <!-- Column 2: Patina -->
        <article class="material-card" data-reveal data-reveal-delay="0.1">
          <div class="material-card__img-wrap" style="border: 1px solid var(--line);">
            <img src="assets/images/look-2.jpg" alt="Macro leather stitching detail" class="material-img" />
          </div>
          <h3 class="material-card__title">The Patina</h3>
          <p class="material-card__desc">
            As our leather is exposed to sunlight, handling, and the dry air, it darkens and develops a deep, customized luster. It does not wear out; it wears in, recording the path of its owner.
          </p>
        </article>
        
        <!-- Column 3: Hardware -->
        <article class="material-card" data-reveal data-reveal-delay="0.2">
          <div class="material-card__img-wrap" style="border: 1px solid var(--line);">
            <img src="assets/images/mirage-belt-3.jpg" alt="Brushed gold hardware detail" class="material-img" />
          </div>
          <h3 class="material-card__title">Solid Brass</h3>
          <p class="material-card__desc">
            We use solid, sand-cast brass and brushed champagne gold hardware. Over time, the metal develops a soft, dark oxidation that mirrors the leather's natural ageing process.
          </p>
        </article>
      </div>
    </div>
  </section>

  <!-- ============================================================
       CLOSING CALL-TO-ACTION
       ============================================================ -->
  <section class="story-section section" id="story-closing" aria-label="Explore">
    <div class="container" style="text-align: center; max-width: 800px; margin: 0 auto;" data-reveal>
      <p class="eyebrow">The Collection</p>
      <h2 class="serif-title" style="margin-bottom: var(--sp-24);">Carry the story forward.</h2>
      <p class="body-lg" style="margin-bottom: var(--sp-48); color: var(--muted);">
        Every piece is numbered, documented, and boxed in natural linen packaging. Discover the pieces currently available.
      </p>
      <div class="magnetic">
        <a href="collection.html" class="btn btn--gold">
          <span>Explore the Collection</span>
          <span class="btn__arrow">→</span>
        </a>
      </div>
    </div>
  </section>
`;

fs.writeFileSync('our-story.html', storyTopPart + storyContent + bottomPart);

// ── JOURNAL CONTENT ──
const journalContent = `
  <!-- ============================================================
       JOURNAL HERO
       ============================================================ -->
  <section class="hero hero--slim" id="hero" aria-label="Journal Hero">
    <div class="hero__grain" aria-hidden="true"></div>
    <div class="hero__bg" aria-hidden="true">
      <img src="assets/images/look-3.jpg"
           alt="Journal Background" loading="eager" />
    </div>

    <div class="hero__content">
      <p class="eyebrow hero__eyebrow">The Journal</p>
      <h1 class="hero__title">
        <span class="word"><span class="word-inner">Notes</span></span>
        <span class="word"><span class="word-inner">from</span></span>
        <span class="word"><span class="word-inner">the</span></span>
        <br />
        <span class="word"><span class="word-inner">Atelier.</span></span>
      </h1>
      <p class="hero__subtitle">
        Conversations on craft, design, and the spaces between.
      </p>
    </div>
  </section>

  <!-- ============================================================
       JOURNAL GRID
       ============================================================ -->
  <section class="section" id="journal-grid" aria-label="Journal Articles">
    <div class="container">
      <div class="materials-grid">
        <article class="collection-card" data-reveal>
          <div class="collection-card__img-wrap" data-parallax-wrapper>
            <img src="assets/images/look-2.jpg"
                 alt="Article 1" class="collection-card__img" data-parallax="-0.1" loading="lazy" />
            <div class="collection-card__overlay"></div>
          </div>
          <div class="collection-card__content">
            <p class="eyebrow collection-card__eyebrow">Craft — 12 Oct</p>
            <h2 class="collection-card__title" style="font-size: 1.25rem;">The Anatomy of a Stitch</h2>
            <a href="#" class="collection-card__link">Read Article <span>→</span></a>
          </div>
        </article>
        
        <article class="collection-card" data-reveal data-reveal-delay="0.15">
          <div class="collection-card__img-wrap" data-parallax-wrapper>
            <img src="assets/images/look-5.jpg"
                 alt="Article 2" class="collection-card__img" data-parallax="-0.1" loading="lazy" />
            <div class="collection-card__overlay"></div>
          </div>
          <div class="collection-card__content">
            <p class="eyebrow collection-card__eyebrow">Inspiration — 28 Sep</p>
            <h2 class="collection-card__title" style="font-size: 1.25rem;">Silence as Design</h2>
            <a href="#" class="collection-card__link">Read Article <span>→</span></a>
          </div>
        </article>

        <article class="collection-card" data-reveal data-reveal-delay="0.25">
          <div class="collection-card__img-wrap" data-parallax-wrapper>
            <img src="assets/images/look-6.jpg"
                 alt="Article 3" class="collection-card__img" data-parallax="-0.1" loading="lazy" />
            <div class="collection-card__overlay"></div>
          </div>
          <div class="collection-card__content">
            <p class="eyebrow collection-card__eyebrow">Travel — 04 Sep</p>
            <h2 class="collection-card__title" style="font-size: 1.25rem;">Return to the Dunes</h2>
            <a href="#" class="collection-card__link">Read Article <span>→</span></a>
          </div>
        </article>
      </div>
    </div>
  </section>
`;

fs.writeFileSync('journal.html', journalTopPart + journalContent + bottomPart);

console.log('Created our-story.html and journal.html');
