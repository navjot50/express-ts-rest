import { Request, Response } from 'express';
import { BookRepository } from "../db/booksData";
import Book from '../models/bookModel';

interface BookFilter {
    genre?: string;
};

interface BookDto {
    title: string;
    author: string;
    genre: string;
    read: boolean;
};

class BookController {

    private readonly bookRepo: BookRepository;
    
    constructor(bookRepository: BookRepository) {
        this.bookRepo = bookRepository;
    }

    getAllBooks = async (req: Request, res: Response) => {
        const { query } = req;
        const pageSize = query.pageSize ? parseInt(query.pageSize as string) : 5;
        const page = query.page ? parseInt(query.page as string) : 1;
        let filter: BookFilter = {};
        if(query.genre) {
            filter.genre = query.genre as string
        }

        const books = await this.bookRepo.getAllBooks(filter, (page <= 0 ? 1 : page), (pageSize <= 0 ? 5 : pageSize));
        return res.status(200).json(books);
    }

    addBook = async (req: Request, res: Response) => {
        const bookDto = req.body as BookDto;
        const bookResult = Book.create(bookDto);
        if(!bookResult.isSuccess) {
            res.status(400)
            return res.json({
                error: bookResult.error
            });
        }

        const book = bookResult.result;
        const bookInsertedId = await this.bookRepo.addBook(book);
        res.status(201);
        return res.json({
            createdId: bookInsertedId
        });
    }

    getBook = async (req: Request, res: Response) => {
        const id = req.params.id;

        const bookResult = await this.bookRepo.getBook(id);
        if(!bookResult.isSuccess) {
            return res.status(404).json({
                error: bookResult.error
            });
        }

        return res.status(200).json(bookResult.result);
    }

    updateBook = async (req: Request, res: Response) => {
        const id = req.params.id;
        const bookDto = req.body as BookDto;
        const bookResult = Book.create(bookDto);
        if(!bookResult.isSuccess) {
            return res.status(400).json({
                error: bookResult.error
            });
        }

        const updatedBook = bookResult.result;
        const updateResult = await this.bookRepo.updateBook(id, updatedBook);
        if(!updateResult.isSuccess) {
            return res.status(400).json({
                error: updateResult.error
            });
        }

        return res.status(200).json(updateResult.result);
    }

    removeBook = async (req: Request, res: Response) => {
        const id = req.params.id;
        const deleteResult = await this.bookRepo.deleteBook(id);
        if(!deleteResult.isSuccess) {
            return res.status(404).json({
                error: deleteResult.error
            })
        }
        
        return res.sendStatus(204);
    }
}

export default BookController;