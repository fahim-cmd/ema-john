import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';


function App() {
  
  
  return (
    
      <Router>
        <Navbar></Navbar>
        
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/users">

            </Route>
            <Route path="/">

            </Route>
          </Switch>
        
      </Router>
    
  );
}

export default App;
