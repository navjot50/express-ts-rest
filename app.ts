import express, { Request, Response, NextFunction} from 'express';
import debugLogger from 'debug';
import booksRouter from './src/routers/booksRouter';
import bodyParser from 'body-parser';

const port = process.env.PORT || 4000;
const server = express();
const debug = debugLogger('app');

server.use(bodyParser.json());

server.use('/api', booksRouter);

//global error handler registered in middleware
//to be registered after all other middleware - last in the middleware chain
server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    debug(err.stack);
    res.status(500).json({
        error: 'Unable to handle the request at the moment'
    });
});


export const listener = server.listen(port, () => {
    debug(`Server listening on ${port}`);
});

export default server;