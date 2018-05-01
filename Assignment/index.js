let http = require("http")
let booksModule = require("./module.js")

http.createServer((req, res) => {
	let fs = require("fs")
	let path = req.url.toLowerCase()
	if (path == "/home") {
		path = "/"
	}
	path = path.split("?")
	let route = path[0]
	switch (route) {

	case "/":
		fs.readFile("public/home.html", (err, data) => {
			res.writeHead(200, {
				"Content-Type": "text/html"
			})
			res.write(data)
			res.end()
		})
		break

	case "/about":
		fs.readFile("public/about.html", (err, data) => {
			res.writeHead(200, {
				"Content-Type": "text/html"
			})
			res.write(data)
			res.end()
		})
		break

	case "/get": {
		let isbn = path[1].split("=")[1]
		let book = JSON.parse(booksModule.getB(isbn))
		if (book.msg == undefined) {
			res.writeHead(200, {
				"Content-Type": "application/json"
			})
			res.write("Searching for " + isbn + " : \n" + book.title + " : " + book.description)
		} else {
			res.writeHead(404, {
				"Content-Type": "application/json"
			})
			res.write("Searching for " + isbn + " : \n" + book.msg)
		}
		res.end()
		break
	}
	case "/delete": {
		let isbn = path[1].split("=")[1]
		let result = JSON.parse(booksModule.deleteB(isbn))
		res.writeHead(200, {
			"Content-Type": "text/plain"
		})
		if (result.success) {
			res.end(result.title + " removed.")
		} else {
			res.end("Not Found")
		}
		break
	}
	case "/getall": {
		res.writeHead(200, {
			"Content-Type": "application/json"
		})
		res.end(booksModule.getAll())
		break
	}
	default: {
		res.writeHead(404, {
			"Content-Type": "text/html"
		})
		res.end("<br><br><br><br><h1>Page Not Found</h1>")
		break
	}
	}
}).listen(process.env.PORT || 3000)