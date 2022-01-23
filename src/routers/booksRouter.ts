import express from 'express';
import bookRepo from '../db/booksData';
import asyncHandler from '../../util/asyncMiddleware';
import BookController from '../controllers/BookController';

const booksRouter = express.Router();
const bookController = new BookController(bookRepo);

booksRouter.route('/books')
    .get(asyncHandler(bookController.getAllBooks.bind(bookController)))
    .post(asyncHandler(bookController.addBook.bind(bookController)));

booksRouter.route('/books/:id')
    .get(asyncHandler(bookController.getBook.bind(bookController)))
    .put(asyncHandler(bookController.updateBook.bind(bookController)))
    .delete(asyncHandler(bookController.removeBook.bind(bookController)));

export default booksRouter;
