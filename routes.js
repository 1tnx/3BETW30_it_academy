let express = require("express");
let router = express.Router();

let cartController = require("./controllers/cartController.js");
let catalogueController = require("./controllers/catalogueController.js");
let userController = require("./controllers/userController.js");

router.get("/", catalogueController.catalogueList);
router.get("/login", userController.userLogin);
router.post("/logged", userController.userNew);
router.post("/logged2", userController.userAddName);
router.post("/add/:i", cartController.cartAdd);
router.post("/remove/:i", cartController.cartRemove);
router.get("/cart", cartController.cartDisplay);
router.get("/confirm", cartController.confirmOrder);

module.exports = router;