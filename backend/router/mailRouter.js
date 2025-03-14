const express = require('express');
const UserController = require("../controllers/userController");
const router = express.Router();

router.get('/activate/:link', UserController.activate);

module.exports = router;