let expect = require("chai").expect
let books = require("../module.js")

 describe("Book module", () => {

	let book = {
		isbn: 989898,
		title: "test",
		author: "ghada"
	}

	it("Should add a book", () => {
		let result = books.addB(book)
		expect(result.success).to.be.true;
	})

	it("Should fail when adding a book that already exists", () => {
		let result = books.addB(book)
		expect(result.success).to.be.false;
	})
    
	it("Should get a book", () => {
		let result = books.getB(book.isbn)
		expect(result.success).to.be.true;
	})
	
	it("Should fail when the book does not exist", () => {
		let result = books.getB(65465)
		expect(result.success).to.be.false;
	})

	it("Should delete a book", () => {
		let result = books.deleteB(book.isbn)
		expect(result.success).to.be.true;
	})

	it("Should fail when deleting an non existing book", () => {
		let result = books.deleteB(0)
		expect(result.success).to.be.false;
	})
})