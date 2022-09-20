import mongoose from "mongoose";

const collection = 'Carts';
const cartSchema = mongoose.Schema({
  products: [
    {
      product:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Products'
      },
      quantity:Number
    }
  ]
})

export { collection, cartSchema };