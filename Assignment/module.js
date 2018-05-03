let books = [{
	isbn: "9781593275846",
	title: "Eloquent JavaScript, Second Edition",
	subtitle: "A Modern Introduction to Programming",
	author: "Marijn Haverbeke",
	pages: 472,
	description: "JavaScript lies at the heart of almost every modern web application, from social apps to the newest browser-based games. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications."
},
{
	isbn: "9781449325862",
	title: "Git Pocket Guide",
	subtitle: "A Working Introduction",
	author: "Richard E. Silverman",
	pages: 234,
	description: "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git experience."
},
{
	isbn: "9781593277574",
	title: "Understanding ECMAScript 6",
	subtitle: "The Definitive Guide for JavaScript Developers",
	author: "Nicholas C. Zakas",
	pages: 352,
	description: "ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that ECMAScript 6 brings to JavaScript."
},
{
	isbn: "9781449331818",
	title: "Learning JavaScript Design Patterns",
	subtitle: "A JavaScript and jQuery Developer's Guide",
	author: "Addy Osmani",
	pages: 254,
	description: "With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you."
},
{
	isbn: "9781449365035",
	title: "Speaking JavaScript",
	subtitle: "An In-Depth Guide for Programmers",
	author: "Axel Rauschmayer",
	pages: 460,
	"description": "Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who once found himself in the same position."
}
]

exports.addB = (book) => {
	let result = books.find((b) => {
		return b.isbn == book.isbn
	})
	if (result == null) {
		books.push(book)
		return {
			success: true
		}
	}
	return {
		success: false
	}
}

exports.getAll = () => {
	return books
}

exports.getB = (isbn) => {
	let b = books.find((book) => {
		return book.isbn == isbn
	})
	if (b == null) {
		return {
			success: false
		}
	}
	return {
		success: true,
		book: b
	}
}

exports.deleteB = (isbn) => {
	let bookD = books.find((book) => {
		if (book.isbn == isbn) {
			return book
		}
	})
	if (bookD == null) {
		return {
			success: false,
			length: books.length
		}
	} else {
		let index = books.indexOf(bookD)
		if (index > -1) {
			books.splice(index, 1)
		}
		return {
			success: true,
			title: bookD.title,
			length: books.length
		}
	}
}

// exports.deleteB = (isbn) => {
//     var result = books.find(function (book,index) {
//         if (book.isbn == isbn) {
//             return {title:book.title,index:index}
//         }
//     })
//     if (result.index > -1) {
//         books.splice(result.index, 1);
//         return result;
//     }
//     return {title: null};
// }