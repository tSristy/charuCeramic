const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const port = 5174;


const dealerRouter = require('./routers/dealerRouter');
app.use('/dealers', dealerRouter);

const categoryRouter = require('./routers/categoryRouter');
app.use('/category', categoryRouter);

const faqRouter = require('./routers/faqRouter');
app.use('/faq', faqRouter);


app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`);
});