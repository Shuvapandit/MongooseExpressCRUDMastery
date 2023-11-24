import { Request, Response } from "express";
import { userServices } from "./user.service";
import userValidationSchema from "./user.validation";

const createUser = async (req: Request, res: Response) => {
    try {
        const { user: userData } = req.body
        //schema validation using zod
        const zodParsedData = userValidationSchema.parse(userData);
        const result = await userServices.createUserintoDB(zodParsedData)
        res.status(500).json({
            status: 'success',
            message: "User created successfully!",
            data: result,
        })
    } catch (error: any) {
        console.log(error)
    }
}
export const userControllers = {
    createUser,
};