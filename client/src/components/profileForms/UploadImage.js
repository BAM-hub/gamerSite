import React, { useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../layout/avatarph.jpg';

import { uploadImage } from '../../actions/profile';

const UploadImage = ({
  profile: {image},
  auth: {email},
  uploadImage
}) => {
  const img = useRef();
  const [avatar, setAvatar] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const prev = e => {
    e.preventDefault();
    
    //upload image
    uploadImage(avatar, email, image);
    setRedirect(true);
  };

  if(redirect) {
    return <Redirect to='/profile' />
  }

  return (
    <div className='upload-image'>
      <div className="image-preview">
      {
        avatar ?
          <img src={URL.createObjectURL(avatar)} alt="fail" />
        : image !== '' ? 
          <img src={`http://localhost:5000/api/profile/avatar/${image}`} alt="" />
        : image === '' && <img src={logo} alt="placeholder" />
      }
      </div> 
      <form onSubmit={(e) => prev(e)}>
        <input 
          type="file" 
          accept='image/*'
          ref={img}
          onChange={(e)=> setAvatar(e.target.files[0])}
        />
        <button type='submit'>Upload</button>
      </form>
    </div>
  );
};

UploadImage.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {uploadImage}
)(UploadImage);