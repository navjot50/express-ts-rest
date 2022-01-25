import express from 'express';
import bookRepo from '../db/booksData';
import asyncHandler from '../../util/asyncMiddleware';
import BookController from '../controllers/BookController';

const booksRouter = express.Router();
const bookController = new BookController(bookRepo);

booksRouter.route('/books')
    .get(asyncHandler(bookController.getAllBooks))
    .post(asyncHandler(bookController.addBook))

booksRouter.route('/books/:id')
    .get(asyncHandler(bookController.getBook))
    .put(asyncHandler(bookController.updateBook))
    .delete(asyncHandler(bookController.removeBook));

export default booksRouter;
