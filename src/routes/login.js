const express = require('express');
const LoginController = require('../controllers/LoginController');

const router = express.Router();

router.get('/login', LoginController.index);
router.post('/auth', LoginController.auth);
router.get('/logout', LoginController.logout);
router.get('/dataOrders', LoginController.dataOrders);
router.get('/data', LoginController.data);
router.get('/dataProducts', LoginController.dataProducts);

router.post('/create', LoginController.create);
router.post('/createProduct', LoginController.createProduct);
router.post('/createOrder', LoginController.createOrder);

router.get('/edit/:id', LoginController.edit);
router.get('/editProduct/:id', LoginController.editProduct);
router.post('/update', LoginController.update);
router.post('/updateProduct', LoginController.updateProduct);

router.get('/deleteProduct/:id', LoginController.deleteProduct);
router.get('/delete/:id', LoginController.deleteUser);
router.get('/deleteOrder/:id', LoginController.deleteOrder);

router.get('/getUsers', LoginController.data);
module.exports = router;

