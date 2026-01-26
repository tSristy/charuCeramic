import fs from 'fs';
import path from 'path';

const distPath = path.resolve('dist/index.html');
const phpPath = path.resolve('dist/index.php');

const phpCode = `<?php
$db_host = 'localhost';
$db_name = 'charsioz_ceramic_db';
$db_user = 'charsioz_ceramic_shetu';
$db_pass = 'ceramic_shetu';

// --- DEFAULT METADATA (Home Page) ---
$title = "Charu Ceramic | Premium Sanitaryware for Stylish Living";
$description = "At Charu Ceramic, our brand purpose is to enhance the quality of life by providing innovative and reliable ceramic solutions that combine functionality with aesthetic appeal.";
$image = "https://charuceramic.com/assets/charu_logo-gWkycjHv.png";
$url = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get the full path after the domain (e.g., 'company-information' or 'product/wash-basin')
    $full_path = trim(parse_url($url, PHP_URL_PATH), '/');
    $slug = basename($full_path);

    // 1. --------------------------------- CHECK NEW STATIC META TABLE
    $stmt = $pdo->prepare("SELECT title, description, featured_image FROM meta_pages WHERE slug = ? LIMIT 1");
    $stmt->execute([$full_path]);
    $static_row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($static_row) {
        $title = $static_row['title'];
        $description = $static_row['description'];
        if (!empty($static_row['featured_image'])) {
            $image = "https://charuceramic.com/api/" . ltrim($static_row['featured_image'], '/');
        }
    }
    // 2. ----------------------------------- CHECK NEWS
    elseif (strpos($url, '/news-article/') !== false) {
        $stmt = $pdo->prepare("SELECT title, content, featured_image FROM blog_articles WHERE slug = ? LIMIT 1");
        $stmt->execute([$slug]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row) {
            $title = $row['title'] . " | Charu Ceramic";
            $description = substr(strip_tags($row['content']), 0, 160);
            $image = "https://charuceramic.com/api/" . ltrim($row['featured_image'], '/');
        }
    } 
    // 3. ----------------------------------- CHECK BUYING GUIDE
    elseif (strpos($url, '/buying-guide/') !== false) {
        $stmt = $pdo->prepare("SELECT title, content, featured_image FROM buying_guide WHERE slug = ? LIMIT 1");
        $stmt->execute([$slug]); 
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row) {
            $title = $row['title'];
            $description = substr(strip_tags($row['content']), 0, 160);
            $image = "https://charuceramic.com/api/" . ltrim($row['featured_image'], '/');
        }
    }
    // 4. ------------------------------------ CHECK Category (Catch-all)
     elseif (strpos($url, '/product/') !== false) {
        $stmt = $pdo->prepare("SELECT name, description, featured_image FROM category_details WHERE slug = ? LIMIT 1");
        $stmt->execute([$slug]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row) {
            $title = $row['name'] . " | Products";
            $description = substr(strip_tags($row['description']), 0, 160);
            $image = "https://charuceramic.com/api" . $row['featured_image'];
        }
    }
            //5. ------------------------------------ CHECK PRODUCT (Catch-all)
    elseif (!empty($slug)) {
        $stmt = $pdo->prepare("SELECT P.name, P.description, P.model_number, P.brand_name, I.image_url 
                               FROM products AS P 
                               INNER JOIN product_images AS I ON P.id = I.product_id AND P.single_image = I.sort_order 
                               WHERE P.url_path = ? LIMIT 1");
        $stmt->execute([$slug]); 
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row) {
            $title = $row['name']. " | ".$row['model_number']." | ". $row['brand_name'];
            $description = substr(strip_tags($row['description']), 0, 160);
            $image = "https://charuceramic.com/api/" . ltrim($row['image_url'], '/');
        }
    }
} catch (PDOException $e) {}
?>\n`;


if (fs.existsSync(distPath)) {
    let html = fs.readFileSync(distPath, 'utf8');

    // 1. Inject dynamic title
    html = html.replace(/<title>.*?<\/title>/, `<title><?php echo htmlspecialchars($title); ?></title>`);

    // 2. Inject meta tags into the <head>
    const metaTags = `
    
    <meta name="google-site-verification" content="7CM2AClI1qcRQ2lcT821Nz39Lvgk_qSfAn-YiTwOW8U" />
    <meta name="description" content="<?php echo htmlspecialchars($description); ?>">
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?php echo $url; ?>">
    <meta property="og:title" content="<?php echo htmlspecialchars($title); ?>">
    <meta property="og:description" content="<?php echo htmlspecialchars($description); ?>">
    <meta property="og:image" content="<?php echo $image; ?>">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?php echo htmlspecialchars($title); ?>">
    <meta name="twitter:description" content="<?php echo htmlspecialchars($description); ?>">
    <meta name="twitter:image" content="<?php echo $image; ?>">`;

    html = html.replace('<head>', '<head>' + metaTags);

    // 3. Write index.php and remove index.html
    fs.writeFileSync(phpPath, phpCode + html);
    fs.unlinkSync(distPath);

    console.log('🚀 Build transformed: dist/index.html -> dist/index.php');
} else {
    console.error('❌ Error: dist/index.html not found. Run "npm run build" first.');
}