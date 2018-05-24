"use strict"

const express = require("express")
const app = express()


app.set("port", process.env.PORT || 8080)

app.use(express.static(__dirname + "/public")) // set location for static files
app.use(require("body-parser").urlencoded({
	extended: true
})) // parse form submissions

let handlebars = require("express-handlebars")
app.engine(".html", handlebars({
	extname: ".html"
}))
app.set("view engine", ".html")

require('./routes.js')(app);

app.use('/api', require('cors')());

app.listen(app.get("port"), () => {
	console.log("Express started")
})