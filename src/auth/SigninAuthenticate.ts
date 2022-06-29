import { compare } from 'bcryptjs';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { userModel } from '../model/UserModel';

export class SigninAuthenticate {
    async signin(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const user = await userModel.findOne({ email: email });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const passwordIsValid = await compare(password, user.password);

            if (!passwordIsValid) {
                return res.status(401).json({ error: 'Password is not valid' });
            }

            const secret: string = process.env.JWT_SECRET!;

            const token = sign({ id: user._id }, secret, { expiresIn: '2d' });

            return res
                .status(200)
                .json({ user: { id: user._id, email }, token });
        } catch (err) {
            console.log(err);
        }
    }
}
