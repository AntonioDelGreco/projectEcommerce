import ManagersUsers from "../../Managers/ManagersUsersMongo.js";
import { collection, userSchema } from "../../models/User.js";

class UsersMongoDAO extends ManagersUsers{
  constructor(){
    super(collection, userSchema)
  }
}

export default UsersMongoDAO;