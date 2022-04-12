import './App.css';
import Profile from './components/profile/Profile';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from '././components/layout/Alert';
import Navbar from '././components/layout/Navbar';
import CreatePorfile from './components/profileForms/CreatePorfile';
import EditList from './components/profileForms/EditList';
import UploadImage from './components/profileForms/UploadImage';
import PrivatRoute from './PrivateRoute';
import { 
  BrowserRouter as Router,
  Route,
  Switch
 } from 'react-router-dom';


//redux
import { Provider } from 'react-redux';
import store from './store';
import ChatSocket from './components/chat/ChatSocket';


const App = () => (
    <Provider store={store}>        
      <Router>    
        <Navbar />
        <Alert />
        <div className="main">        
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/' component={Login} />
            <PrivatRoute exact path='/chat' component={ChatSocket} />
            <PrivatRoute exact path='/profile' component={Profile} />
            <PrivatRoute exact path='/create-profile' component={CreatePorfile} />
            <PrivatRoute exact path='/edit-list' component={EditList} />
            <PrivatRoute exact path='/upload-image' component={UploadImage} />
          </Switch>
        </div>
      </Router>
    </Provider>
);

export default App;
