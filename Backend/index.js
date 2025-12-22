const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());



app.use("/api/images", express.static(path.join(__dirname, 'images')));

const dealerRouter = require('./routers/dealerRouter');
app.use('/dealer', dealerRouter);

const categoryRouter = require('./routers/categoryRouter');
app.use('/category', categoryRouter);

const faqRouter = require('./routers/faqRouter');
app.use('/faq', faqRouter);

const blogRouter = require('./routers/blogRouter');
app.use('/blog', blogRouter);

const projectRouter = require('./routers/projectRouter')
app.use('/project', projectRouter);

app.listen(5174);