import e from 'cors';
import React, { useEffect } from 'react';
import  io  from "socket.io-client";
import './App.css';
const socket = io('http://localhost:8000');

function App() {

  useEffect(() => {
    socket.on('connection', () =>{
      console.log('connected');
    });
  }, []);

  const sendMessage = e =>{
    e.preventDefault();
    
  }

  return (
    <div className="App">
      <form onSubmit={e => sendMessage(e)} method="post">
        <input type="text" />
        <button type="submit">send</button>
      </form>
    </div>
  );
}

export default App;
