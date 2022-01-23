import * as chai from 'chai';
import { Request } from 'express';
import sinon from 'sinon';
import BookController from '../src/controllers/BookController';
import Book from '../src/models/bookModel';
import { BookRepository } from '../src/db/booksData';

const should = chai.should();

describe('Book Controller tests', () => {
    describe('Post tests', () => {
        it('Post gives Bad Request status for missing title of Book', async () => {
            const bookRepo = {} as BookRepository;
            const req = {
                body: {
                    author: 'Charles',
                    genre: 'Horror',
                    read: false
                }
            } as Request;
            const res = {
                status: sinon.spy(),
                json: sinon.spy(),
            } as any;
            const expectedError = {
                error: 'Missing or invalid values for Book'
            };

            const sut = new BookController(bookRepo);
            await sut.addBook(req, res);


            res.status.calledWith(400).should.be.true;
            res.json.calledWith(expectedError).should.be.true;
        });

        it('Post give Created status for a valid Book', async () => {
            const fakeId = 'abc3fbavq136aga';
            const bookRepo = {
                addBook(book: Book) { return Promise.resolve(fakeId) }
            } as BookRepository;
            const req = {
                body: {
                    title: 'Oliver Twist',
                    author: 'Charles',
                    genre: 'Horror',
                    read: false
                }
            } as Request;
            const res = {
                status: sinon.spy(),
                json: sinon.spy()
            } as any;
            const expectedResponse = {
                createdId: fakeId
            }

            const sut = new BookController(bookRepo);
            await sut.addBook(req, res);

            res.status.calledWith(201).should.be.true;
            res.json.calledWith(expectedResponse).should.be.true;
        });
    });

})