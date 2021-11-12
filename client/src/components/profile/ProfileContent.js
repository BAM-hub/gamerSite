import React from 'react'

const ProfileContent = () => {
  return (
    <div class="mid">
    <div class="top-mid">
      <form action="" method="post" class="search-bar">
       <input type="text" placeholder="search other gamers" />
       <button type="submit">
         <i class="fas fa-paper-plane"></i>
        </button>
      </form>
      
   <span><p>Prefered Console: </p>PS4</span>
    </div>

    <div class="list">

    <div class="list-item">
        <div class="game-name">
          <p>BOTW</p>
        </div>

        <div class="personal-score">
          <p>10</p>
        </div>

      </div>
    </div>
  </div>
  );
}; 

export default ProfileContent;
