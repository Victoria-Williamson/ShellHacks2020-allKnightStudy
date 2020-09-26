import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Breadcrumb} from 'react-bootstrap/Breadcrumb';
function App() {
  return (
    <div className="App">
      <div id="tabBar">
        <div id="websiteSymbol"> *insert symbol* </div>
        <div className="tabButton" id="tab1" href="#"> Tab 1</div>
        <div className="tabButton" id="tab2" href="#"> Tab 2</div>
        <div className="tabButton" id="tab3" href="#"> Tab 3</div>
        <div className="tabButton" id="tab4" href="#"> Tab 4</div>
        <div className="tabButton" id="tab5" href="#"> Tab 5</div>
      </div>
      <div className="auth" id="authentication">
        <div id="toggleLogin">
          Log In
        </div>
        <div className="auth" id="signUp">
          Sign Up
        </div>
      </div>
      Nothing Here yet, but this can be the main page 
    </div>
  );
}

export default App;
