import moment from 'moment';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useState } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { selectChat } from '../../actions/chat';
import ChatOverView from '../profile/ChatOverview';

const Chat = ({
  auth:{ name, user, socket, email },
  chat: { selectedChat },
  selectChat,
  conversations
}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [recipient, setRecipient] = useState('');

  //get room name
  useEffect(() => {
    socket.emit('join', user);
    return () => {
      //socket.close();
      socket.off('join');
      socket.off('connection');
      socket.close();
    }
  }, [user, socket, email]);

  useEffect(() => {
    selectedChat._id.split(' ').forEach(id =>{
      if(id !== user) return setRecipient(id);
    });
    
  }, [recipient, selectedChat._id, user]);

  const send = () => {
    const msg = { 
      message,
      name,
      id: uuidv4(), 
      reciver: recipient,
      time: moment()
    };
    console.log(msg);
    setMessages(
      prevState => [...prevState, msg]
    );
    socket.emit('send_message', msg);
    setMessage('');
  }
  useEffect(() => {
    socket.on('recive_message', (msg) => {
      setMessages(
        prevState => [...prevState, msg] 
      );
    });
    return () => {
      socket.off('recive_message');
    }
  });

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
  selectChat: PropTypes.func.isRequired,
  conversations: PropTypes.array.isRequired,
};


export default connect(
  mapStatetoProps,
  { selectChat }
)(Chat);

const Messages = ({ messages, user }) => (
  <div className="message-container">
    {messages.map(msg => (
      <div 
        className={msg.reciver === user ? 'message align-left': 'message align-right'}
        key={msg.id}>
        <p className="sender">{msg.name}</p>
        <div className="date">
          <Moment
            className='moment'  
            format='MM/DD HH:MM'>
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
