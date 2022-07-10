import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editGameList } from "../../actions/profile";

const EditList = ({
  profile: { gameList },
  auth: { email, token },
  editGameList,
}) => {
  const navigate = useNavigate();
  const [showForms, setShowForms] = useState(false);
  const [thisGameList, setThisGameList] = useState(gameList);
  const [game, setGame] = useState({
    image: null,
    name: "",
    score: 0,
    tags: "",
  });

  const { name, score, tags } = game;

  const gamePic = useRef(null);
  const [redirect, setRedirect] = useState(false);

  const addItem = () => {
    if (thisGameList.length !== 0) {
      let check = thisGameList.filter((game) => game.name === name);
      if (check.length !== 0) {
        setGame({
          name: "",
          score: "",
          tags: "",
          image: null,
        });
        return;
      }
    }

    if (name.trim() === "" || thisGameList.length === 5) return;

    setThisGameList((prevState) => [...prevState, game]);
    setGame({
      name: "",
      score: "",
      tags: "",
      image: null,
    });
    setShowForms(!showForms);
  };

  const del = (delName, i) => {
    let newState = thisGameList.filter((game) => game.name !== delName);
    setThisGameList(newState);
  };

  const submit = () => {
    editGameList(thisGameList, email, token);
    setRedirect(true);
  };

  if (redirect) {
    return navigate("/profile");
  }

  return (
    <div className='edit-game-list'>
      <input
        type='button'
        className='add-game'
        onClick={() => setShowForms(!showForms)}
        value='Add'
      />
      {showForms && (
        <div className='game-edit-inputs'>
          <input
            type='file'
            name='file'
            id='file'
            accept='image/*'
            ref={gamePic}
            onChange={(e) => setGame({ ...game, image: e.target.files[0] })}
          />
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setGame({ ...game, name: e.target.value })}
          />
          <input
            type='number'
            placeholder='Rating'
            value={score}
            onChange={(e) => setGame({ ...game, score: e.target.value })}
          />
          <input
            type='text'
            placeholder='Tags.. e.g: action, rpg'
            value={tags}
            onChange={(e) => setGame({ ...game, tags: e.target.value })}
          />
          <input type='button' value='Add' onClick={() => addItem()} />
        </div>
      )}
      {thisGameList.length !== 0 &&
        thisGameList.map((game, i) => (
          <div className='list-item' key={game.name}>
            <div className='game-pic'>
              {typeof game.image !== "string" ? (
                <img src={URL.createObjectURL(game.image)} alt='game' />
              ) : (
                <img
                  src={`http://localhost:5000/api/images/avatar/${game.image}`}
                  alt='gamepic'
                />
              )}
            </div>

            <div className='game-name'>
              <p>{game.name}</p>
            </div>
            <div className='personal-score'>
              <p>{game.score}</p>
            </div>
            <div className='game-name'>{game.tags}</div>
            <div className='delete' onClick={() => del(game.name, i)}>
              <i className='far fa-trash-alt'></i>
            </div>
          </div>
        ))}
      <input
        type='button'
        value='submit'
        className='submit-list'
        onClick={() => submit()}
      />
    </div>
  );
};

EditList.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  editGameList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { editGameList })(EditList);
