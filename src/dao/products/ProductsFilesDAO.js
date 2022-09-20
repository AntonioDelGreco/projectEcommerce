import ManagersProds from "../../Managers/ManagersProdsFiles.js";

class ProdsFilesDAO extends ManagersProds {
    constructor() {
        super('products.json')
    }
}

export default ProdsFilesDAO;
