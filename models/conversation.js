const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('./user');

const conversationSchema = new Schema(
	{
		name: { 
			type: String, 
			default: function(){
				return "New Conversation!";
			},
		},
		user1: { type: Schema.Types.ObjectId, ref: 'User' },
		user2: { type: Schema.Types.ObjectId, ref: 'User'},
		// messages: [messageSchema]
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Conversation', conversationSchema);
