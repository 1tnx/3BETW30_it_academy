const User = require('../models/userModel')

userList = []

exports.userLogin = function (req, res) {
  res.render('login.ejs')
}

exports.userNew = function (req, res) {
  const name = req.body.nickname
  req.session.user = name
  const user = new User(name, req.session.id)
  userList.push(user)
  res.redirect('/')
}

exports.userAddName = function (req, res) {
  const name = req.body.nickname
  req.session.user = name
  const user = new User(name, req.session.id)
  userList.push(user)
  res.redirect('/confirm')
}

exports.getUserName = function (id) {
  const user = userList.find(user => user.id == id)
  return user.name
}

exports.deleteUser = function (id) {
  userList = userList.filter(user => user.id !== id)
}
