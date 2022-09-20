import passport from 'passport';
import local from 'passport-local';
import { usersDAO } from '../dao/indexDAO.js';

const localStrategy = local.Strategy;

const initializePassport = () => {
  passport.use('register', new localStrategy({
    passReqToCallback:true,
    usernameField:"email"
  }, async(req, email, password, done) => {
    try {
      const { name } = req.body;
      if (!name || !password || !email) return done(null, false, {message: 'Incomplete values'});
      const existUser = await usersDAO.search(email);
      if(existUser) return done(null, false, {message: 'User already exists'});
      const newUser = { name, password, email };
      let result = await usersDAO.addUser(newUser);
      return done(null, result);
    } catch (error) {
      done(error);
    }
  }))

  passport.use('login', new localStrategy({
    usernameField:'email'
  }, async(email, password, done) => {
    try {
      if (!email || !password) return done(null, false, {message:'Incomplete values'});
      const user = await usersDAO.search(email);
      if(!user) return done(null, false, {message:'Incorrect credentials'});
      if(!await user.validPassword(password)) return done(null, false, {message:'Incorrect password, try again'});
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }))

  passport.serializeUser((user, done) => {
    done(null, user._id);
  })
  
  passport.deserializeUser(async(id, done) => {
    let result = await usersDAO.search({_id:id});
    return done(null, result);
  })
}

export default initializePassport;