import { existsSync, promises } from "fs";
import config from '../config/db.js';

export default class ManagersCarts{
    constructor(route) {
        this.route = config.path + route;
    }

  oneCartAndAllCarts = async (id = null) => {
    if (existsSync(this.route)) {
      let dataCarts = await promises.readFile(this.route, "utf8");
      let carts = JSON.parse(dataCarts);
      if (dataCarts.length === 0){
        dataCarts = null;
        cartById = null;
        return {carts, cartById};
      }
      if (!id) return carts;
      let cartById = carts.find(elem => elem.id === parseInt(id));
      return { carts, cartById };
    }
  }

  newCart = async () => {
    try {
      let carts = await this.oneCartAndAllCarts();
      const newCart = { products:[] };
      if (carts.length === 0) {
        newCart.id = 1;
        carts = [...carts, newCart];
        await promises.writeFile(this.route, JSON.stringify(carts, null, "\t"));
        return newCart;
      }
      newCart.id = carts[carts.length - 1].id + 1;
      carts = [...carts, newCart];
      await promises.writeFile(this.route, JSON.stringify(carts, null, "\t"));
      return newCart;
    } catch (error) {
      console.log("Fromm addNewCart " + error);
    }
  };
  
  deleteSingleCart = async id => {
    try {
      let carts = await this.oneCartAndAllCarts();
      const newListCarts = carts.filter(cart => cart.id !== parseInt(id));
      await promises.writeFile(this.route, JSON.stringify(newListCarts, null, "\t"));
      return newListCarts;
    } catch (error) {
      console.log("From deleteSingleCart " + error);
    }
  };
  
  getFromCart = async (idCart, allProds) => {
    let { cartById } = await this.oneCartAndAllCarts(idCart);
    if (cartById === undefined) return null;
    const prods = allProds.map(element => {
      let prodExist = cartById.products.some(elem => element.code === elem.code);
      if (prodExist) return element;
    });
    const prodsClean = prods.filter(e => e);
    return prodsClean;
  };

  codeToCart = async (idCart, idProd) => {
    let validation = 0;
    const newProduct = { code: idProd, quantity: 1 };
    let { carts, cartById } = await this.oneCartAndAllCarts(idCart);
    cartById.products.forEach(elem => {
        if (elem.code === idProd) {
          elem.quantity += 1;
          return validation = 1;
        }
        validation = 0;
    });
    if (validation === 0) cartById.products.push(newProduct);
    await promises.writeFile(this.route, JSON.stringify(carts, null, "\t"));
    return cartById;
  }

  delFromCartProd = async (idCart, idProd) => {
    let { carts, cartById } = await this.oneCartAndAllCarts(idCart);
    let listNew = cartById.products.filter(elem => elem.code !== idProd);
    carts.forEach(element => element.products = [...listNew]);
    await promises.writeFile(this.route, JSON.stringify(carts, null, "\t"));
  };

}
