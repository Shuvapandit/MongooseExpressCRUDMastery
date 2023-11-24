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
    } catch (error: any) {
        console.log(error)
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
    } catch (error: any) {
        console.log(error)
    }
}
export const userControllers = {
    createUser,
    getAllUsers,
};