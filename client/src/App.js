import './App.css';
import { 
  BrowserRouter as Router,
  Route,
  Switch
 } from 'react-router-dom';
import Chat from './components/chat/Chat';

//redux
import { Provider } from 'react-redux';
import store from './store';


const App = () => (
  <Provider store={store}>
    <Chat />
  </Provider>
);

export default App;
