import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const collection = 'User';
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  email:{
    type:String,
    required:true,
    unique:true,
    trim:true
  },
  role:{
    type:String,
    default:'user'
  },
  cart:[
    {
      product:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Products'
      },
      quantity:Number
    }
  ]
})

userSchema.pre('save', async function(next){
  if (!this.isModified("password")) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.validPassword = async function(passwordForm) {
  return await bcrypt.compare(passwordForm, this.password);
}

export { collection, userSchema };