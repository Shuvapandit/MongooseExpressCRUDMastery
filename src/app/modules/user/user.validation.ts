import { z } from 'zod';
const addressValidationSchema = z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
});

const ordersValidationSchema = z.object({
    productName: z.string(),
    price: z.number(),
    quantity: z.number(),
});

const usernameValidationSchema = z.object({
    firstName: z.string().min(1).max(10),
    lastName: z.string().min(1).max(10),
});

const userValidationSchema = z.object({
    userId: z.number(),
    password: z.string().min(1).max(20),
    username: usernameValidationSchema,
    age: z.number(),
    email: z.string(),
    isActive: z.enum(['active', 'blocked']).default('active'),
    hobbies: z.enum(['Fishing', 'playing', 'Travelling']),
    address: addressValidationSchema,
    orders: ordersValidationSchema,
    isDeleted: z.boolean(),
});
export default userValidationSchema;