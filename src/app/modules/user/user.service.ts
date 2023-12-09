import { User } from "../user.model";
import { TUser } from "./user.interface";
const createUserintoDB = async (userData: TUser) => {
    if (await User.isUserExists(userData.userId)) {
        throw new Error('User already exists!');
    }
    const result = await User.create(userData);
    return result;
};
// Retrieve a list of all users
const getAllUsersintoDB = async (userData: TUser) => {
    const result = await User.find(userData).select(' username fullName age email  address');
    return result;
}
//Retrieve a specific user by ID
const getSpecificUsersintoDB = async (userId: number) => {
    const result = await User.findOne({ userId }).select('userId username fullName age email isActive hobbies address');
    return result;
};
//updated a specific user by ID
const updatedSpecificUsersintoDB = async (userId: number, updatedFields: Partial<TUser>) => {
    const result = await User.findOneAndUpdate({ userId: userId }, { $set: updatedFields }, { new: true }).select('userId username fullName age email isActive hobbies address');
    return result;
};
//delete a specific user by ID
const deleteSpecificUsersintoDB = async (userId: number) => {
    const result = await User.updateOne({ userId: userId }, { isDeleted: true });
    return result;
};
export const userServices = {
    createUserintoDB,
    getAllUsersintoDB,
    getSpecificUsersintoDB,
    updatedSpecificUsersintoDB,
    deleteSpecificUsersintoDB,

}