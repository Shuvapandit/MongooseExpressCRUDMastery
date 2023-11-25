import { UserModel } from "../user.model";
import { TUser } from "./user.interface";
const createUserintoDB = async (userData: TUser) => {
    if (await User.isUserExists(userData.userId)) {
        throw new error('User already exists!');
    }
    const result = await UserModel.create(userData)
    /*  return result; */

}
// Retrieve a list of all users
const getAllUsersintoDB = async (userData: TUser) => {
    const result = await UserModel.find(userData)
    return result;
}
//Retrieve a specific user by ID
const getSpecificUsersintoDB = async (userId: number) => {
    const result = await UserModel.findOne({ userId });
    return result;
};
export const userServices = {
    createUserintoDB,
    getAllUsersintoDB,
    getSpecificUsersintoDB,


}