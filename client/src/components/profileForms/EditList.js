import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const EditList = ({ profile:{ gameList } }) => {
  const [showForms, setShowForms] = useState(false);
  const [thisGameList, setThisGameList] = useState(gameList);
  const [name, setName] = useState('');
  const [score, setScore] = useState(0);
  const gamePic = useRef(null);
  const [gamesPics, setGamesPics] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const addItem = () => {
    if(thisGameList.length !== 0) {
      let check = thisGameList.filter(game => game.name === name);
      if(check.length !== 0){
        setName('');
        setScore(0);
        return;
      } 
    }

    if(name.trim() === '' || thisGameList.length === 5)return;

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

  const del = (delName, i) => {
    let newState = thisGameList
      .filter(game => game.name !== delName);
    let newPics = gamesPics;
    newPics.splice(i, 1);
    setGamesPics(newPics);
    setThisGameList(
      newState
    );
  };

  const submit = () => {
    // wait for backend implementation
    setRedirect(true);
  }; 

  if(redirect) {
    return <Redirect to='/profile' />
  }

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
              ref={gamePic}
              onChange={ e => setGamesPics( prevState => [
                ...prevState,
                e.target.files[0]
              ])}
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
        thisGameList.map((game, i) => (
          <div className="list-item" key={game.name}>

            <div className="game-pic">
              <img src={URL.createObjectURL(gamesPics[i])} alt="game" />
            </div>
    
            <div className="game-name">
              <p>{game.name}</p>
            </div>
            <div className="personal-score">
              <p>{game.score}</p>
            </div>
            <div className="delete" onClick={() => del(game.name, i) }>
              <i className="far fa-trash-alt"></i>
            </div>
          </div>
        ))
      }
      <input 
        type="button" 
        value='submit'
        className='submit-list'
        onClick={() => submit()}
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
