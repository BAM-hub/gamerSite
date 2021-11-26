import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const EditList = ({ profile:{ gameList } }) => {
  const [showForms, setShowForms] = useState(false);
  const [thisGameList, setThisGameList] = useState(gameList);
  const [name, setName] = useState('');
  const [score, setScore] = useState(0);

  const addItem = () => {
    setThisGameList(
      prevState =>([...prevState, {
          name: name,
          score: score
      }])
    );
    setName('');
    setScore(0);
    setShowForms(!showForms);  
  };

  const del = (e, delName) => {
    let newState = thisGameList
      .filter(game => game.name !== delName);
    setThisGameList(
      newState
    );
  };

  return (
    <div className='edit-game-list'>
      <input 
        type='button'
        className="add-game"
        onClick={()=>setShowForms(!showForms)}
        value='Add'
      />
      {
      showForms && 
        <div className="game-edit-inputs">
            <input 
              type="file" 
              name="file" 
              id="file"
              accept='image/*' 
            />
          <input 
            type="text" 
            placeholder='Name' 
            value={name} 
            onChange={e => setName(e.target.value)}
          />
          <input 
            type="number" 
            placeholder='Rating'
            value={score}
            onChange={e => setScore(e.target.value)}
          />
          <input type="button" value='Add' onClick={() => addItem()} />
        </div>
      }
      {
        thisGameList.length !== 0 &&
        thisGameList.map((game) => (
          <div className="list-item" key={uuidv4()}>

            <div className="game-pic">
              <img src="https://www.zelda.com/breath-of-the-wild/assets/icons/BOTW-Share_icon.jpg" alt="game" />
            </div>
    
            <div className="game-name">
              <p>{game.name}</p>
            </div>
            <div className="pewsonal-score">
              <p>{game.score}</p>
            </div>
            <div className="delete" onClick={(e) => del(e, game.name) }>
              <i className="far fa-trash-alt"></i>
            </div>
          </div>
        ))
      }
      <input 
        type="button" 
        value='submit'
        className='submit-list'
      />
    </div>
  )
};

EditList.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
)(EditList);
