const express = require('express');
const router = express.Router();
const adminController = require("../controllers/adminController");
const { protect,isAdmin  } = require('../middlware/auth');

router.post('/create', protect, isAdmin, adminController.createUser);
router.get('/get', protect, isAdmin, adminController.getUsers);
router.get('/get/:id', protect, isAdmin, adminController.getUserById);
router.put('/update/:id', protect, isAdmin, adminController.updateUser);
router.post('/updatePass/:id', protect, isAdmin, adminController.updatePassword);
router.delete('/delete/:id', protect, isAdmin, adminController.deleteUser);

module.exports = router;