import { Router } from 'express';
import admin from '../middleware/auth.middleware.js'
import { allProducts, getSingle, productAdd, updateProduct, deleteById } from '../controllers/products.controllers.js'
const router = Router();

router.get('/', allProducts);
router.get('/:pid', getSingle);
router.post('/', admin, productAdd) 
router.put('/:pid', admin, updateProduct)
router.delete('/:pid', admin, deleteById)   

export default router;