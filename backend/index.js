const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const errorMiddleware = require('./middleware/errorMiddleware');
const authRouter = require('./router/authRouter');
const boardRouter = require('./router/boardRouter');
const mailRouter = require('./router/mailRouter');
const columnRouter = require('./router/columnRouter');
const cardRouter = require('./router/cardRouter');

const port = process.env.PORT || 3000
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}));

app.use('/auth', authRouter);
app.use('/mail', mailRouter);
app.use('/board', boardRouter);
app.use('/column', columnRouter);
app.use('/card', cardRouter);
app.use(errorMiddleware);

const start = async () => {
    try {
        app.listen(port, () => console.log(`Server worked on ${port} port`))
    } catch (e) {
        console.log(e);
    }
};

start().then(r => console.log(r))