
import { User } from "../user.model";
import { TUser } from "./user.interface";
const createUserintoDB = async (userData: TUser) => {

    const result = await User.create(userData)
    return result;

}
// Retrieve a list of all users
const getAllUsersintoDB = async (userData: TUser) => {
    const result = await User.find(userData)
    return result;
}
//Retrieve a specific user by ID
const getSpecificUsersintoDB = async (userId: number) => {
    const result = await User.findOne({ userId });
    return result;
};
//updated a specific user by ID
const updatedSpecificUsersintoDB = async (userId: number) => {
    const result = await User.findOneAndUpdate({ userId });
    return result;
};
//delete a specific user by ID
const deleteSpecificUsersintoDB = async (userId: number) => {
    const result = await User.updateOne({ userId }, { isDeleted: true });
    return result;
};
export const userServices = {
    createUserintoDB,
    getAllUsersintoDB,
    getSpecificUsersintoDB,
    updatedSpecificUsersintoDB,
    deleteSpecificUsersintoDB,


}