import moment from 'moment';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { selectChat, findChat, newMessage } from '../../actions/chat';
import ChatOverView from './ChatOverview';

const Chat = ({
  auth:{ name, user, socket },
  chat: { selectedChat, chats },
  conversations,
  newMessage
}) => {
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');
  const [messages, setMessages] = useState([]);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const localChat = chats.filter(chat => chat.conversationId === selectedChat._id);
    if(localChat.length > 0) {
      setMessages(localChat[0].conversation);
      setUsers(localChat[0].users);
    }
  }, [chats, selectedChat._id]);

  // determining the sender and recipient info
  useEffect(() => {
    selectedChat._id.split(' ').forEach(id => {
      if(id !== user) return setRecipient(id);
    });
    conversations.forEach(convo => {
      if(convo.reciver === selectChat._id)
        return setRecipientEmail(convo.recipientEmail);
    });
  }, [chats, conversations, selectedChat._id, user]);


  const send = () => {
    const msg = { 
      message,
      sender: name,
      chatId: selectedChat._id,
      recipientEmail:  recipientEmail,
      id: uuidv4(), 
      reciver: recipient,
      time: moment(),
      users: users
    };
    newMessage(msg.chatId, selectedChat._id, msg, chats);
    socket.emit('send_message', msg);
    setMessage('');
  };

  return (
    <>
      <ChatOverView />
      <div className="chat-form-container">
        <Messages 
          messages={messages}
          user={user} 
        />
        <MessageForm
          send={send}
          message={message}
          setMessage={setMessage}
        />
      </div>
    </>
  );
};

const mapStatetoProps = state => ({
  auth: state.auth,
  chat: state.chat,
  conversations: state.profile.conversations
});

Chat.propTypes = {
  auth: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
  conversations: PropTypes.array.isRequired,
  findChat: PropTypes.func.isRequired,
  newMessage: PropTypes.func.isRequired
};


export default connect(
  mapStatetoProps,
  { selectChat, findChat, newMessage }
)(Chat);

const Messages = ({ messages, user }) => (
  <div className="message-container">
    {messages?.map(msg => (
      <div 
        className={msg.reciver === user ? 'message align-left': 'message align-right'}
        key={msg.id}>
        <p className="sender">{msg.sender}</p>
        <div className="date">
          <Moment
            className='moment'  
            format='MM/DD hh:mm'>
            {msg.time}
          </Moment>
        </div>
        <div className="content">
          {msg.message}
        </div>
      </div>
    ))}
  </div>
);

const MessageForm = ({ send, message, setMessage }) => (
  <div className='message-form-container'>
    <input 
      type="text"
      className='message-text'
      placeholder='Enter Message'
      value={message}
      onChange={e => setMessage(e.target.value)}
    />
    <button 
      className='send-btn'
      onClick={() => send()}
    >
      <i className="far fa-paper-plane"></i>
    </button>
  </div>
);
