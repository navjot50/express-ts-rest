import { ResultT } from "../../util/resultTypes";
import { isAnyEmptyString } from '../../util/guard';

export interface BookCreationArgs {
    title: string | undefined;
    author: string | undefined;
    genre: string | undefined;
    read: boolean | undefined;
};

class Book {
    readonly id?: string;
    readonly title: string;
    readonly author: string;
    readonly genre: string;
    readonly read: boolean;

    constructor(title: string, author: string, genre: string, read: boolean) {
        if(isAnyEmptyString(title, author, genre)) {
            throw new Error(`Invalid values for Book`);
        }
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.read = read;
    }

    static create({title, author, genre, read} : BookCreationArgs) : ResultT<Book> {
        const failedResponse: ResultT<Book> = {
            isSuccess: false,
            error: 'Missing or invalid values for Book'
        }

        if(title === undefined || author === undefined || genre === undefined) {
            return failedResponse;
        }

        if(isAnyEmptyString(title, author, genre)) {
            return failedResponse;
        }

        read = read ?? false;
        const book = new Book(title, author, genre, read);
        return {
            isSuccess: true,
            result: book
        }
    }
};

export default Book;