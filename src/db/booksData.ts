import { getDb, dbClose } from "./db";
import Book from "../models/bookModel";
import { ObjectId } from "mongodb";
import { Result, ResultT } from '../../util/resultTypes';

const collectionName = 'books';

export interface BookRepository {
    getAllBooks(filter: object, page: number, pageSize: number): Promise<Book[]>,
    getBook(id: string): Promise<ResultT<Book>>,
    addBook(book: Book): Promise<string>,
    updateBook(id: string, updatedBook: Book): Promise<ResultT<Book>>,
    deleteBook(id: string): Promise<Result>
}

const getAllBooks = async (filter: object, page: number = 1, pageSize: number = 5) : Promise<Book[]> => {
    try {
        const db = await getDb();
        const books = await db.collection(collectionName).find(filter, {
            skip: (page - 1) * pageSize,
            limit: pageSize
        }).toArray();
        const booksArr = books.map(book => (book as any) as Book);
        return booksArr;
    } finally {
        dbClose();
    }
};

const getBook = async (id: string) : Promise<ResultT<Book>> => {
    try {
        const db = await getDb();
        const failureResponse: ResultT<Book> = {
            isSuccess: false,
            error: `Book with ${id} not found`
        };

        if(!ObjectId.isValid(id)) {
            return failureResponse;
        }
        const bookDoc = await db.collection(collectionName).findOne({ _id: new ObjectId(id) });
        if(bookDoc === null) {
            return failureResponse;
        }
        const book = (bookDoc as any) as Book;
        return {
            isSuccess: true,
            result: book
        }
    } finally {
        dbClose();
    }
}

const addBook = async (book: Book) : Promise<string> => {
    try {
        const db = await getDb();
        const result = await db.collection(collectionName).insertOne(book);
        return result.insertedId.toString();
    } finally {
        dbClose();
    }
}

const updateBook = async (id: string, updatedBook: Book) : Promise<ResultT<Book>> => {
    try {
        if(!ObjectId.isValid(id)) {
            return {
                isSuccess: false,
                error: `Book with ${id} doesn't exist`
            }
        }

        const db = await getDb();
        const result = await db.collection(collectionName)
            .findOneAndReplace({ _id: new ObjectId(id) }, updatedBook, {
                returnDocument: 'after'
            });

        const resultVal = result.value;
        if(resultVal === null) {
            return {
                isSuccess: false,
                error: `Unable to update Book with ${id}`
            }
        }

        return {
            isSuccess: true,
            result: (resultVal as any) as Book
        }
    } finally {
        dbClose();
    }
}

const deleteBook = async (id: string): Promise<Result> => {
    try {
        if(!ObjectId.isValid(id)) {
            return {
                isSuccess: false,
                error: `Book with ${id} doesn't exist`
            }
        }
        const db = await getDb();
        const deletionResult = await db.collection(collectionName).deleteOne({
            _id: new ObjectId(id)
        });
        if(!deletionResult.acknowledged) {
            return {
                isSuccess: false,
                error: `Unable to delete Book with id ${id}`
            }
        }

        return {
            isSuccess: true
        }
    } finally {
        dbClose();
    }
}

const bookRepository: BookRepository = {
    getAllBooks,
    getBook,
    addBook,
    updateBook,
    deleteBook
}

export default bookRepository;