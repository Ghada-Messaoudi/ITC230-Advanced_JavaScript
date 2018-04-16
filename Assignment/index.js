var http = require("http");
var booksModule = require("./module.js");

http.createServer(function (req, res) {
  var fs = require("fs");
  var path = req.url.toLowerCase();
  if (path == '/home') {
    path = '/';
  }
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
      var book = booksModule.get(req.isbn)
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end('Searching for ' + req.isbn + ' : \n' + book);
    case '/delete':
      var book = booksModule.deleteB(req.isbn)
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end(req.isbn+' deleted.');
    default:
      res.writeHead(404, {
        'Content-Type': 'text/html'
      });
      res.end('<br><br><br><br><h1>Page Not Found</h1>');
      break;
  }
}).listen(process.env.PORT || 3000);