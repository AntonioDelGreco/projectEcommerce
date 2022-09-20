import ManagersCarts from "../../Managers/ManagersCartsFiles.js";

class CartsFilesDAO extends ManagersCarts {
  constructor() {
    super("carts.json");
  }
}

export default CartsFilesDAO;
