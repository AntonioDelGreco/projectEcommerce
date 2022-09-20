import ManagersCarts from "../../Managers/ManagersCartsMongo.js";
import { collection, cartSchema } from '../../models/Carts.js';

class CartsMongoDAO extends ManagersCarts{
  constructor(){
    super(collection, cartSchema)
  }
}

export default CartsMongoDAO;