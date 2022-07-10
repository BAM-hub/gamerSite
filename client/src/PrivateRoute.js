import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  children,
  auth: { isAuthenticated, socket, user },
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    socket.connect();
    if (user) socket.emit("join", user);

    return () => {
      socket.off("join");
      socket.off("connection");
      socket.close();
      socket.disconnect();
    };
  }, [socket, user]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return children;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
