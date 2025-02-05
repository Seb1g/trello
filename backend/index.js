const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const boardsRoutes = require('./routes/boards');

const app = express();
const PORT = process.env.PORT || 5000;

// Мидлвар для обработки JSON и CORS
app.use(cors());
app.use(express.json());

// Маршруты API
app.use('/auth', authRoutes);
app.use('/boards', boardsRoutes);

app.get('/', (req, res) => {
    res.send('Добро пожаловать в API Trello Clone!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
