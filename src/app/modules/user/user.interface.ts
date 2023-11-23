import { Model } from 'mongoose';
export type TUsername = {
    firstName: string;
    lastName: string;
};
export type TAddress = {
    street: string;
    city: string;
    country: string;
};
export type TOrders = {
    street: string;
    city: string;
    country: string;
};

export type TUser = {
    userId: number;
    password: string;
    username: TUsername;
    age: number;
    email: string;
    isActive: 'active' | 'blocked';
    hobbies: 'Fishing' | 'playing' | 'Travelling';
    address: TAddress;
    orders: TOrders;
};
//for creating static
export interface UserModel extends Model<TUser> {
    isUserExists(userId: number): Promise<TUser | null>;
}

