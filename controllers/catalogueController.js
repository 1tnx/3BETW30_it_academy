const Catalogue = require('../models/catalogueModel')

const connection = require('../db.js')

catalogueList = []

exports.getCatalogue = function () {
  return catalogueList
}

exports.getListById = function (list) {
  formationList = []
  list.forEach(element => {
    formation = catalogueList.find(formation => formation.id == element)
    formationList.push(formation)
  })
  formationList = catalogueList.find(formation => formation.id == element)
  return formationList
}

exports.catalogueList = function (req, res) {
  if (catalogueList.length == 0) {
    connection.query(' SELECT * from catalogue;', function (error, resultSQL) {
      if (error) {
        res.status(400).send(error)
      } else {
        res.status(200)
        result = resultSQL
        for (let i = 0; i < resultSQL.length; i++) {
          catalogueList.push(new Catalogue(resultSQL[i].idformations, resultSQL[i].Name, resultSQL[i].Price, resultSQL[i].Start, resultSQL[i].End))
        }
        res.render('catalogue.ejs', { catalogueItems: catalogueList })
      }
    })
  } else {
    res.render('catalogue.ejs', { catalogueItems: catalogueList })
  }
}
