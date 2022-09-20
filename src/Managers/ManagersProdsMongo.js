import mongoose from "mongoose";

class ManagersProds {

  constructor(collection, productSchema) {
    this.prodsService = mongoose.model(collection, productSchema);
  }

  getAll = async () => {
    try {
       return await this.prodsService.find();
    } 
     catch (error) {
      console.log("From GetALL " + error);
    }
  };

  getById = async id => {
    try {
      const prodById = await this.prodsService.findOne({_id:id});
      return prodById;
    } catch (error) {
      console.log("From GetById " + error);
    }
  };

  add = async (name, price) => {
    try {
      let day = new Date();
      const prod = {
        name,
        price,
        timestamp: day.toLocaleString(),
        thumbnail: "url"
      }
      const prodAdd = await this.prodsService.insertMany(prod);
      return prodAdd;
    } catch (error) {
      console.log("From Add " + error.message);
    }
  };

  findUpdate = async (id, newName, newPrice) => {
    try {
      const update = await this.prodsService.updateOne({ _id: id }, { 
        $set: { 
          name: newName, 
          price: newPrice 
        } 
      }); 
      return update;
    } catch (error) {
      console.log('Error from findUpdate: ' + error.message);
    }
  };

  deleteById = async id => {
    try {
      const deleted = await this.prodsService.deleteOne({ _id: id });
      return deleted;
    } catch (error) {
      console.log("From DeleteById " + error);
    }
  };
}

export default ManagersProds;