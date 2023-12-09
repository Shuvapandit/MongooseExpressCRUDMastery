import { Model } from 'mongoose';
export type TFullname = {
    firstName: string;
    lastName: string;
};
export type TAddress = {
    street: string;
    city: string;
    country: string;
};
export type TOrders = {
    productName: string;
    price: number;
    quantity: number;
};

export type TUser = {
    userId: number;
    username: string,
    password: string;
    fullName: TFullname;
    age: number;
    email: string;
    isActive: 'active' | 'blocked';
    hobbies: 'Fishing' | 'playing' | 'Travelling';
    address: TAddress;
    orders: TOrders;
    isDeleted: boolean;

};
//for creating static
export interface UserModel extends Model<TUser> {
    isUserExists(userId: number): Promise<TUser | null>;
}
