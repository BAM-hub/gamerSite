import PropTypes from 'prop-types';
import React, {
    useEffect,
    useRef,
    useState } from 'react';
import  io  from "socket.io-client";

const socket = io('http://localhost:8000');

const Chat = () => {
  const [roomName, setRoomName] = useState();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const txt = useRef();

  useEffect(() => {
    socket.emit('connection');
    socket.emit('join');
    socket.on('roomName', (room) => {
      setRoomName(room); 
    });
  }, []);

  function sendMessage() {
   socket.emit('message', message);
   setMessages([...messages, message]);
   console.log(`${message} sent`);
  };

  socket.on('message', (message) =>{
    setMessages([...messages, message]);
  });
  return (
  <>
    {roomName}
    <div>
    <input
      ref={txt}
      value={message}
      onChange={e => setMessage(e.target.value)}
    />
    <button onClick={e => sendMessage()}>send</button>
    </div>

    {messages.map(msg =>(
      <div>{msg}</div>
    ))}
  </>
  );
};

Chat.propTypes = {};

export default Chat;
