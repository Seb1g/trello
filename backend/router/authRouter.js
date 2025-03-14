const express = require('express');
const router = express.Router();
const UserController = require("../controllers/userController");

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/refresh', UserController.refresh);

module.exports = router;