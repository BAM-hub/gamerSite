import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ProfileContent = ({
  profile: {
    PreferedConsole,
    gameList
  }
}) => {
  return (
    <div className="mid">
    <div className="top-mid">
      <form action="" method="post" className="search-bar">
       <input type="text" placeholder="search other gamers" />
       <button type="submit">
         <i className="fas fa-paper-plane"></i>
        </button>
      </form>
      
   <span><p>Prefered Console: </p>{PreferedConsole}</span>
    </div>

    <div className="list">
    {gameList.map((game) => (
      <div className="list-item">
          <div className="game-name">
            <p>{game.name}</p>
          </div>

          <div className="personal-score">
            <p>{game.score}</p>
          </div>

      </div>
    ))}

    </div>
  </div>
  );
}; 

ProfileContent.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile
});
 
export default connect(
  mapStateToProps
)(ProfileContent);
