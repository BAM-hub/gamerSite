import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { getUserByEmail } from '../../actions/chat';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const ChatOverview = ({ 
  auth: { socket, user },
  getUserByEmail,
  chat 
}) => {
  const [email, setEmail] = useState('');
  const [redirect, setRedirect] = useState(false);


  const toChat = () => {

  };

  const searchChat = (e) => {
    e.preventDefault();
    getUserByEmail(email);
    if(chat.search._id === null) return;
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

    <div className="chat-room">
      <div className="room-name" onClick={() => toChat()}>
        <p>BOTW</p>
      </div>

      <div className="last-message">
        <p>hey man i ju...</p>
      </div>
    </div>
  </div>
  );
};

ChatOverview.propTypes = {
  auth: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
  getUserByEmail: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  chat: state.chat
});

export default connect(
  mapStateToProps,
  { getUserByEmail }
)(ChatOverview);
