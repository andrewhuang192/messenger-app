const Message = require('../../models/message');
const Conversation = require('../../models/conversation');

module.exports = {
  index,
  
};

async function index(req, res) {
  const messages = await Message.find({});
  // re-sort based upon the sortOrder of the categories
  messages.sort((a, b) => a.timestamp > b.timstamp);
  res.json(messages);
}