"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bookModel_1 = __importDefault(require("../models/bookModel"));
;
;
class BookController {
    constructor(bookRepository) {
        this.bookRepo = bookRepository;
    }
    getAllBooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { query } = req;
            const pageSize = query.pageSize ? parseInt(query.pageSize) : 5;
            const page = query.page ? parseInt(query.page) : 1;
            let filter = {};
            if (query.genre) {
                filter.genre = query.genre;
            }
            const books = yield this.bookRepo.getAllBooks(filter, (page <= 0 ? 1 : page), (pageSize <= 0 ? 5 : pageSize));
            return res.status(200).json(books);
        });
    }
    addBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookDto = req.body;
            const bookResult = bookModel_1.default.create(bookDto);
            if (!bookResult.isSuccess) {
                return res.status(400).json({
                    error: bookResult.error
                });
            }
            const book = bookResult.result;
            const bookInsertedId = yield this.bookRepo.addBook(book);
            return res.status(201).json({
                createdId: bookInsertedId
            });
        });
    }
    getBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const bookResult = yield this.bookRepo.getBook(id);
            if (!bookResult.isSuccess) {
                return res.status(404).json({
                    error: bookResult.error
                });
            }
            return res.status(200).json(bookResult.result);
        });
    }
    updateBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const bookDto = req.body;
            const bookResult = bookModel_1.default.create(bookDto);
            if (!bookResult.isSuccess) {
                return res.status(400).json({
                    error: bookResult.error
                });
            }
            const updatedBook = bookResult.result;
            const updateResult = yield this.bookRepo.updateBook(id, updatedBook);
            if (!updateResult.isSuccess) {
                return res.status(400).json({
                    error: updateResult.error
                });
            }
            return res.status(200).json(updateResult.result);
        });
    }
    removeBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const deleteResult = yield this.bookRepo.deleteBook(id);
            if (!deleteResult.isSuccess) {
                return res.status(404).json({
                    error: deleteResult.error
                });
            }
            return res.sendStatus(204);
        });
    }
}
exports.default = BookController;
//# sourceMappingURL=BookController.js.map