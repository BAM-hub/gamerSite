import React from 'react'

const ChatOverview = () => {
  return (
    <div className="right">

    <form action="" method="post" className="search-bar">
      <input type="text" placeholder="search chat" />
      <button type="submit">
        <i className="fas fa-paper-plane"></i>
      </button>
    </form>

    <h3>Chat Rooms</h3>

    <div className="chat-room">
      <div className="room-name">
        <p>BOTW</p>
      </div>

      <div className="last-message">
        <p>hey man i ju...</p>
      </div>
    </div>
  </div>
  );
};

export default ChatOverview;
