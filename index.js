var http = require("http");
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
    default:
      res.writeHead(404, {
        'Content-Type': 'text/html'
      });
      res.end('<br><br><br><br><h1>Page Not Found</h1>');
      break;
  }
}).listen(process.env.PORT || 3000);