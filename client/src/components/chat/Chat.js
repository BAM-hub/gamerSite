import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const Chat = ({auth:{ name, user, socket, email }}) => {
  const [roomName, setRoomName] = useState('');
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
  socket.on('roomName', room => setRoomName(room));

  //logic
  const send = (e) => {
    e.preventDefault();
    const msg = { message, name, id: uuidv4(), reciver: recipient };
    socket.emit('send_message', msg);
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
      <div className="room-name">{roomName}</div>
      <div className="message-send">
        <input 
          type="text" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={(e) => send(e)}>send</button>
      </div>

      <div className="messages">
        {
          messages.map(msg => (
            <div className="message">{msg.message}</div>
          ))
        }
      </div>
    </>
  );
};

const mapStatetoProps = state => ({
  auth: state.auth
});

Chat.propTypes = {
  auth: PropTypes.object,
};


export default connect(
  mapStatetoProps
)(Chat);
