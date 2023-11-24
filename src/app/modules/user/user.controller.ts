import { Request, Response } from "express";
import { userServices } from "./user.service";
const createUser = async (req: Request, res: Response) => {
    try {

        const { user: userData } = req.body
        const result = await userServices.createUserintoDB(userData)
        res.status(200).json({
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