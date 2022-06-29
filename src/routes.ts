import { Router } from 'express';
import { AuthenticationValidate } from './auth/AuthenticationValidate';
import { SigninAuthenticate } from './auth/SigninAuthenticate';
import { UserController } from './controller/UserController';

const router: Router = Router();

const userController = new UserController();
const signInAuthenticate = new SigninAuthenticate();

router.post('/auth/signup', userController.signup);

router.get('/users', AuthenticationValidate, userController.getUsers);
router.get('/auth/signin', signInAuthenticate.signin);

export { router };
