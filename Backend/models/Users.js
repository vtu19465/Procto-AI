const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {type: String, required: true},  
  name: { type: String, required: true },
  email_id: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  passwd: { type: String, required: true },
},
{
    collection: 'Users'
});


module.exports = mongoose.model('Users', userSchema);
