import express from 'express';
import { userControllers } from './user.controller';
const router = express.Router();
router.post('/users', userControllers.createUser);
//Retrieve a list of all users
router.get('/users', userControllers.getAllUsers);
export const UserRoutes = router;