import React, { useState } from 'react';

const Register = () => {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;
  const onChange = e => setFormData({
    ...formData, [e.target.name]: e.target.value
  });

  const onSubmit = e => {
    e.preventDefault();
    if(!password || !password2) {
        return console.log('password is empty');
    }
    if(password !== password2) {
      console.log('password dont match');
    }
    else {
      console.log(formData);
    } 
  }

  return (
    <form onSubmit={e => onSubmit(e)}>
      <h4>Register</h4>
      <span>
        Name:
        <input 
          type='text'
          placeholder='Name'
          value={name}
          name='name'
          onChange={e => onChange(e)}
          required
          />
      </span>

      <span>
        Email:
        <input 
          type='text'
          placeholder='email'
          name='email'
          value={email}
          onChange={e => onChange(e)}
          required
          />
      </span>

      <span>
        Password:
        <input 
          type='password' 
          placeholder='Password'
          value={password}
          name='password'
          onChange={e => onChange(e)}
          required
          />
      </span>

      <span>
        Confirm Password:
        <input 
          type='password' 
          placeholder='Password'
          value={password2}
          name='password2'
          onChange={e => onChange(e)}
          required
          />
      </span>
      <button type='submit'>Login</button>
    </form>
  );
};

export default Register;
