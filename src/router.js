const express = require("express");

const router = express.Router();

const authController = require('./controllers/authController');

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
router.put('/updateUser/:id', userMiddleware.checkRequiredFieldsToRegister, userController.updateUser);

// produtos
router.get('/product', productController.getAll);
router.post('/registerProduct', productMiddleware.checkRequiredFieldsToRegister, productController.createProcut);
router.put('/updateProduct/:id', productMiddleware.checkRequiredFieldsToRegister, productController.updateProduct);

// indicacao
router.get('/indication', indicationController.getAll);
router.post('/registerIndication', indicationMiddleware.checkRequiredFieldsToRegister, indicationMiddleware.checkIndicationExists, indicationController.createIndication);

// compra
router.get('/sale/:userId', saleController.getAllByUserId);
router.post('/newSale', saleMiddleware.checkRequiredFieldsToRegister, saleController.makeSale);

module.exports = router;