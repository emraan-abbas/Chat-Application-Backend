const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  message: String,
  senderId: { type: mongoose.Types.ObjectId, ref: 'User' },
})

module.exports = mongoose.model('Message', messageSchema);