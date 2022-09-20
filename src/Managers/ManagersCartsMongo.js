import mongoose from 'mongoose';

class ManagersCarts{
  constructor(collect, cartsSchema) {
    this.cartsService = mongoose.model(collect, cartsSchema);
  }
  allCarts = async () => await this.cartsService.find();
  
  newCart = async () => {
    try {
      const newCart = { products: [] };
      const cart = await this.cartsService.insertMany(newCart);
      return cart;
    } catch (error) {
      console.log("Fromm addNewCart " + error);
    }
  };
  
  deleteSingleCart = async id => {
    try {
      const cartDeleted = await this.cartsService.deleteOne({ _id: id });
      return cartDeleted;
    } catch (error) {
      console.log("From deleteSingleCart " + error);
    }
  };
  
  getFromCart = async (id, allProds) => {
    try {
      const cart = await this.cartsService.findOne({ _id: id });
      const prodsFromCart = allProds.map(element => {
        let prodExist = cart.products.some(elem => element._id.toString() === elem.prod);
        if (prodExist) return element;
      });
      const cartClean = prodsFromCart.filter(e => e);
      return cartClean;
    } catch (error) {
      console.log(`Error from getFromCart: ${error.message}`)
    }
  };

  codeToCart = async (idCart, idProd) => {
    try {
      const newProduct = { prod: idProd, quantity: 1 }; 
      const cart = await this.cartsService.findOne({_id:idCart});
      const prodExist = cart.products.some(elem => elem.prod === idProd)
      if (prodExist) { 
        const prodsInCart = cart.products.map(elem => {
          if (elem.prod === idProd) elem.quantity += 1;
          return elem;
        });
        const cartUpdate = await this.cartsService.updateOne({ _id: idCart }, { 
          $set: { 
            products: prodsInCart
         }})
        return cartUpdate;
      } 
      else{
        cart.products = [...cart.products, newProduct];
        const cartUpdate = await this.cartsService.updateOne({ _id: idCart }, {
          $set: {
              products: cart.products
        }})
        return cartUpdate;
      }
    } catch (error) {  
      console.log(`Error from codeToCart: ${error.message}`);
    }
  };

  delFromCartProd = async (idCart, idProd) => {
    const cart = await this.cartsService.findOne({_id:idCart});
      const prodsInCart = cart.products.map(elem => {
        if (elem.prod === idProd){
          if (elem.quantity === 1) return 0;
          elem.quantity -= 1;
        }
        return elem;
      });
      const cartClean = prodsInCart.filter(e => e);
      const cartDel = await this.cartsService.updateOne({ _id: idCart }, { 
        $set: { 
          products: cartClean
       }})
      return cartDel;
  }
}

export default ManagersCarts;