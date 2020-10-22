import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch} from "react-router-dom";
import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';
function App() {
  return (
    <div>
      <BrowserRouter>
      <Switch>
        <Route exact path = {'/'} component = {Login}></Route>
        <Route exact path = {'/signup'} component = {Signup}></Route>
        <Route exact path = {'/dashboard'} component = {Dashboard}></Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
