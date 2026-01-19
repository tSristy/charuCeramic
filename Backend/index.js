const express = require('express');
const cors = require('cors');
const path = require('path');
const sharp = require('sharp'); 
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());


// app.get('/api/images/:filename', async (req, res) => {
//     const { filename } = req.params;
//     const filePath = path.join(__dirname, 'images', filename);

//     if (!fs.existsSync(filePath)) {
//         return res.status(404).send('Image not found');
//     }

//     try {
//         res.set('Cache-Control', 'public, max-age=31536000, immutable');

//         const transformedImage = await sharp(filePath)
//             .resize({ width: 1200, withoutEnlargement: true }) 
//             .webp({ quality: 90 }) 
//             .toBuffer();

//         res.set('Content-Type', 'image/webp');
//         res.send(transformedImage);
//     } catch (err) {
//         console.error("Image processing error:", err);
//         res.sendFile(filePath);
//     }
// });

app.use('/api/images', express.static(path.join(__dirname, 'images')));
app.use('/api/pdf', express.static(path.join(__dirname, 'pdf')));

const bannerRouter = require('./routers/bannerRouter');
app.use('/api/banner', bannerRouter);

const dealerRouter = require('./routers/dealerRouter');
app.use('/api/dealer', dealerRouter);

const categoryRouter = require('./routers/categoryRouter');
app.use('/api/category', categoryRouter);

const faqRouter = require('./routers/faqRouter');
app.use('/api/faq', faqRouter);

const blogRouter = require('./routers/blogRouter');
app.use('/api/blog', blogRouter);

const projectRouter = require('./routers/projectRouter');
app.use('/api/project', projectRouter);

const productRouter = require('./routers/productRouter');
app.use('/api/product', productRouter);

const catalogueRouter = require('./routers/catalogueRouter');
app.use('/api/catalogue', catalogueRouter);

const technoRouter = require('./routers/technologyRouter');
app.use('/api/technology', technoRouter);

const guideRouter = require('./routers/guideRouter');
app.use('/api/guide', guideRouter);


const careerRouter = require('./routers/careerRouter');
app.use('/api/career', careerRouter);


const policyTermsRouter = require('./routers/tpRouter');
app.use('/api/policy-terms', policyTermsRouter);


const loginRouter = require('./routers/login');
app.use('/api', loginRouter);



const authCheck = require('./Service/authCheck');
app.get("/api/auth-check", authCheck, (req, res) => {
  res.status(200).json({ auth: true });
})



const PORT = process.env.PORT || 5174;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});