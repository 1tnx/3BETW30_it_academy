const express = require('express')
const router = express.Router()

const cartController = require('./controllers/cartController.js')
const catalogueController = require('./controllers/catalogueController.js')
const userController = require('./controllers/userController.js')

router.get('/', catalogueController.catalogueList)
router.get('/login', userController.userLogin)
router.post('/logged', userController.userNew)
router.post('/logged2', userController.userAddName)
router.post('/add/:i', cartController.cartAdd)
router.post('/remove/:i', cartController.cartRemove)
router.get('/cart', cartController.cartDisplay)
router.get('/confirm', cartController.confirmOrder)

module.exports = router
