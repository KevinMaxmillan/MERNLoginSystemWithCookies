import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  numericId: { type: Number, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
