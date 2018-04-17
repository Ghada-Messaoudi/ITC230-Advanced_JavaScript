var http = require("http");
var booksModule = require("./module.js");
const querystring = require('querystring');

http.createServer(function (req, res) {
  var fs = require("fs");
  var path = req.url.toLowerCase();
  if (path == '/home') {
    path = '/';
  }
  console.log(path)
  switch (path) {

    case '/':
      fs.readFile("public/home.html", function (err, data) {
        res.writeHead(200, {
          'Content-Type': 'text/html'
        });
        res.write(data);
        res.end();
      });
      break;

    case '/about':
      fs.readFile("public/about.html", function (err, data) {
        res.writeHead(200, {
          'Content-Type': 'text/html'
        });
        res.write(data);
        res.end();
      });
      break;

    case '/get':
    booksModule.getB(req.querystring("isbn"), function (err, data) {
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        res.write('Searching for ' + req.querystring("isbn") + ' : \n' + data);
        res.end();
      });
      break;

    case '/delete':
      var book = booksModule.deleteB()
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.write(req.isbn + ' deleted.')
      res.end();
      break;

    case '/getall':
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.end(booksModule.getAll())
      break;

    default:
      res.writeHead(404, {
        'Content-Type': 'text/html'
      });
      res.end('<br><br><br><br><h1>Page Not Found</h1>');
      break;
  }
}).listen(process.env.PORT || 3000);