const Cart = require('../models/cartModel')
const connection = require('../db.js')

const userController = require('./userController.js')
const cartController = require('./cartController.js')
const catalogueController = require('./catalogueController.js')

let cartList = []

exports.cartAdd = function (req, res) {
  const formation = req.params.i
  if (cartList.length == 0) {
    cartList.push(new Cart(req.session.id))
    cartList[cartList.length - 1].addFormation(formation)
  } else {
    const cartFind = cartList.find(cart => cart.user == req.session.id)
    if (cartFind) {
      cartFind.addFormation(formation)
    } else {
      cartList.push(new Cart(req.session.id))
      cartList[cartList.length - 1].addFormation(formation)
    }
  }
  res.redirect('/')
}

exports.cartRemove = function (req, res) {
  const formation = req.params.i
  const cartFind = cartList.find(cart => cart.user == req.session.id)
  if (cartFind) {
    cartFind.removeFormation(formation)
  }
  res.redirect('/cart')
}

exports.cartDisplay = function (req, res) {
  if (cartList.length == 0) {
    res.render('cart.ejs', { cartItems: [] })
  } else {
    const cartFind = cartList.find(cart => cart.user == req.session.id)
    if (cartFind) {
      const formations = cartFind.formations
      if (formations.length == 0) {
        res.render('cart.ejs', { cartItems: [] })
      } else {
        const displayList = []
        formations.forEach(findCart)

        function findCart (value) {
          const catalogue = catalogueController.getCatalogue()
          const findFormation = catalogue.find(formation => formation.id == value)
          displayList.push(findFormation)
        }
        res.render('cart.ejs', { cartItems: displayList })
      }
    } else {
      res.render('cart.ejs', { cartItems: [] })
    }
  }
}

exports.confirmOrder = function (req, res) {
  if (req.session.user) {
    const name = userController.getUserName(req.session.id)
    const cartFind = cartList.find(cart => cart.user == req.session.id)
    if (!cartFind) {
      res.redirect('/')
    } else {
      const formations = cartFind.formations

      formations.forEach(registerDb)

      function registerDb (formation) {
        const registration = { name: name, formationId: formation }
        connection.query('INSERT INTO registrations set ?', registration, function (error, resultSQL) {
          if (error) {
            res.status(400).send(error)
          }
        })
      }
      cartController.deleteCart(req.session.id)
      userController.deleteUser(req.session.id)
      req.session.destroy()
      res.render('confirmed.ejs')
    }
  } else {
    res.render('register.ejs')
  }
}

exports.deleteCart = function (id) {
  cartList = cartList.filter(cart => cart.user !== id)
}
