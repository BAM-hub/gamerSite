import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGGEDIN,
} from "./types";

// register user
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post("/api/users", body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          token: res.data.token,
          email,
          name,
        },
      });
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: REGISTER_FAIL,
        payload: errors,
      });
    }
  };

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post("api/auth", body, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      localStorage.setItem("x-auth-token", res.data.token);
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

export const loggedIn = () => async (dispatch) => {
  let token = localStorage.getItem("token");
  const config = {
    headers: {
      "x-auth-token": token,
    },
  };

  try {
    let res = await axios.get("api/auth", config);
    dispatch({
      type: LOGGEDIN,
      payload: res.data,
    });
    console.log(res.data);
    return true;
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    return false;
  }
};
