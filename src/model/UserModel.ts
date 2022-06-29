import { Document, model, Schema } from 'mongoose';
import emailIsValid from 'validator/lib/isEmail';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

const userSchema: Schema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, 'The field name is required'],
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            lowercase: true,
            validate: [emailIsValid, 'Please enter a valid email'],
            required: [true, 'The field email is required'],
        },
        password: {
            type: String,
            trim: true,
            required: [true, 'The field password is required'],
        },
    },
    { timestamps: true }
);

const userModel = model<IUser>('User', userSchema);

export { userModel };
