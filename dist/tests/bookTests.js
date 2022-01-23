"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai = __importStar(require("chai"));
const bookModel_1 = __importDefault(require("../src/models/bookModel"));
const should = chai.should();
describe('Book Model tests', () => {
    it('Should not have empty title', () => {
        const action = () => new bookModel_1.default('', 'Charles', 'Horror', false);
        action.should.throw(Error, 'Invalid values for Book');
    });
    it('Should not have empty author', () => {
        const action = () => new bookModel_1.default('Oliver Twist', '', 'Horror', false);
        action.should.throw(Error, 'Invalid values for Book');
    });
    it('Should not have empty genre', () => {
        const action = () => new bookModel_1.default('Oliver Twist', 'Charles', '', false);
        action.should.throw(Error, 'Invalid values for Book');
    });
    it('Should fail to create book for missing title', () => {
        //forcing undefined title with type assertion
        const book = {
            author: 'Charles',
            genre: 'Horror',
            read: false
        };
        const result = bookModel_1.default.create(book);
        result.isSuccess.should.be.equal(false);
    });
    it('Should have read as false if read is missing', () => {
        //forcing undefined title with type assertion
        const book = {
            title: 'Oliver Twist',
            author: 'Charles',
            genre: 'Horror'
        };
        const result = bookModel_1.default.create(book);
        if (!result.isSuccess) {
            should.fail(result.isSuccess, false, 'Book created with read as true for missing read');
            return;
        }
        result.result.read.should.be.equal(false);
    });
});
//# sourceMappingURL=bookTests.js.map