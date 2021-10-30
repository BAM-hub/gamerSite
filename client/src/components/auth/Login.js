import React, { useState } from 'react';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';


const Login = ({ setAlert, login }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = (e) => setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if(email === '' || password === '') {
      console.log('fail');
      return;
    }
    login({ email, password });
  };

  return (
    <form onSubmit={e => onSubmit(e)} id='form'>
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
  );
}

Login.prototypes = ({
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
});

export default connect(
  null,
  { setAlert, login }
)(Login);
