var expect = require("chai").expect
var books = require("../module.js")

describe("Book module", () => {
	it("Should get all books", () => {
		let result = books.getAll()
		expect(result).to.not.be.null
	})
    
	it("Should get a book", () => {
		let result = books.getB(9781449365035)
		expect(result.success).to.equal(true)
    })
    
    it("Should delete a book", () => {
		let result = books.deleteB(9781449365035)
		expect(result.success).to.equal(true)
    })
})