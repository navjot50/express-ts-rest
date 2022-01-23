"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booksData_1 = __importDefault(require("../db/booksData"));
const asyncMiddleware_1 = __importDefault(require("../../util/asyncMiddleware"));
const BookController_1 = __importDefault(require("../controllers/BookController"));
const booksRouter = express_1.default.Router();
const bookController = new BookController_1.default(booksData_1.default);
booksRouter.route('/books')
    .get((0, asyncMiddleware_1.default)(bookController.getAllBooks.bind(bookController)))
    .post((0, asyncMiddleware_1.default)(bookController.addBook.bind(bookController)));
booksRouter.route('/books/:id')
    .get((0, asyncMiddleware_1.default)(bookController.getBook.bind(bookController)))
    .put((0, asyncMiddleware_1.default)(bookController.updateBook.bind(bookController)))
    .delete((0, asyncMiddleware_1.default)(bookController.removeBook.bind(bookController)));
exports.default = booksRouter;
//# sourceMappingURL=booksRouter.js.map