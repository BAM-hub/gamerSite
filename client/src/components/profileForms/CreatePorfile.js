import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
    PreferedConsole: ''
  });

  const {
    staredGame,
    social,
    PreferedConsole
  } = formData;

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
          placeholder='Stared Game'
        />
        <label htmlFor="score">Rate the game</label>
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
          placeholder='Genres'   
        />
        <input 
          type="text"
          name='facebook'
          value={social.facebook}
          onChange={e => setFormData({
            ...formData,
            social:{
              ...social,
              facebook: e.target.value
            }
          })}
          placeholder='facebook'
        />
        <input 
          type="text"
          name='instagram'
          value={social.instagram}
          onChange={e => setFormData({
            ...formData,
            social:{
              ...social,
              instagram: e.target.value
            }
          })}
          placeholder='instagram'
        />
        <input 
          type="text"
          name='whatsapp'
          value={social.whatsapp}
          onChange={e => setFormData({
            ...formData,
            social:{
              ...social,
              whatsapp: e.target.value
            }
          })}
          placeholder='whatsapp'
        />
        <input 
          type="text" 
          name='preferdconsole'
          value={PreferedConsole}
          onChange={e => setFormData({
            ...formData,
            PreferedConsole: e.target.value
          })}
          placeholder='Prefered Console'
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
