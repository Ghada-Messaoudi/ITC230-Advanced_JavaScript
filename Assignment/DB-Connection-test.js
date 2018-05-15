var Book = require("./models/book");

// return all records
Book.find({}, function (err, items) {
    if (err) return next(err);
    console.log(items.length);
});

Book.findOne({
    'title': 'Speaking JavaScript'
}, function (err, item) {
    if (err) return next(err);
    console.log(item);
});