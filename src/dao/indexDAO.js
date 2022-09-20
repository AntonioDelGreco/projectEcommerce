import MongoStore from 'connect-mongo';
import session from 'express-session';
import storage from 'session-file-store';
import config from '../config/db.js';

let usersDB;
let usersDAO;
let cartsDAO;
let prodsDAO;

const persistence = "MONGO";
try {
  switch (persistence) {
    case "MONGO":
      config.connectDB();
      const { default: UsersMongoDAO } = await import(
        "./users/UsersMongoDAO.js"
      );
      const { default: ProdsMongoDAO } = await import(
        "./products/ProductsMongoDAO.js"
      );
      const { default: CartsMongoDAO } = await import(
        "./carts/CartsMongoDAO.js"
      );
      
      usersDAO = new UsersMongoDAO();
      prodsDAO = new ProdsMongoDAO();
      cartsDAO = new CartsMongoDAO();
      usersDB =  MongoStore.create({mongoUrl:process.env.MONGO_URI, ttl:3600});
      break;
    case "FILES":
      const { default: ProdsFilesDAO } = await import(
        "./products/ProductsFilesDAO.js"
      );
      const { default: CartsFilesDAO } = await import(
        "./carts/CartsFilesDAO.js"
      );

      prodsDAO = new ProdsFilesDAO();
      cartsDAO = new CartsFilesDAO();
      const FileStorage = storage(session);
      usersDB = new FileStorage({path: './src/sessions', ttl: 3600, retries: 5});
      break;
  }
} catch (error) {
  console.log('Error from indexDAO: ' + error.message)
}

export { cartsDAO, prodsDAO, usersDAO, usersDB };