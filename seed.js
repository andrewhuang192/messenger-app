require('dotenv').config();
require('./config/database');

const User = require('./models/user');
const Conversation = require('./models/conversation');
const Message = require('./models/message');

(async function() {

  await User.deleteMany({});
  const users = await User.create([
    {name: 'john doe', email: 'johndoe+13@gmail.com', password: '123'},
    {name: 'andrew', email: 'andrew@gmail.com', password: '123'},
    {name: 'testuser', email: 'testuser@gmail.com', password: '123'},
]);    

  await Conversation.deleteMany({});
  const conversations = await Conversation.create([
    {user1: users[0], user2: users[1]},
    {user1: users[0], user2: users[2]},
    {user1: users[1], user2: users[2]},
  ]);

  await Message.deleteMany({});
  const messages = await Message.create([
    {conversation: conversations[0], message: 'hi, this is a test for convo 1', sender: 'john doe', isOwner: true },
    {conversation: conversations[1], message: 'hi, this is a test for convo 2', sender: 'andrew', isOwner: true },
    {conversation: conversations[2], message: 'hi, this is a test for convo 3', sender: 'testuser', isOwner: true },
  ]);

  console.log(users)
  console.log(conversations)

  process.exit();

})();