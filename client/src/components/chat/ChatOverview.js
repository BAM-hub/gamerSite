import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { 
  getUserByEmail, 
  clearSearch, 
  selectChat, 
  createChat
} from '../../actions/chat';
import { Redirect, useLocation } from 'react-router-dom';

const ChatOverview = ({ 
  auth: {user, email, socket, name},
  getUserByEmail,
  chat: { search, selectedChat },
  conversations,
  clearSearch,
  selectChat,
  createChat
}) => {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [localSelectedChat, setLocalSelectedChat] = useState(selectedChat._id);
  const location = useLocation();

  const toChat = (id) => {
    setLocalSelectedChat(id);
    clearSearch();
    selectChat(id);
    if(location.pathname === '/chat') return;
    setRedirect(true);
  };

  const searchChat = (e) => {
    e.preventDefault();
    getUserByEmail(recipientEmail);
    if(search._id === null) return;
    setLocalSelectedChat(user + ' ' + search._id);
    selectChat(user + ' ' + search._id);
    createChat(email, recipientEmail);
    socket?.emit('new-chat', ( 
      { recipient: search._id,
        convoId: user + ' ' + search._id,
        myEmail: email,
        myName: name
       } 
      ));
    if(location.pathname  === '/chat') return;
    setRedirect(true);
  }

  if(redirect) return <Redirect to='/chat' />
 
  return (
    <div className="right">

    <form className="search-bar">
      <input 
        type="text" 
        placeholder="search chat" 
        value={recipientEmail}
        onChange={e => setRecipientEmail(e.target.value)}
      />
      <button type="submit" onClick={(e) => searchChat(e)}>
        <i className="fas fa-paper-plane"></i>
      </button>
    </form>

    <h3>Chat Rooms</h3>
    <div className="chat-container">
      {conversations.map(convo => (
      <div 
        className={localSelectedChat === convo.conversationId ? 'chat-room green': 'chat-room'} 
        key={convo.conversationId} 
        onClick={() => toChat(convo.conversationId)} 
      >
        <div className="room-name">
          <p>{convo.recipientName}</p>
        </div>

        <div className="last-message">
          {convo.newMessage.count > 0 &&
            <p>{convo.newMessage.count}</p>
          }
          <p>{convo.newMessage.message.message}</p>
        </div>
      </div>
      ))}
    </div>

  </div>
  );
};

ChatOverview.propTypes = {
  auth: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
  conversations: PropTypes.array.isRequired,
  getUserByEmail: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
  selectChat: PropTypes.func.isRequired,
  createChat: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  chat: state.chat,
  conversations: state.profile.conversations
});

export default connect(
  mapStateToProps,
  {
    getUserByEmail,
    clearSearch,
    selectChat,
    createChat
  }
)(ChatOverview);
