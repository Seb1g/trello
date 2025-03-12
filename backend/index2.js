const cookieParser = require('cookie-parser');
const router = require('./router/index')
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const errorMiddleware = require('./middleware/errorMiddleware');

const port = process.env.PORT || 3000
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}));

app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
    try {
        app.listen(port, () => console.log(`Server worked on ${port} port`))
    } catch (e) {
        console.log(e);
    }
};

start().then(r => console.log(r))