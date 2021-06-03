const Conversation = require('../../models/conversation');

module.exports = {
  index,
 
};

async function index(req, res) {
  console.log('hitting')
  const conversations = await Conversation.find({});
  console.log(conversations)
  res.json(conversations);
}
