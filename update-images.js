const fs = require('fs');

function updateImages(file) {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Hero Image
  content = content.replace(/<div class="hero__bg">[\s\S]*?<\/div>/, '<div class="hero__bg"><img src="assets/images/hero.jpg" alt="Atelier Noir Hero Handbag on Desert Sand" /></div>');

  // Collection Images
  content = content.replace(/<img src="https:\/\/images\.unsplash\.com.*?alt="The Desert Line".*?>/, '<img src="assets/images/collection-desert.jpg" alt="The Desert Line Collection" class="collection-card__img" />');
  content = content.replace(/<img src="https:\/\/images\.unsplash\.com.*?alt="Nocturne".*?>/, '<img src="assets/images/collection-nocturne.jpg" alt="Nocturne Collection" class="collection-card__img" />');
  content = content.replace(/<img src="https:\/\/images\.unsplash\.com.*?alt="Heritage".*?>/, '<img src="assets/images/collection-heritage.jpg" alt="Heritage Collection" class="collection-card__img" />');

  // Product Images in Horizontal Showcase (index.html)
  content = content.replace(/<img src="https:\/\/images\.unsplash\.com.*?alt="Dune Tote".*?>/, '<img src="assets/images/dune-tote-1.jpg" alt="Dune Tote" class="showcase__card-img" />');
  content = content.replace(/<img src="https:\/\/images\.unsplash\.com.*?alt="Nocturne Crossbody".*?>/, '<img src="assets/images/nocturne-crossbody-1.jpg" alt="Nocturne Crossbody" class="showcase__card-img" />');
  content = content.replace(/<img src="https:\/\/images\.unsplash\.com.*?alt="Atlas Weekender".*?>/, '<img src="assets/images/atlas-weekender-1.jpg" alt="Atlas Weekender" class="showcase__card-img" />');
  content = content.replace(/<img src="https:\/\/images\.unsplash\.com.*?alt="Sahara Cardholder".*?>/, '<img src="assets/images/sahara-cardholder-1.jpg" alt="Sahara Cardholder" class="showcase__card-img" />');
  content = content.replace(/<img src="https:\/\/images\.unsplash\.com.*?alt="Mirage Belt".*?>/, '<img src="assets/images/mirage-belt-1.jpg" alt="Mirage Belt" class="showcase__card-img" />');
  content = content.replace(/<img src="https:\/\/images\.unsplash\.com.*?alt="Eclipse Clutch".*?>/, '<img src="assets/images/eclipse-clutch-1.jpg" alt="Eclipse Clutch" class="showcase__card-img" />');

  // Craft Image
  content = content.replace(/<div class="editorial__img-wrap".*?>[\s\S]*?<img src="https:\/\/images\.unsplash\.com.*?alt="Equation".*?>/m, '<div class="editorial__img-wrap" data-reveal>\n          <img src="assets/images/craft.jpg" alt="Artisan hands crafting leather" class="editorial__img" />');

  // Lookbook images
  let lookCount = 1;
  content = content.replace(/<img src="https:\/\/images\.unsplash\.com.*?class="lookbook__img".*?>/g, (match) => {
    let img = `<img src="assets/images/look-${lookCount}.jpg" alt="Atelier Noir Lookbook ${lookCount}" class="lookbook__img" />`;
    lookCount++;
    return img;
  });

  // product.html main image
  content = content.replace(/<img src="https:\/\/images\.unsplash\.com.*?id="pdp-main-image".*?>/, '<img src="assets/images/dune-tote-1.jpg" alt="Dune Tote" class="pdp__main-img" id="pdp-main-image" />');

  fs.writeFileSync(file, content);
  console.log(`Updated images in ${file}`);
}

['index.html', 'product.html', 'collection.html'].forEach(updateImages);
