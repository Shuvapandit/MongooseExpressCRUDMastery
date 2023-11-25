import express from 'express';
import { userControllers } from './user.controller';
const router = express.Router();
router.post('/users', userControllers.createUser);
//Retrieve a list of all users
router.get('/users', userControllers.getAllUsers);
//Retrieve a specific user by ID
router.get('/:userId', userControllers.getSpecificUser);
export const UserRoutes = router;