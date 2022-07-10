import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({
  children,
  auth: { isAuthenticated, socket, user },
}) => {
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

  if (!isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  return children;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
