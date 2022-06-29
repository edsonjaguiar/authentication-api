import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

export function AuthenticationValidate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    const [, token] = authorization.split(' ');

    try {
        const secret: string = process.env.JWT_SECRET!;
        const decoded = verify(token, secret);

        const { id } = decoded as TokenPayload;

        req.userId = id;

        next();
    } catch (err) {
        console.log(err);
    }
}
