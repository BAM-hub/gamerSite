import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { IMAGE_PREFIX } from "../../actions/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faEdit } from "@fortawesome/free-solid-svg-icons";

const ProfileContent = ({ profile: { PreferedConsole, gameList } }) => {
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (edit) {
      navigate("/edit-list");
    }
  }, [edit, navigate]);
  return (
    <div className='mid'>
      <div className='top-mid'>
        <span>
          <p>Prefered Console: </p>
          {PreferedConsole}
        </span>
      </div>

      <div className='list'>
        {gameList.length === 0 ? (
          <div className='list-item'>
            <FontAwesomeIcon icon={faList} />
            <span>List is empty</span>
          </div>
        ) : (
          gameList.map((game) => (
            <div key={game.name} className='list-item'>
              <div className='game-pic'>
                <img src={`${IMAGE_PREFIX}/avatar/${game.image}`} alt='' />
              </div>

              <div className='game-name'>
                <p>{game.name}</p>
              </div>

              <div className='personal-score'>
                <p>{game.score}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <div className='edit-list' onClick={() => setEdit(true)}>
        <FontAwesomeIcon icon={faEdit} />
      </div>
    </div>
  );
};

ProfileContent.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(ProfileContent);
