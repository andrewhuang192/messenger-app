const Message = require('../../models/message');
const Conversation = require('../../models/conversation');

module.exports = {
  index,
  create,
};

async function index(req, res) {
  const messages = await Message.find({});
  // re-sort based upon the sortOrder of the categories
  messages.sort((a, b) => a.timestamp > b.timstamp);
  res.json(messages);
}

async function create(req, res) {
  const newMessage = await Message.create(req.body);
  console.log(newMessage)
  res.status(201).json(newMessage);
}