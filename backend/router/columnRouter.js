const express = require('express');
const authMiddleware = require("../middleware/authMiddleware");
const ColumnController = require("../controllers/columnController");
const router = express.Router();

router.post('/create_column', authMiddleware, ColumnController.createColumn);
router.delete('/delete_column', authMiddleware, ColumnController.deleteColumn);
router.put('/rename_column', authMiddleware, ColumnController.renameColumn);

module.exports = router;