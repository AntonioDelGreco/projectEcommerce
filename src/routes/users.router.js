import { Router } from "express";
import passport from 'passport';
import { register, registerFail, login, loginFail, logout} from '../controllers/users.controllers.js';
const router = Router();

router.post('/register', passport.authenticate('register', {failureRedirect:'/api/users/registerfail'}), register);
router.get('/registerfail', registerFail);
router.post('/login', passport.authenticate('login', {failureRedirect: '/api/users/loginfail'}), login);
router.get('/loginfail', loginFail);
router.get('/logout', logout);

export default router; 