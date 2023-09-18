import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
  },
  profilePictureURL: String,
  username: String,
  nickname: String,
  phoneNumber: {
    type: Number,
    required: [true, 'Phone Number is required.'],
  },
  address: {
    type: String,
    required: [true, 'Address is required.'],
  },
});

const User = mongoose.model('User', userSchema);

export default User;
