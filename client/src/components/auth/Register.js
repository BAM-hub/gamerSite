import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register, login } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, login, auth: { isAuthenticated } }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;
  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!password || !password2) {
      return setAlert("password is empty", "danger");
    }
    if (password !== password2) {
      setAlert("password dont match", "danger");
    } else {
      await register({ name, email, password });
      await login({ email, password });
    }
  };

  if (isAuthenticated) {
    return <Navigate to='/create-profile' />;
  }

  return (
    <div className='form-container'>
      <form onSubmit={(e) => onSubmit(e)} id='form' className='form'>
        <input
          type='text'
          placeholder='Name'
          value={name}
          name='name'
          onChange={(e) => onChange(e)}
          required
        />

        <input
          type='text'
          placeholder='email'
          name='email'
          value={email}
          onChange={(e) => onChange(e)}
          required
        />

        <input
          type='password'
          placeholder='Password'
          value={password}
          name='password'
          onChange={(e) => onChange(e)}
          autoComplete='on'
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={password2}
          name='password2'
          onChange={(e) => onChange(e)}
          autoComplete='on'
          required
        />
        <button type='submit'>Register</button>
      </form>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStatetoProps, { setAlert, register, login })(
  Register
);
