let mongoose = require('mongoose');

// remote db connection settings. For security, connectionString should be in a separate file not committed to git
let connectionString = 'mongodb://dbuser:mg123@ds117590.mlab.com:17590/books';
mongoose.connect(connectionString);

// local db connection settings 
// var ip = process.env.ip || '127.0.0.1';
// mongoose.connect('mongodb://' +ip+ '/<DB_NAME>');

let conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));

// define Book model in JSON key/value pairs
// values indicate the data type of each key
let mySchema = mongoose.Schema({
    isbn: {
        type: Number,
        required: true
    },
    title: String,
    subtitle: String,
    author: String,
    pages: Number,
    description: String
});

module.exports = mongoose.model('Book', mySchema);