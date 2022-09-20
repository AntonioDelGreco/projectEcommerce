import { cartsDAO, prodsDAO } from '../dao/indexDAO.js';

const ppp = async (req, res) => {
  //ppp function only for test, delete later
  const carts = await cartsDAO.oneCartAndAllCarts(); 
  res.send(carts);
}

const createCart = async(req, res) => {
  let cart = await cartsDAO.newCart();
  if(!cart) res.status(500).send("Server Error, the cart was not created");
  res.status(200).json(cart);
} 

const deleteCart = async(req, res) => {
    const idCart = req.params.cid;
    if(!idCart) res.status(500).send('Server Error, the cart was not deleted');
    const cartDeleted = await cartsDAO.deleteSingleCart(idCart);
    if (!cartDeleted) res.status(500).send('Server Error, the cart was not deleted');
    res.status(200).send('The cart was deleted successfully');
}

const getAllP = async (req, res) => {
  let idCart = req.params.cid;
  if(!idCart) res.status(500).send('The system could not get the products.');
  const allProds = await prodsDAO.getAll();
  const prods = await cartsDAO.getFromCart(idCart, allProds);
  if(!prods) res.status(500).send('The system could not get the products.');
  res.status(200).send(prods);
}

const addPToCart = async (req, res) => {
  const idCart = req.params.cid;
  const idProd = req.params.pid;
  if (!idCart || !idProd) res.status(500).send('Internal server error to add your product');
  const cartUpdate = await cartsDAO.codeToCart(idCart, idProd);
  if(!cartUpdate) res.status(500).send('Internal server error to add your product');
  res.status(200).send('Your product add to cart successfully');
}

const delOfCartProd = async (req, res) => { 
    const idCart = req.params.cid;
    const idProd = req.params.pid;
    if (!idCart || !idProd) res.status(500).send('It was not possible to remove your product from the cart.');
    const delProd = await cartsDAO.delFromCartProd( idCart, idProd );
    if (!delProd) res.status(500).send('It was not possible to remove your product from the cart.');
}

export { createCart, deleteCart, getAllP, addPToCart, delOfCartProd, ppp };