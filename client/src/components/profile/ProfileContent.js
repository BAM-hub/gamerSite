import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { Redirect } from 'react-router-dom';

const ProfileContent = ({
  profile: {
    PreferedConsole,
    gameList
  }
}) => {
  const [edit, setEdit] = useState(false);
  if(edit) {
    return <Redirect to='/edit-list' />;
  };
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
    { gameList.length === 0 ? (<div className='list-item'>
      <i className="fas fa-th-list"></i><span>List is empty</span>
    </div>
    ) :
    gameList.map((game) => (
      <div key={uuidv4()} className="list-item">
          <div className="game-name">
            <p>{game.name}</p>
          </div>

          <div className="personal-score">
            <p>{game.score}</p>
          </div>

      </div>
    ))}

    </div>
    <div className="edit-list" onClick={()=> setEdit(!edit)}>
      <i className="far fa-edit"></i>
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
