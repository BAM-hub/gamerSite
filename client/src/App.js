import "./App.css";
import Profile from "./components/profile/Profile";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "././components/layout/Alert";
import Navbar from "././components/layout/Navbar";
import CreatePorfile from "./components/profileForms/CreatePorfile";
import EditList from "./components/profileForms/EditList";
import UploadImage from "./components/profileForms/UploadImage";
import PrivatRoute from "./PrivateRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//redux
import { Provider } from "react-redux";
import store from "./store";
import ChatSocket from "./components/chat/ChatSocket";

const App = () => (
  <Provider store={store}>
    <Router>
      <Navbar />
      <Alert />
      <div className='main'>
        <Routes>
          <Route path='/' element={<Login />} />

          <Route path='/register' element={<Register />} />
          <Route
            path='/chat'
            element={
              <PrivatRoute>
                <ChatSocket />
              </PrivatRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <PrivatRoute>
                <Profile />
              </PrivatRoute>
            }
          />
          <Route
            path='/create-profile'
            element={
              <PrivatRoute>
                <CreatePorfile />
              </PrivatRoute>
            }
          />
          <Route
            path='/edit-list'
            element={
              <PrivatRoute>
                <EditList />
              </PrivatRoute>
            }
          />
          <Route
            path='/upload-image'
            element={
              <PrivatRoute>
                <UploadImage />
              </PrivatRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  </Provider>
);

export default App;
