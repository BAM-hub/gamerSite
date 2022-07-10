import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login, loggedIn } from "../../actions/auth";
import { getProfile } from "../../actions/profile";

const Login = ({ auth: { isAuthenticated }, profile, login, getProfile }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      console.log("fail");
      return;
    }
    await Promise.all([login({ email, password }), getProfile(email)]);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className='form-container'>
      <form onSubmit={(e) => onSubmit(e)} id='form' className='form'>
        <input
          type='email'
          value={email}
          onChange={(e) => onChange(e)}
          name='email'
          placeholder='Email'
        />
        <input
          type='password'
          value={password}
          onChange={(e) => onChange(e)}
          name='password'
          placeholder='Password'
          autoComplete='on'
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  loggedIn: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStatetoProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStatetoProps, { login, loggedIn, getProfile })(Login);
