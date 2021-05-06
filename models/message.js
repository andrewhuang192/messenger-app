const mongoose = require('mongoose');
require('./conversation');

const messageSchema = require('./messageSchema');

module.exports = mongoose.model('Message', messageSchema);

