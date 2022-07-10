import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import logo from "../layout/avatarph.jpg";
import { useNavigate } from "react-router-dom";
import { IMAGE_PREFIX } from "../../actions/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagramSquare,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faPollH } from "@fortawesome/free-solid-svg-icons";

const UserInfo = ({ name, profile: { social, staredGame, image } }) => {
  const [uploadImage, setuploadImage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (uploadImage) {
      return navigate("/upload-image");
    }
  }, [uploadImage, navigate]);

  return (
    <div className='left'>
      <div className='info'>
        <div className='avatar' onClick={() => setuploadImage(true)}>
          {image === "" ? (
            <img src={logo} alt='avatar' />
          ) : (
            <img src={`${IMAGE_PREFIX}/avatar/${image}`} alt='avatar' />
          )}
        </div>
        <div className='name'>
          <p>{name}</p>
        </div>
      </div>

      {social === undefined ? (
        <div className='social'>
          <ul>
            <li>
              <FontAwesomeIcon icon={faPollH} />
              <span>Nothing to show here.</span>
            </li>
          </ul>
        </div>
      ) : (
        <div className='social'>
          <ul>
            {social.facebook !== "" && (
              <li>
                <FontAwesomeIcon icon={faFacebookSquare} />
                <span>{social.facebook}</span>
              </li>
            )}
            {social.instagram !== "" && (
              <li>
                <FontAwesomeIcon icon={faInstagramSquare} />
                <span>{social.instagram}</span>
              </li>
            )}
            {social.whatsapp !== "" && (
              <li>
                <FontAwesomeIcon icon={faWhatsapp} />
                <span>{social.whatsapp}</span>
              </li>
            )}
            {social.facebook === "" &&
              social.instagram === "" &&
              social.whatsapp === "" && (
                <li>
                  <FontAwesomeIcon icon={faPollH} />
                  <span>Nothing to show here.</span>
                </li>
              )}
          </ul>
        </div>
      )}

      <div className='stared-game'>
        <div className='game-pic'>
          <img
            src='https://www.zelda.com/breath-of-the-wild/assets/icons/BOTW-Share_icon.jpg'
            alt='game'
          />
        </div>
        <div className='game-name'>
          <p>{staredGame.name}</p>
        </div>
        <div className='score'>
          <p>{staredGame.score}</p>
        </div>
        <div className='tags'>{staredGame.tags}</div>
      </div>
    </div>
  );
};

UserInfo.propTypes = {
  profile: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  name: state.auth.name,
});

export default connect(mapStateToProps)(UserInfo);
