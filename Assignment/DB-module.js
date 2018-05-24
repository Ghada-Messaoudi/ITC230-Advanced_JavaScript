let books = require("./models/book");

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
        return item
    });
}

exports.addB = (book) => {
    return books.create(book, (err, result) => {
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

exports.deleteB = (isbn) => {
    return books.deleteOne({
        'isbn': isbn
    }, (err, book) => {
        if (err) return {
            success: false,
            msg: 'Course not deleted',
            err: err
        }
        return books.count({}, (err,res)=>{
            if (err) return {
                success: false,
                msg: ' Course deleted but count had error!',
                err: err
            }
            return {
                success: true,
                length: res,
                title: book.title
            }
        })
    })

}