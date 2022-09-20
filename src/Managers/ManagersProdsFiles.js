import { existsSync, promises } from "fs";
import config from '../config/db.js';

export default class ManagersProds {

    constructor(route) {
        this.route = config.path + route;
    }

  getAll = async () => {
    try {
      if (existsSync(this.route)) {
        const dataProducts = await promises.readFile(this.route, "utf8");
        return JSON.parse(dataProducts);
      }
    } catch (error) {
      console.log("From GetALL " + error);
    }
  };
  
  getById = async id => {
    try {
      const products = await this.getAll();
      const findId = products.find(oneProd => oneProd.id === parseInt(id));
      return findId;
    } catch (error) {
      console.log("From GetById " + error);
    }
  };

  add = async (name, price) => {
    try {
      const newProduct = { name, price };
      let fecha = new Date();
      let products = await this.getAll();
      if (products.length === 0) {
        newProduct.id = 1;
        newProduct.timestamp = fecha.toLocaleString();
        newProduct.code = Math.random().toString(32).substring(2);
        newProduct.thumbnail = "url";
        products = [...products, newProduct];
        await promises.writeFile(this.route, JSON.stringify(products, null, "\t"));
        return true;
      } else {
        newProduct.id = products[products.length - 1].id + 1;
        newProduct.timestamp = fecha.toLocaleString();
        newProduct.code = Math.random().toString(32).substring(2);
        newProduct.thumbnail = "url";
        products = [...products, newProduct];
        await promises.writeFile(this.route, JSON.stringify(products, null, "\t"));
        return true;
      }
    } catch (error) {
      console.log("From Add " + error);
    }
  };

  findUpdate = async (id, newName, newPrice) => {
    let products = await this.getAll();
    const searchId = products.find(oneProd => oneProd.id === parseInt(id));
    searchId.name = newName;
    searchId.price = newPrice;
    products = [...products];
    await promises.writeFile(this.route, JSON.stringify(products, null, "\t"));
    return products;
  };

  deleteById = async id => {
    try {
      const products = await this.getAll();
      const newList = products.filter(prod => prod.id !== parseInt(id));
      await promises.writeFile(this.route, JSON.stringify(newList, null, "\t"));
      return newList;
    } catch (error) {
      console.log("From DeleteById " + error);
    }
  };
}
