import React, { useEffect, useState } from 'react';
import { setAlert } from '../../actions/alert';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login, loggedIn } from '../../actions/auth';



const Login = ({ 
  auth:{ isAuthenticated },
  setAlert,
  login,
  loggedIn
 }) => {

  useEffect(()=>{
    loggedIn()
  },[loggedIn]);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = (e) => setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if(email === '' || password === '') {
      console.log('fail');
      return;
    };

    await login({ email, password });
  };

  if(isAuthenticated) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className="form-container">
      <form onSubmit={e => onSubmit(e)} id='form' className='form'>
        <input type="email"
        value={email}
        onChange={e => onChange(e)} 
        name='email'
        placeholder='Email'
        />
        <input type="password"
        value={password}
        onChange={e => onChange(e)}
        name='password'
        placeholder='Password'
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );


}

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  loggedIn: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStatetoProps = state => ({
 auth: state.auth
});

export default connect(
  mapStatetoProps,
  { setAlert, login, loggedIn }
)(Login);
