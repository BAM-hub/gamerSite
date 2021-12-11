import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../layout/avatarph.jpg';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';


const UserInfo = ({
  profile:{
    name,
    social,
    staredGame,
    image
  },
}) => {

  const [uploadImage, setuploadImage] = useState(false);
  if(uploadImage) {
    return <Redirect to='/upload-image' />
  }

  return (
    <div className="left">

    <div className="info">
      <div className="avatar" onClick={
        ()=> setuploadImage(true)}>
      {
        image === '' ? 
        <img src={logo} alt='avatar' /> 
        :
        <img src={`http://localhost:5000/api/profile/avatar/${image}`} alt="avatar"/>
      }

      </div>
      <div className="name">
        <p>{name}</p>
      </div>
    </div>
    
    {social === undefined ?
    <div className="social">
      <ul>
        <li>
          <i className="fas fa-poll-h"></i><span>Nothing to show here.</span>
        </li>
      </ul> 
    </div>
    :
    <div className="social">
      <ul>
        {
          social.facebook !== '' && 
        <li>
          <i className="fab fa-facebook-square"></i><span>{social.facebook}</span>
        </li>
        }
        {
        social.instagram !== ''&&
        <li>
            <i className="fab fa-instagram"></i><span>{social.instagram}</span>
        </li>
        }
        {
          social.whatsapp !== '' &&
        
        <li>
            <i className="fab fa-whatsapp"></i><span>{social.whatsapp}</span>
        </li>
        }
        {
          social.facebook === '' && social.instagram === ''&& social.whatsapp === '' &&
          <li>
            <i className="fas fa-poll-h"></i><span>Nothing to show here.</span>
          </li>
        }
      </ul>
    </div>
    }

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
        {staredGame.tags}
      </div>
    </div>

  </div>
  );
};

UserInfo.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps
)(UserInfo);