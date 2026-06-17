const fs = require('fs');
const files = ['index.html', 'collection.html', 'product.html'];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Replace header nav
  content = content.replace(
    /<nav class="header__nav" role="navigation" aria-label="Main navigation">[\s\S]*?<\/nav>/,
    `<nav class="header__nav" role="navigation" aria-label="Main navigation">
      <a href="collection.html" class="header__link header__link--active">Collections</a>
      <a href="collection.html?collection=The+Desert+Line" class="header__link">The Desert Line</a>
      <a href="story.html" class="header__link">Our Story</a>
      <a href="journal.html" class="header__link">Journal</a>
    </nav>`
  );

  // Replace mobile nav
  content = content.replace(
    /<nav class="mobile-nav" role="navigation" aria-label="Mobile navigation">[\s\S]*?<\/nav>/,
    `<nav class="mobile-nav" role="navigation" aria-label="Mobile navigation">
    <a href="collection.html" class="mobile-nav__link">Collections</a>
    <a href="collection.html?collection=The+Desert+Line" class="mobile-nav__link">The Desert Line</a>
    <a href="story.html" class="mobile-nav__link">Our Story</a>
    <a href="journal.html" class="mobile-nav__link">Journal</a>
  </nav>`
  );

  // Replace Footer Shop Links
  content = content.replace(
    /<h4 class="footer__col-title">Shop<\/h4>\s*<ul class="footer__links">[\s\S]*?<\/ul>/,
    `<h4 class="footer__col-title">Shop</h4>
          <ul class="footer__links">
            <li><a href="collection.html" class="footer__link">All Collections</a></li>
            <li><a href="collection.html?collection=The+Desert+Line" class="footer__link">The Desert Line</a></li>
            <li><a href="collection.html?collection=Nocturne" class="footer__link">Nocturne</a></li>
            <li><a href="collection.html?collection=Heritage+Leather" class="footer__link">Heritage Leather</a></li>
            <li><a href="collection.html" class="footer__link">Gift Guide</a></li>
          </ul>`
  );

  // Replace Footer House Links
  content = content.replace(
    /<h4 class="footer__col-title">House<\/h4>\s*<ul class="footer__links">[\s\S]*?<\/ul>/,
    `<h4 class="footer__col-title">House</h4>
          <ul class="footer__links">
            <li><a href="story.html" class="footer__link">Our Story</a></li>
            <li><a href="story.html" class="footer__link">Craft & Materials</a></li>
            <li><a href="journal.html" class="footer__link">Journal</a></li>
            <li><a href="product.html" class="footer__link">Stockists</a></li>
          </ul>`
  );

  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
});
