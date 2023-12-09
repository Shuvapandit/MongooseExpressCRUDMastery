import express from 'express';
import { userControllers } from './user.controller';
const router = express.Router();
//create user
router.post('/users', userControllers.createUser);
//Retrieve a list of all users
router.get('/users', userControllers.getAllUsers);
//Retrieve a specific user by ID
router.get('/users/:userId', userControllers.getSpecificUser);
//update a specific user by ID
router.put('/users/:userId', userControllers.updateSpecificUser);
//Delete a specific user by ID
router.delete('users/:userId', userControllers.deleteSpecificUser);
export const UserRoutes = router;