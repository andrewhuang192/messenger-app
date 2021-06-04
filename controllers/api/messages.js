const Message = require('../../models/message');
const Conversation = require('../../models/conversation');

module.exports = {
  index,
  create,
  delete: deleteOne,
  update,
};

async function index(req, res) {
  const messages = await Message.find({});

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
	console.log('controller hitting')
  console.log(req)
  console.log(req.body)
	const updatedMessage = await Message.findByIdAndUpdate(req.params.id, req.body, {new: true});
	res.status(200).json(updatedMessage);
  }