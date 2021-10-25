import React from 'react';

const UserInfo = () => {
  return (
    <div className="left">

    <div className="info">
      <div className="avatar">
        <img src='https://cdn.vox-cdn.com/thumbor/vbxRVJGeYs4rAJp_dlN2Swx3eKg=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/19921093/mgidarccontentnick.comc008fa9d_d.png' alt="avatar"/>
      </div>
      <div className="name">
        <p>BAM</p>
      </div>
    </div>
    
    <div className="social">
      <ul>
        <li>
          <i className="fab fa-facebook-square"></i><span>Facebook</span>
        </li>
        <li>
            <i className="fab fa-instagram"></i><span>Instagram</span>
        </li>
        <li>
            <i className="fab fa-whatsapp"></i><span>Whatsapp</span>
        </li>
      </ul>
    </div>

    <div className="stared-game">
      <div className="game-pic">
        <img src='https://www.zelda.com/breath-of-the-wild/assets/icons/BOTW-Share_icon.jpg' alt="game" />
      </div>
      <div className="game-name">
        <p>Assassins creed</p>
      </div>
      <div className="score">
        <p>10</p>
      </div>
      <div className="tags">
        <p>action RPG, open world </p>
      </div>
    </div>

  </div>
  );
};


export default UserInfo;