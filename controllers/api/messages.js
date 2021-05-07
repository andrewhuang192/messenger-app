const Message = require('../../models/message');
const Conversation = require('../../models/conversation');

module.exports = {
  index,
  create,
  delete: deleteOne,
  update,
};

async function index(req, res) {
  // const messages = await Message.find({}).sort('message').populate('conversation').exec();
  const messages = await Message.find({});
  // re-sort based upon the sortOrder of the categories
  messages.sort((a, b) => a.timestamp > b.timestamp);
  res.json(messages);
}

async function create(req, res) {
  const newMessage = await Message.create(req.body);
  console.log(newMessage)
  res.status(201).json(newMessage);
}

async function deleteOne(req, res) {
  const deletedMessage = await Message.findByIdAndRemove(req.params.id);
  res.status(200).json(deletedMessage);
}

async function update(req, res) {
	const updatedMessage = await Message.findByIdAndUpdate(req.params.id, req.body, {new: true});
	console.log('controller hitting')
	res.status(200).json(updatedMessage);
  }