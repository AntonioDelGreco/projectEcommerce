import express from 'express';
import passport from 'passport';
import session from 'express-session';
import { usersDB } from './dao/indexDAO.js';
import initializePassport from './config/passport.config.js'
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import usersRouter from './routes/users.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

//express server
const app = express();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

//middleware
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:true}));
app.use(session({
  store: usersDB,
  secret:"userSession",
  resave:false,
  saveUninitialized:false
}));
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//Template engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

//routing
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/users', usersRouter);
app.use('/', viewsRouter);