import React, {
  useEffect,
  useRef,
  useState } from 'react';
import  io  from "socket.io-client";
import './App.css';

const socket = io('http://localhost:8000');

const App = () => {
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
    <div className="App">
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
    </div>
  );
}

export default App;
