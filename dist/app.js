"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const debug_1 = __importDefault(require("debug"));
const booksRouter_1 = __importDefault(require("./src/routers/booksRouter"));
const body_parser_1 = __importDefault(require("body-parser"));
const port = process.env.PORT || 4000;
const server = (0, express_1.default)();
const debug = (0, debug_1.default)('app');
server.use(body_parser_1.default.json());
server.use('/api', booksRouter_1.default);
//global error handler registered in middleware
//to be registered after all other middleware - last in the middleware chain
server.use((err, req, res, next) => {
    debug(err.stack);
    res.status(500).json({
        error: 'Unable to handle the request at the moment'
    });
});
server.listen(port, () => {
    debug(`Server listening on ${port}`);
});
//# sourceMappingURL=app.js.map