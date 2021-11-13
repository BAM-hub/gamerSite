import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const UserInfo = ({
  profile:{
    name,
    social,
    staredGame
  }
}) => {
  return (
    <div className="left">

    <div className="info">
      <div className="avatar">
        <img src='https://cdn.vox-cdn.com/thumbor/vbxRVJGeYs4rAJp_dlN2Swx3eKg=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/19921093/mgidarccontentnick.comc008fa9d_d.png' alt="avatar"/>
      </div>
      <div className="name">
        <p>{name}</p>
      </div>
    </div>
    
    <div className="social">
      <ul>
        <li>
          <i className="fab fa-facebook-square"></i><span>{social.facebook}</span>
        </li>
        <li>
            <i className="fab fa-instagram"></i><span>{social.instagram}</span>
        </li>
        <li>
            <i className="fab fa-whatsapp"></i><span>{social.whatsapp}</span>
        </li>
      </ul>
    </div>

    <div className="stared-game">
      <div className="game-pic">
        <img src='https://www.zelda.com/breath-of-the-wild/assets/icons/BOTW-Share_icon.jpg' alt="game" />
      </div>
      <div className="game-name">
        <p>{staredGame.name}</p>
      </div>
      <div className="score">
        <p>{staredGame.score}</p>
      </div>
      <div className="tags">
        {staredGame.tags.map((tag) => (
          <p>{tag}</p>
        ))}
      </div>
    </div>

  </div>
  );
};

UserInfo.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps
)(UserInfo);