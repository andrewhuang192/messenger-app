require('dotenv').config();
require('./config/database');

const User = require('./models/user');
const Conversation = require('./models/conversation');
const Message = require('./models/message');

(async function() {

  await User.deleteMany({});
  const users = await User.create([
    {name: 'john doe', email: 'johndoe+13@gmail.com', password: '123'},
    {name: 'user1', email: 'user1@gmail.com', password: '123'},
    {name: 'user2', email: 'user2@gmail.com', password: '123'},
    {name: 'user3', email: 'user3@gmail.com', password: '123'},
    {name: 'user4', email: 'user4@gmail.com', password: '123'},
]);    

  await Conversation.deleteMany({});
  const conversations = await Conversation.create([
    {user1: users[0], user2: users[1]},
    {user1: users[0], user2: users[2]},
    {user1: users[0], user2: users[3]},
    {user1: users[0], user2: users[4]},
    {user1: users[1], user2: users[0]},
    {user1: users[1], user2: users[2]},
    {user1: users[1], user2: users[3]},
    {user1: users[1], user2: users[4]},
 
  ]);

  await Message.deleteMany({});
  const messages = await Message.create([
    {conversation: conversations[0], message: 'hi, this is a test for convo with user 1', sender: 'john doe', isOwner: true },
    {conversation: conversations[1], message: 'hi, this is a test for convo with user 2', sender: 'john doe', isOwner: true },
    {conversation: conversations[2], message: 'hi, this is a test for convo with user 3', sender: 'john doe', isOwner: true },
    {conversation: conversations[3], message: 'hi, this is a test for convo with user 4', sender: 'john doe', isOwner: true },
    {conversation: conversations[4], message: 'hi, this is a test for convo with john doe', sender: 'user1', isOwner: true },
    {conversation: conversations[5], message: 'hi, this is a test for convo with user 2', sender: 'user1', isOwner: true },
    {conversation: conversations[6], message: 'hi, this is a test for convo with user 3', sender: 'user1', isOwner: true },
    {conversation: conversations[7], message: 'hi, this is a test for convo with user 4', sender: 'user1', isOwner: true },
    {conversation: conversations[4], message: 'hi, this is a test for convo with john doe', sender: 'john doe', isOwner: false },
    {conversation: conversations[5], message: 'hi, this is a test for convo with user 2', sender: 'user 2', isOwner: false },
    {conversation: conversations[6], message: 'hi, this is a test for convo with user 3', sender: 'user 3', isOwner: false },
    {conversation: conversations[7], message: 'hi, this is a test for convo with user 4', sender: 'user 4', isOwner: false },
  ]);

  console.log(users)
  console.log(conversations)

  process.exit();

})();