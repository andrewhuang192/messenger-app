const Conversation = require('../../models/conversation');

module.exports = {
  index,
 
};

async function index(req, res) {
  const conversations = await Conversation.find({});
  // console.log('hitting')
  // console.log(conversations)
  res.json(conversations);
}
