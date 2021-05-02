const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema(
	{
		name: { type: String, required: true },
		message: [messageSchema]
	},
	{
		timestamps: true,
	}
);

const messageSchema = new Schema(
    {
        message: {
            type: String, 
        },
        sender: {
            type: String,
        },
    }, {
    timestamps: true
});

module.exports = mongoose.model('Conversation', conversationSchema);
