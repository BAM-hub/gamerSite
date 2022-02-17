import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { getUserByEmail, clearSearch, selectChat } from '../../actions/chat';
import { Redirect } from 'react-router-dom';

const ChatOverview = ({ 
  auth: { socket, user },
  getUserByEmail,
  chat,
  conversations,
  clearSearch,
  selectChat
}) => {
  const [email, setEmail] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [selectedChat, setSelectedChat] = useState('');


  const toChat = (id) => {
    setSelectedChat(id);
    clearSearch();
    selectChat(id);
    setRedirect(true);
  };

  const searchChat = (e) => {
    e.preventDefault();
    getUserByEmail(email);
    if(chat.search._id === null) return;
    setSelectedChat(user + ' ' + chat.search._id);
    selectChat(user + ' ' + chat.search._id);
    setRedirect(true);
  }

  if(redirect) return <Redirect to={`/chat/${selectedChat}`} />
 
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
        className="chat-room" key={convo.conversationId} 
        onClick={() => toChat(convo.conversationId)} 
      >
        <div className="room-name">
          <p>{convo.recipient}</p>
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
  selectChat: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  chat: state.chat,
  conversations: state.profile.conversations
});

export default connect(
  mapStateToProps,
  { getUserByEmail, clearSearch, selectChat }
)(ChatOverview);
