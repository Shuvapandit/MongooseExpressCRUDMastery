import { UserModel } from "../user.model";
import { TUser } from "./user.interface";
const createUserintoDB = async (userData: TUser) => {
    const result = await UserModel.create(userData)
    return result;
}
// Retrieve a list of all users
const getAllUsersintoDB = async (userData: TUser) => {
    const result = await UserModel.find(userData)
    return result;
}
export const userServices = {
    createUserintoDB,
    getAllUsersintoDB,

}