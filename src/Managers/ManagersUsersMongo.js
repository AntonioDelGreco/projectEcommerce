import mongoose from "mongoose";

class ManagersUsers{
  constructor(collection, userSchema){
    this.userService = mongoose.model(collection, userSchema);
  }

  search = async email => {
    const userExist = await this.userService.findOne({email});
    return userExist;
  }

  addUser = async newUser => {
    const add = await this.userService.create(newUser);
    return add;
  }
}

export default ManagersUsers;