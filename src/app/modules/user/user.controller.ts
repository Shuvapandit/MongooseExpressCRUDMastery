import { Request, Response } from "express";
import { userServices } from "./user.service";
import userValidationSchema from "./user.validation";
const createUser = async (req: Request, res: Response) => {
    try {

        // Schema validation using Zod
        const zodParsedData = userValidationSchema.parse(req.body);
        // Creating user in the database using user services
        const result = await userServices.createUserintoDB(zodParsedData);
        res.status(200).json({
            success: true,
            message: "User created successfully!",
            data: result,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "User not created",
            error: {
                code: 404,
                description: "User not created!",
            },
        });
    }
};
//for get all users
const getAllUsers = async (req: Request, res: Response) => {
    try {

        const result = await userServices.getAllUsersintoDB();
        res.status(200).json({
            success: 'true',
            message: "Users fetched successfully!",
            data: result,
        })
    } catch (error) {
        res.status(404).json({
            "success": false,
            "message": "User not found",
            "error": {
                "code": 404,
                "description": "User not found!"
            }
        });
    }
}
//for get user specific user by ID
const getSpecificUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await userServices.getSpecificUsersintoDB(userId);
        res.status(200).json({
            success: 'true',
            message: "User fetched successfully!",
            data: result,
        })
    } catch (error) {
        res.status(404).json({
            "success": false,
            "message": "User not found",
            "error": {
                "code": 404,
                "description": "User not found!"
            }
        });
    }
}
//for update user
const updateSpecificUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const updatedFields = req.body;  // Assuming the updated data is sent in the request body

        const result = await userServices.updatedSpecificUsersintoDB(userId, updatedFields);

        res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: result,
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
};
//for delete user specific user by ID
const deleteSpecificUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await userServices.deleteSpecificUsersintoDB(userId);
        res.status(200).json({
            success: 'true',
            message: "User  deleted successfully!",
            data: null,
        })
    } catch (error) {
        res.status(404).json({
            "success": false,
            "message": "User not found",
            "error": {
                "code": 404,
                "description": "User not found!"
            }
        });
    }
}
export const userControllers = {
    createUser,
    getAllUsers,
    getSpecificUser,
    updateSpecificUser,
    deleteSpecificUser,
};