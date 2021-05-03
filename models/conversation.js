const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('./user');

const conversationSchema = new Schema(
	{
		user1: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		user2: { type: Schema.Types.ObjectId, ref: 'User'},
		// messages: [messageSchema]
	},
	{
		timestamps: true,
	}
);



module.exports = mongoose.model('Conversation', conversationSchema);
