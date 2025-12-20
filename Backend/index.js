const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


const dealerRouter = require('./routers/dealerRouter');
app.use('/dealers', dealerRouter);

const categoryRouter = require('./routers/categoryRouter');
app.use('/category', categoryRouter);

const faqRouter = require('./routers/faqRouter');
app.use('/faq', faqRouter);


app.listen(5174);