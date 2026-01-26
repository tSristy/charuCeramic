<?php
ob_start();
ob_clean();

header("Content-Type: application/xml; charset=utf-8");
header("X-Content-Type-Options: nosniff");


$db_host = 'localhost';
$db_name = 'charsioz_ceramic_db';
$db_user = 'charsioz_ceramic_shetu';
$db_pass = 'ceramic_shetu';

$base_url = "https://charuceramic.com";

echo '<?xml version="1.0" encoding="UTF-8"?>';
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

// --- 1. STATIC PUBLIC PAGES ---
$static_pages = [
    '',
    '/company-information',
    '/product',
    '/catalogues',
    '/find-a-store',
    '/contact',
    '/project',
    '/career',
    '/certification',
    '/news-article',
    '/buying-guide',
    '/faq',
    '/privacy-policy',
    '/terms-conditions'
];

foreach ($static_pages as $page) {
    echo '<url><loc>' . $base_url . $page . '</loc><priority>0.8</priority></url>';
}

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8", $db_user, $db_pass);

    // --- 2. DYNAMIC PRODUCTS (Route: /:number) ---
    // Using url_path as the slug based on your router :number
    $products = $pdo->query("SELECT url_path FROM products");
    foreach ($products as $row) {
        echo '<url><loc>' . $base_url . '/' . $row['url_path'] . '</loc><priority>1.0</priority></url>';
    }

    // --- 3. DYNAMIC NEWS (Route: /news-article/:path) ---
    $news = $pdo->query("SELECT slug FROM blog_articles");
    foreach ($news as $row) {
        echo '<url><loc>' . $base_url . '/news-article/' . $row['slug'] . '</loc><priority>0.7</priority></url>';
    }

    // --- 4. DYNAMIC GUIDES (Route: /buying-guide/:path) ---
    // Assuming your buying guides table is 'buying_guide' and uses 'slug'
    $guides = $pdo->query("SELECT slug FROM buying_guide"); 
    foreach ($guides as $row) {
        echo '<url><loc>' . $base_url . '/buying-guide/' . $row['slug'] . '</loc><priority>0.6</priority></url>';
    }

} catch (Exception $e) {
    // Silently fail to keep XML valid
}

echo '</urlset>';
?>