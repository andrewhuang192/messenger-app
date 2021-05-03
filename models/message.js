const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('./user');

const messageSchema = new Schema(
    {
        conversation: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true },
        message: {
            type: String, 
        },
        sender: {
            type: String,
        },
    }, {
    timestamps: true
});
module.exports = mongoose.model('Message', messageSchema);
