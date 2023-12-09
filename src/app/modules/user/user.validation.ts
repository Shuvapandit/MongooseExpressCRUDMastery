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
    username: z.string(),
    password: z.string().min(1).max(20),
    fullName: usernameValidationSchema,
    age: z.number(),
    email: z.string(),
    isActive: z.enum(['active', 'blocked']).default('active'),
    hobbies: z.enum(['Fishing', 'playing', 'Travelling']),
    address: addressValidationSchema,
    orders: ordersValidationSchema.optional(),
    isDeleted: z.boolean().optional().default(false),

});
export default userValidationSchema;