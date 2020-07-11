import React from 'react';
import './App.css';
import axios from 'axios';
import './style.sass';
import { MainDashboard } from './Components/MainDashboard';
import {retrieveRelevantData} from './utils';

async function getData() {
    return  axios.get('http://localhost:5000/messages').then((r) => r.data);
}

function App() {
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
      getData().then((res) => {
          setMessages(Object.values(retrieveRelevantData(res)));
          //setMessages();
      });
  }, []);
console.log(messages);
  return (
    <>
        <MainDashboard messages={messages}/>
    </>
  );
}


export default App;
