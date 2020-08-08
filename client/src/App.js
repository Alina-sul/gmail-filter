import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import './style.sass';
import MainDashboard from './Components';
import {retrieveRelevantData} from './utils';

async function getData() {
    return  axios.get('http://localhost:5000/messages').then((r) => r.data);
}

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
      getData().then((res) => {
          setMessages(Object.values(retrieveRelevantData(res)));
      });
  }, []);
  return (
    <>
        <MainDashboard messages={messages}/>
    </>
  );
}


export default App;
