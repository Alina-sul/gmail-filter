import React from 'react';
import './App.css';
import './style.sass';
import MainDashboard from './Components';
import {Provider} from "./Components/context";


function App() {
  return (
    <Provider>
        <MainDashboard/>
    </Provider>
  );
}


export default App;
