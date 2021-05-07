const Schema = require('mongoose').Schema;

const messageSchema = new Schema(
	{
        conversation: { 
            type: Schema.Types.ObjectId, ref: 'Conversation' 
        },
        message: {
            type: String, 
        },
        sender: {
            type: String,
        },
        isOwner: {
            type: Boolean,
        },
	},
	{
		timestamps: true,
	}
);

module.exports = messageSchema;
