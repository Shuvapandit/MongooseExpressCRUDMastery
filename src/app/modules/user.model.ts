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
        username: { type: String, required: true, unique: true },
        password: {
            type: String,
            required: [true, 'Password is required'],
            maxlength: [20, 'Password can not be more than 20 characters'],
        },
        fullName: {
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


        hobbies: [{
            type: String,
            enum: {
                values: ['Fishing', 'playing', 'Travelling'],
            },
        }],
        address: {
            type: userAddressSchema,

        },
        orders: {
            type: OrdersSchema,

        },
        isDeleted: {
            type: Boolean,
            default: false,
        },


    },
    {
        toJSON: {
            virtuals: true,
            transform(doc, ret) {
                ret.password = '';
                delete ret._id;
                delete ret.__v;
                delete ret.isDeleted;
                delete ret.fullName._id;
                delete ret.address._id;
                delete ret.id;
            },
        },
    }
);

userSchema.pre('save', async function (next) {
    const user = this;
    // hashing password and save into DB
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds),
    );
    next();
});
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});
// Query Middleware
userSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
userSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
userSchema.statics.isUserExists = async function (userId: number) {
    const existingUser = await User.findOne({ userId });
    return existingUser;
}
export const User = model<TUser, UserModel>('User', userSchema);