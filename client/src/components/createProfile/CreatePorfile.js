import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { createProfile, uploadImage } from '../../actions/profile';


const CreatePorfile = ({auth:{email, token}, createProfile, uploadImage}) => {
  
  const [formData, setFormData] = useState({
    email: email,
    image: '',
    staredGame: {
      name: '',
      score: 0,
      tags: ''
    },
    social: {
      facebook: '',
      instagram: '',
      whatsapp: ''
    },
    PreferedConsole: '',
    gameList: [{
      name: '',
      score: 0
    }],
  });

  const {
    staredGame
  } = formData;

  const onChange = (e) => setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });

  function onSubmit (e) {
    e.preventDefault();
    createProfile(formData, token);
  };
  return (
    <div>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <input 
          type="text"
          name='staredGame'
          value={staredGame.name}
          onChange={e => setFormData({...formData,
            staredGame:{
              ...staredGame,
              name: e.target.value
            } })}
        />
        <input
          type="number"
          name='score'
          value={staredGame.score}
          onChange={e => setFormData({...formData,
            staredGame:{
              ...staredGame,
              score: e.target.value
            } })}
        />
        <input
          type="text"
          name='tags'
          value={staredGame.tags}
          onChange={e => setFormData({...formData,
            staredGame:{
              ...staredGame,
              tags: e.target.value
            } })}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

CreatePorfile.propTypes ={
  createProfile: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { createProfile, uploadImage }
)(CreatePorfile);
