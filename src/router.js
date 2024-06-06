const express = require("express");

const router = express.Router();

const userController = require('./controllers/userController');
const userMiddleware = require('./middlewares/userMiddleware')

router.get('/user', userController.getAll);
router.post('/registerUser', userMiddleware.checkRequiredFieldsToRegister, userMiddleware.checkUserExists, userController.createUser);
router.put('/updateUser/:id', userController.updateUser);

module.exports = router;