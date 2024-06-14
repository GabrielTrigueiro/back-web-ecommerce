const express = require("express");

const router = express.Router();

const authController = require('./controllers/authController');
const authMiddleware = require('./middlewares/authMiddleware');

const userController = require('./controllers/userController');
const userMiddleware = require('./middlewares/userMiddleware')

const productController = require('./controllers/productController');
const productMiddleware = require('./middlewares/productMiddleware');

const saleController = require('./controllers/saleController');
const saleMiddleware = require('./middlewares/saleMiddleware');

const indicationController = require('./controllers/indicationController');
const indicationMiddleware = require('./middlewares/indicationMiddleware');

// login

router.post('/login', authController.login)

// usuarios
router.get('/user', userController.getAll);
router.post('/registerUser', userMiddleware.checkRequiredFieldsToRegister, userMiddleware.checkUserExists, userController.createUser);
router.put('/updateUser/:id', authMiddleware.authenticateToken, userMiddleware.checkRequiredFieldsToRegister, userController.updateUser);

// produtos
router.get('/product', productController.getAll);
router.post('/registerProduct', authMiddleware.authenticateToken, productMiddleware.checkRequiredFieldsToRegister, productController.createProcut);
router.put('/updateProduct/:id', authMiddleware.authenticateToken, productMiddleware.checkRequiredFieldsToRegister, productController.updateProduct);

// indicacao
router.get('/indication', authMiddleware.authenticateToken, indicationController.getAll);
router.get('/indication/:codigo', authMiddleware.authenticateToken, indicationController.getByCode);
router.post('/registerIndication', authMiddleware.authenticateToken, indicationMiddleware.checkRequiredFieldsToRegister, indicationMiddleware.checkIndicationExists, indicationController.createIndication);

// compra
router.get('/sale/:userId', authMiddleware.authenticateToken, saleController.getAllByUserId);
router.post('/newSale', authMiddleware.authenticateToken, saleController.makeSale);

module.exports = router;