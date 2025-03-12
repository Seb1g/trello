const express = require('express');
const cors = require('cors');
require('dotenv').config();

const createItems = require('./routes/board/createItems');
const deleteItems = require('./routes/board/delete');
const moveItems = require('./routes/board/moveItems');

const app = express();
const PORT = process.env.PORT || 5000;

// Мидлвар для обработки JSON и CORS
app.use(cors());
app.use(express.json());

// Маршруты API
app.use('/create_items', createItems);
app.use('/delete_items', deleteItems);
app.use('/move_items', moveItems);

app.get('/', (req, res) => {
    res.send('Добро пожаловать в API Trello Clone!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});