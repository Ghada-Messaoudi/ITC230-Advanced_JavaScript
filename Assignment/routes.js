let booksModule = require("./DB-module.js")
let books = require("./models/book");

module.exports = function (app) {

    app.get("/home", (req, res) => {
        res.redirect("/")
    })

    app.get("/", (req, res, next) => {
        booksModule.getAll().then((items) => {
            res.render('home', {
                books: items
            });
        }).catch((err) => {
            return next(err);
        });
    })

    app.get("/about", (req, res) => {
        res.type("text/html")
        res.sendFile(__dirname + "/public/about.html")
    })

    app.get("/books", (req, res, next) => {
        booksModule.getAll().then((items) => {
            res.type("application/json")
            res.end(JSON.stringify(items))
        }).catch((err) => {
            return next(err);
        });

    })

    app.get("/books/:isbn", (req, res) => {
        let isbn = req.params.isbn
        res.write("Searching for ISBN = " + isbn + " : \n")
        booksModule.getB(isbn).then((item) => {
            res.write("Title : " + item.title + " Author : " + item.author)
            res.end()
        }).catch((err) => {
            res.write("Book Not Found. ")
            res.end()
        })
    })

    app.post("/books", (req, res, next) => {
        books.create(req.body, (err, result) => {
            if (err) {
                return next(err)
            } else {
                res.render("add", {
                    success: true,
                    title: result.title
                })
            }
        })
    })

    app.get("/books/delete/:isbn", (req, res, next) => {
        books.deleteOne({
            'isbn': req.params.isbn
        }, (err, result) => {
            if (err) {
                res.render("delete",{
                    success: false
                })
            }
            return books.count({}, (err, count) => {
                if (err) return next(err)
                else {
                    res.render("delete", {
                        success: true,
                        length: count
                    })
                }
            })
        })
    })

    app.post("/detail", (req, res, next) => {
        booksModule.getB(req.body.isbn)
            .then((book) => {
                res.render("detail", {
                    book: book,
                    isbn: req.body.isbn
                })
            }).catch((err) => {
                return next(err)
            })
    })

    // define 404 handler
    app.use((req, res) => {
        res.type("text/plain")
        res.status(404)
        res.send("404 - Not found")
    })

}