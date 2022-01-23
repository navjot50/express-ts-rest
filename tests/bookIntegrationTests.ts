import * as chai from 'chai';
import supertest from "supertest";
import server, { listener } from '../app';
import Book from "../src/models/bookModel";
import { MongoClient } from 'mongodb';

const should = chai.should();
const agent = supertest.agent(server);

describe('Book CRUD Tests', () => {
    it('Post should save a Book and return the saved Book id', (done) => {
        const book: Book = {
            title: 'Oliver Twist',
            author: 'Charles',
            genre: 'Horror',
            read: false
        };

        agent.post('/api/books')
            .send(book)
            .expect(200)
            .end((err, results) => {
                results.body.should.have.property('createdId');
                done();
            });
    });

    afterEach((done) => {
        MongoClient.connect('mongodb://admin:admin@localhost:27017')
            .then(client => ({
                client: client,
                db: client.db('test')
            }))
            .then(clientDetails => {
                clientDetails.db.collection('books').deleteMany({});
                return clientDetails;
            })
            .then(clientDetails => clientDetails.client.close())
            .then(_ => done())
            .catch(err => console.log(`Unable to do cleanup: ${err.stack}`));
    });

    after((done) => {
        listener.close((err) => {
            done();
        });
    });
})