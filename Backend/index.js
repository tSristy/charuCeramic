const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/images", express.static(path.join(__dirname, 'images')));

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