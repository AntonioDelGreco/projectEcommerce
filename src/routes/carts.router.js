import { Router } from 'express';
import { createCart, deleteCart, getAllP, addPToCart, delOfCartProd, ppp } from '../controllers/carts.controllers.js'
const router = Router();

router.get('/', ppp); //route for testing
router.post('/', createCart); 
router.delete('/:cid', deleteCart); 
router.get('/:cid/products', getAllP);
router.post('/:cid/products/:pid', addPToCart); 
router.delete('/:cid/products/:pid', delOfCartProd)

export default router;