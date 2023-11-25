import { Request, Response } from "express";
import { userServices } from "./user.service";
import userValidationSchema from "./user.validation";
const createUser = async (req: Request, res: Response) => {
    try {
        const { user: userData } = req.body
        //schema validation using zod
        const zodParsedData = userValidationSchema.parse(userData);
        const result = await userServices.createUserintoDB(zodParsedData)
        res.status(200).json({
            status: 'true',
            message: "User created successfully!",
            data: result,
        })
    } catch (error) {
        res.status(404).json({
            "success": false,
            "message": "User not create",
            "error": {
                "code": 404,
                "description": "User not create!"
            }
        });
    }
}
//for get all users
const getAllUsers = async (req: Request, res: Response) => {
    try {

        const result = await userServices.getAllUsersintoDB();
        res.status(200).json({
            status: 'true',
            message: "Users fetched successfully!",
            data: result,
        })
    } catch (error) {
        res.status(404).json({
            "success": false,
            "message": "User not fetched",
            "error": {
                "code": 404,
                "description": "User not fetched!"
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
            status: 'true',
            message: "Users id fetched successfully!",
            data: result,
        })
    } catch (error) {
        res.status(404).json({
            "success": false,
            "message": "UserId not found",
            "error": {
                "code": 404,
                "description": "UserId not found!"
            }
        });
    }
}
export const userControllers = {
    createUser,
    getAllUsers,
    getSpecificUser,
};