let books = require("./models/book");

exports.addB = (book) => {
     books.create(book, (err, result) => {
        if (err) {
            return {
                success: false
            }
        }
        return {
            res: result,
            success: true
        }
    })
}

exports.getAll = () => {
    return books.find({}, (err, res) => {
        if (err) {
            return err;
        }
        return res;
    })
}

exports.getB = (isbn) => {
    return books.findOne({
        'isbn': isbn
    }, (err, item) => {
        if (err) return {
            success: false
        };
        return {
            success: true,
            book: item
        }
    });
}

exports.deleteB = (isbn) => {
    return books.deleteOne({
        'isbn': isbn
    }, (err, res) => {
        if (err) return {
            success: false,
            length: books.length
        }
        return {
            success: true,
            title: res.book.title,
            length: books.length
        }
    })
}