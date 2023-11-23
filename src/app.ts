import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();
//parsers
app.use(express.json());
app.use(cors());
//applications routes
app.use('api/users');

const getAcontroller = (req: Request, res: Response) => {
    const a = 10;
    res.send(a);
};
app.get('/', getAcontroller);
export default app;
