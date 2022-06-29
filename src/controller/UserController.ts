import { hash } from 'bcryptjs';
import { Request, Response } from 'express';
import { userModel } from '../model/UserModel';

export class UserController {
    async getUsers(req: Request, res: Response) {
        try {
            const users = await userModel.find();
            res.status(200).json(users);
        } catch (err) {
            console.log(err);
        }
    }

    async signup(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;

            const hashPassword = await hash(password, 8);

            const user = await userModel.create({
                name,
                email,
                password: hashPassword,
            });
            res.status(201).json({ _id_user: user._id, email });
        } catch (err) {
            console.log(err);
        }
    }
}
