const fs = require('fs');

const files = ['index.html', 'collection.html', 'product.html'];

const newHeader = `  <!-- ============================================================
       HEADER
       ============================================================ -->
  <header class="header" id="header" role="banner">
    <a href="index.html" class="header__logo" aria-label="ATELIER NOIR Home">
      ATELIER NOIR
    </a>

    <nav class="header__nav" role="navigation" aria-label="Main navigation">
      <a href="collection.html" class="header__link">COLLECTIONS</a>
      <a href="index.html#craft" class="header__link">OUR STORY</a>
    </nav>

    <div class="flex" style="align-items: center; gap: var(--sp-24);">
      <button class="header__icon-btn" aria-label="Search" onclick="window.openSearch && window.openSearch()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="vertical-align: middle;"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      </button>
      <button class="header__icon-btn" aria-label="Wishlist" onclick="window.openWishlist && window.openWishlist()" style="position: relative;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="vertical-align: middle;"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        <span class="header__wishlist-count" style="position: absolute; top: -8px; right: -8px; background: var(--sand); color: var(--ink); font-size: 10px; width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 500;">0</span>
      </button>
      <button class="header__cart" aria-label="Shopping bag" onclick="window.openCart && window.openCart()">
        <span>Bag</span>
        <span class="header__cart-count">0</span>
      </button>

      <button class="header__menu-btn" aria-label="Toggle menu" aria-expanded="false">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>

  <!-- Mobile Navigation -->
  <nav class="mobile-nav" role="navigation" aria-label="Mobile navigation">
    <a href="collection.html" class="mobile-nav__link">Collections</a>
    <a href="index.html#craft" class="mobile-nav__link">Our Story</a>
  </nav>`;

const newFooter = `  <footer class="footer" id="footer" role="contentinfo">
    <div class="container">
      <div class="footer__grid">
        <div class="footer__brand">
          <p class="footer__brand-name">ATELIER NOIR</p>
          <p class="footer__brand-desc">
            Luxury leather goods & fashion. Crafted in shadow, worn in light. Handmade with intention at the edge of the Sahara.
          </p>
        </div>

        <div class="footer__col">
          <h4 class="footer__col-title">Shop</h4>
          <ul class="footer__links">
            <li><a href="collection.html" class="footer__link">All Collections</a></li>
            <li><a href="collection.html?category=bags" class="footer__link">Bags</a></li>
            <li><a href="collection.html?category=accessories" class="footer__link">Accessories</a></li>
            <li><a href="collection.html" class="footer__link">Gift Guide</a></li>
          </ul>
        </div>

        <div class="footer__col">
          <h4 class="footer__col-title">House</h4>
          <ul class="footer__links">
            <li><a href="index.html#craft" class="footer__link">Our Story</a></li>
            <li><a href="index.html#craft" class="footer__link">Craft & Materials</a></li>
          </ul>
        </div>

        <div class="footer__col">
          <h4 class="footer__col-title">Support</h4>
          <ul class="footer__links">
            <li><a href="#" class="footer__link">Contact</a></li>
            <li><a href="#" class="footer__link">Shipping & Returns</a></li>
            <li><a href="#" class="footer__link">Care Guide</a></li>
            <li><a href="#" class="footer__link">FAQ</a></li>
          </ul>
        </div>
      </div>

      <div class="footer__bottom">
        <p class="footer__copy">&copy; 2025 ATELIER NOIR. All rights reserved.</p>
        <div class="footer__socials">
          <a href="#" class="footer__social" aria-label="Instagram">Instagram</a>
          <a href="#" class="footer__social" aria-label="Pinterest">Pinterest</a>
          <a href="#" class="footer__social" aria-label="LinkedIn">LinkedIn</a>
        </div>
      </div>

      <p class="footer__wordmark" aria-hidden="true">ATELIER NOIR</p>
    </div>
  </footer>`;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Replace Header
  content = content.replace(
    /<!-- ============================================================\s*HEADER\s*============================================================ -->[\s\S]*?<\/nav>/,
    newHeader
  );

  // Replace Footer
  content = content.replace(
    /<footer class="footer" id="footer" role="contentinfo">[\s\S]*?<\/footer>/,
    newFooter
  );

  fs.writeFileSync(file, content);
  console.log('Updated', file);
});
