import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { 
  getUserByEmail, 
  clearSearch, 
  selectChat, 
  createChat
} from '../../actions/chat';
import { Redirect } from 'react-router-dom';

const ChatOverview = ({ 
  auth,
  getUserByEmail,
  chat: { search, selectedChat },
  conversations,
  clearSearch,
  selectChat,
  createChat
}) => {
  const [email, setEmail] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [localSelectedChat, setLocalSelectedChat] = useState(selectedChat._id);


  const toChat = (id) => {
    setLocalSelectedChat(id);
    clearSearch();
    selectChat(id);
    if(window.location.href  === 'http://localhost:3000/chat') return;
    setRedirect(true);
  };

  const searchChat = (e) => {
    e.preventDefault();
    getUserByEmail(email);
    if(search._id === null) return;
    setLocalSelectedChat(auth.user + ' ' + search._id);
    selectChat(auth.user + ' ' + search._id);
    createChat(auth.email, email);
    if(window.location.href  === 'http://localhost:3000/chat') return;
    setRedirect(true);
  }

  if(redirect) return <Redirect to='/chat' />
 
  return (
    <div className="right">

    <form className="search-bar">
      <input 
        type="text" 
        placeholder="search chat" 
        value={email}
        onChange={e => setEmail(e.target.value)}
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
          <p>hey man i ju...</p>
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
