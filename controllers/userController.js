let User = require("../models/userModel");

userList = [];

exports.userLogin =function(req, res) {
    res.render("login.ejs");
}

exports.userNew = function(req, res) {
    let name = req.body.nickname;
    req.session.user = name;
    let user = new User(name, req.session.id);
    userList.push(user);
    res.redirect("/")
}

exports.userAddName = function(req, res) {
    let name = req.body.nickname;
    req.session.user = name;
    let user = new User(name, req.session.id);
    userList.push(user);
    res.redirect("/confirm")
}

exports.getUserName = function(id) {
    let user = userList.find(user => user.id == id);
    return user.name;
}

exports.deleteUser = function(id) {
    userList = userList.filter(user => user.id !== id);
}