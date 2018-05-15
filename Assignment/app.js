"use strict"

const express = require("express")
const app = express()
let booksModule = require("./DB-module.js")

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

// send static file as response
app.get("/", (req, res, next) => {
	booksModule.getAll().then((items) => {
		res.render('home', {
			books: items
		});
	}).catch((err) => {
		return next(err);
	});
})

app.get("/home", (req, res) => {
	res.redirect("/")
})

app.get("/about", (req, res) => {
	res.type("text/html")
	res.sendFile(__dirname + "/public/about.html")
})

app.get("/getAll", (req, res, next) => {
	booksModule.getAll().then((items) => {
		res.type("application/json")
		res.end(JSON.stringify(items))
	}).catch((err) => {
		return next(err);
	});

})

app.post("/add", (req, res, next) => {
	booksModule.addB(req.body, (err, result) => {
		if (!err)
			res.render("add", {
				success: result.success
			})
		else return next();
	})
})

app.get("/get/:isbn", (req, res) => {
	let isbn = req.params.isbn
	let result = booksModule.getB(isbn)
	res.type("application/json")
	res.write("Searching for " + isbn + " : \n")
	if (result.success == true) {
		res.write(result.book.title + " : " + result.book.description)
	} else {
		res.write("Book Not Found")
	}
	res.end()
})

app.get("/delete/:isbn", (req, res) => {
	let isbn = req.params.isbn
	let result = booksModule.deleteB(isbn)
	res.render("delete", {
		success: result.success,
		title: result.title,
		length: result.length
	})
})

app.post("/detail", (req, res, next) => {
	booksModule.getB(req.body.isbn)
	.then((result)=>{
		console.log(result)
		res.render("detail", {
			isbn: req.body.isbn,
			result: result
		})
	}).catch((err)=>{
		return next(err)
	})
})

// define 404 handler
app.use((req, res) => {
	res.type("text/plain")
	res.status(404)
	res.send("404 - Not found")
})

app.listen(app.get("port"), () => {
	console.log("Express started")
})