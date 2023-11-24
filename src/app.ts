import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
const app: Application = express();
//parsers
app.use(express.json());
app.use(cors());
//applications routes
app.use('/api', UserRoutes);
const getAcontroller = (req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
    })
};
app.get('/', getAcontroller);
export default app;
