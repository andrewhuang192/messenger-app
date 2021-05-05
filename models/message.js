const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('./user');

const messageSchema = new Schema(
    {
        conversation: { type: String},
        message: {
            type: String, 
        },
        sender: {
            type: String,
        },
        isOwner: {
            type: Boolean,
        },
    }, {
    timestamps: true
});
module.exports = mongoose.model('Message', messageSchema);
