import ManagersProds from "../../Managers/ManagersProdsMongo.js";
import { collection, productSchema } from "../../models/Products.js";


class ProdsMongoDAO extends ManagersProds{
  constructor(){
    super(collection, productSchema)
  }
}

export default ProdsMongoDAO;