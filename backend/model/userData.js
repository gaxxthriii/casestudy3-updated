// const mongoose=require('mongoose')
// const userschema=mongoose.Schema({
//     username:String,
//     password:String,
//     email: {
//         type: String,
//         unique: true
//       },
//       role: {
//         type: String,
//         enum: ['admin', 'user'],
//         default: 'user'
//       },
      

// })
// const userData=mongoose.model('user',userschema)
// module.exports=userData

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
});

const userData = mongoose.model('user', userSchema); // Capitalize model name
module.exports = userData;
