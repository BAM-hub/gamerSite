import React from 'react'

const ChatOverview = () => {
  return (
    <div class="right">

    <form action="" method="post" class="search-bar">
      <input type="text" placeholder="search chat" />
      <button type="submit">
        <i class="fas fa-paper-plane"></i>
      </button>
    </form>

    <h3>Chat Rooms</h3>

    <div class="chat-room">
      <div class="room-name">
        <p>BOTW</p>
      </div>

      <div class="last-message">
        <p>hey man i ju...</p>
      </div>
    </div>
  </div>
  );
};

export default ChatOverview;
