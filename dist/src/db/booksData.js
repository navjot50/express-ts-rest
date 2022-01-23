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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const mongodb_1 = require("mongodb");
const collectionName = 'books';
const getAllBooks = (filter, page = 1, pageSize = 5) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, db_1.getDb)();
        const books = yield db.collection(collectionName).find(filter, {
            skip: (page - 1) * pageSize,
            limit: pageSize
        }).toArray();
        const booksArr = books.map(book => book);
        return booksArr;
    }
    finally {
        (0, db_1.dbClose)();
    }
});
const getBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, db_1.getDb)();
        const failureResponse = {
            isSuccess: false,
            error: `Book with ${id} not found`
        };
        if (!mongodb_1.ObjectId.isValid(id)) {
            return failureResponse;
        }
        const bookDoc = yield db.collection(collectionName).findOne({ _id: new mongodb_1.ObjectId(id) });
        if (bookDoc === null) {
            return failureResponse;
        }
        const book = bookDoc;
        return {
            isSuccess: true,
            result: book
        };
    }
    finally {
        (0, db_1.dbClose)();
    }
});
const addBook = (book) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, db_1.getDb)();
        const result = yield db.collection(collectionName).insertOne(book);
        return result.insertedId;
    }
    finally {
        (0, db_1.dbClose)();
    }
});
const updateBook = (id, updatedBook) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongodb_1.ObjectId.isValid(id)) {
            return {
                isSuccess: false,
                error: `Book with ${id} doesn't exist`
            };
        }
        const db = yield (0, db_1.getDb)();
        const result = yield db.collection(collectionName)
            .findOneAndReplace({ _id: new mongodb_1.ObjectId(id) }, updatedBook, {
            returnDocument: 'after'
        });
        const resultVal = result.value;
        if (resultVal === null) {
            return {
                isSuccess: false,
                error: `Unable to update Book with ${id}`
            };
        }
        return {
            isSuccess: true,
            result: resultVal
        };
    }
    finally {
        (0, db_1.dbClose)();
    }
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongodb_1.ObjectId.isValid(id)) {
            return {
                isSuccess: false,
                error: `Book with ${id} doesn't exist`
            };
        }
        const db = yield (0, db_1.getDb)();
        const deletionResult = yield db.collection(collectionName).deleteOne({
            _id: new mongodb_1.ObjectId(id)
        });
        if (!deletionResult.acknowledged) {
            return {
                isSuccess: false,
                error: `Unable to delete Book with id ${id}`
            };
        }
        return {
            isSuccess: true
        };
    }
    finally {
        (0, db_1.dbClose)();
    }
});
const bookRepository = {
    getAllBooks,
    getBook,
    addBook,
    updateBook,
    deleteBook
};
exports.default = bookRepository;
//# sourceMappingURL=booksData.js.map