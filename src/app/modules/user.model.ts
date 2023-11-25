import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { TAddress, TFullname, TOrders, TUser, UserModel } from './user/user.interface';
import config from '../config';

const userNameSchema = new Schema<TFullname>({
    firstName: {
        type: String,
        unique: true,
        required: [true, 'First Name is required'],
        //use trim for  remove space
        trim: true,
        maxlength: [10, 'Name can not be more than 10 characters'],
    },
    lastName: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Last Name is required'],
        maxlength: [10, 'Name can not be more than 10 characters'],
    },
});

const userAddressSchema = new Schema<TAddress>({
    street: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
});

const OrdersSchema = new Schema<TOrders>({
    productName: {
        type: String,

    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,

    },

});
const userSchema = new Schema<TUser, UserModel>(
    {
        userId: { type: Number, required: [true, 'ID is required'], unique: true },
        password: {
            type: String,
            required: [true, 'Password is required'],
            maxlength: [20, 'Password can not be more than 20 characters'],
        },
        username: {
            type: userNameSchema,
            required: [true, 'Name is required'],
        },
        age: {
            type: Number,
        },
        email: {
            type: String,

        },
        isActive: {
            type: String,
            enum: {
                values: ['active', 'blocked'],
            },
            default: 'active',
        },


        hobbies: {
            type: String,
            enum: {
                values: ['Fishing', 'playing', 'Travelling'],
            },
        },
        address: {
            type: userAddressSchema,

        },
        orders: {
            type: OrdersSchema,

        },
    },


);
/* userSchema.pre('save', function () {
    console.log(this, "presave");
}) */
userSchema.pre('save', async function (next) {
    const usr = this; // doc
    // hashing password and save into DB
    usr.password = await bcrypt.hash(
        usr.password,
        Number(config.bcrypt_salt_rounds),
    );
    next();
});
userSchema.post('save', function () {
    console.log(this, "post");
})
userSchema.statics.isUserExists = async function (userId: number) {
    const existingUser = await User.findOne({ userId });
    return existingUser;
}
