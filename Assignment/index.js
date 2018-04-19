var http = require("http");
var booksModule = require("./module.js");

http.createServer(function (req, res) {
  var fs = require("fs");
  var path = req.url.toLowerCase();
  if (path == '/home') {
    path = '/';
  }
  path = path.split("?")
  route = path[0]
  switch (route) {

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
      var isbn = path[1].split("=")[1]
      var book = JSON.parse(booksModule.getB(isbn))
      if (book.msg == undefined) {
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        res.write('Searching for ' + isbn + ' : \n' + book.title + " : " + book.description);
      } else {
        res.writeHead(404, {
          'Content-Type': 'application/json'
        });
        res.write('Searching for ' + isbn + ' : \n' + book.msg);
      }
      res.end();
      break;

    case '/delete':
      var isbn = path[1].split("=")[1]
      var result = JSON.parse(booksModule.deleteB(isbn))
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      if (result.success) {
        res.end(result.title + " removed.");
      } else {
        res.end("Not Found");
      }
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