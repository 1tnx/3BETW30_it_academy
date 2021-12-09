let bodyParser = require("body-parser");

let session = require("express-session");

let express = require("express");

let app = express();

let router = require("./routes.js")

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(session({
    secret: "my_secret",
    resave: false,
    saveUninitialized: true
    })
);

app.use("/", router);

app.listen(3000, function() {
    console.log("Server is running on port 3000")
});