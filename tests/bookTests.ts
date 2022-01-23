import * as chai from 'chai';
import Book, { BookCreationArgs } from '../src/models/bookModel';

const should = chai.should();

describe('Book Model tests', () => {
    it('Should not have empty title', () => {
        const action = () => new Book('', 'Charles', 'Horror', false);
        action.should.throw(Error, 'Invalid values for Book');
    });

    it('Should not have empty author', () => {
        const action = () => new Book('Oliver Twist', '', 'Horror', false);
        action.should.throw(Error, 'Invalid values for Book');
    });

    it('Should not have empty genre', () => {
        const action = () => new Book('Oliver Twist', 'Charles', '', false);
        action.should.throw(Error, 'Invalid values for Book');
    });

    it('Should fail to create book for missing title', () => {
        //forcing undefined title with type assertion
        const book = {
            author: 'Charles',
            genre: 'Horror',
            read: false
        } as BookCreationArgs;

        const result = Book.create(book);
        result.isSuccess.should.be.false;
    });

    it('Should have read as false if read is missing', () => {
        //forcing undefined title with type assertion
        const book = {
            title: 'Oliver Twist',
            author: 'Charles',
            genre: 'Horror'
        } as BookCreationArgs;

        const result = Book.create(book);
        if(!result.isSuccess) {
            should.fail(result.isSuccess, false, 'Book created with read as true for missing read');
            return;
        }

        result.result.read.should.be.false;
    });
});
