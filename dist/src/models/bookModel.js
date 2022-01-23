"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const guard_1 = require("../../util/guard");
;
class Book {
    constructor(title, author, genre, read) {
        if ((0, guard_1.isAnyEmptyString)(title, author, genre)) {
            throw new Error(`Invalid values for Book`);
        }
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.read = read;
    }
    static create({ title, author, genre, read }) {
        const failedResponse = {
            isSuccess: false,
            error: 'Missing or invalid values for Book'
        };
        if (title === undefined || author === undefined || genre === undefined) {
            return failedResponse;
        }
        if ((0, guard_1.isAnyEmptyString)(title, author, genre)) {
            return failedResponse;
        }
        read = read !== null && read !== void 0 ? read : false;
        const book = new Book(title, author, genre, read);
        return {
            isSuccess: true,
            result: book
        };
    }
}
;
exports.default = Book;
//# sourceMappingURL=bookModel.js.map