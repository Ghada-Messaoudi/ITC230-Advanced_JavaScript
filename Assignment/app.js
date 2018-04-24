'use strict'

const express = require("express");
const app = express();
var booksModule = require("./module.js");
var bodyParser = require("body-parser");

app.set('port', process.env.PORT || 8080);

app.use(express.static(__dirname + '/public')); // set location for static files
app.use(require("body-parser").urlencoded({
    extended: true
})); // parse form submissions

let handlebars = require("express-handlebars");
app.engine(".html", handlebars({
    extname: '.html'
}));
app.set("view engine", ".html");

// send static file as response
app.get('/', (req, res) => {
    var books = booksModule.getAll();
    res.render('home', {
        books: books
    })
});

app.get('/home', (req, res) => {
    res.redirect('/');
});

app.get('/about', (req, res) => {
    res.type('text/html');
    res.sendFile(__dirname + '/public/about.html');
});

app.get('/getAll', (req, res) => {
    res.type('application/json');
    res.end(JSON.stringify(booksModule.getAll()))
});

app.get('/get/:isbn', (req, res) => {
    var isbn = req.params.isbn
    var result = booksModule.getB(isbn)
    res.type('application/json');
    res.write('Searching for ' + isbn + ' : \n')
    if (result.success == true) {
        res.write(result.book.title + " : " + result.book.description);
    } else {
        res.write('Book Not Found');
    }
    res.end();
})

app.get('/delete/:isbn', (req, res) => {
    var isbn = req.params.isbn
    var result = booksModule.deleteB(isbn)
    var books = booksModule.getAll();
    res.render('delete', {
        success: result.success,
        title: result.title,
        length: result.length
    });
});

app.post('/detail', (req, res) => {
    let result = booksModule.getB(req.body.isbn);
    res.render('detail', {
        isbn: req.body.isbn,
        result: result
    });
});

// define 404 handler
app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');
});