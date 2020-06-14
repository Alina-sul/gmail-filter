import React from 'react';
import './App.css';
import request from 'axios';
import {useQuery} from 'react-query';
import './style.sass'
import { Slider } from '@material-ui/core';

//import { useTable } from "react-table";

const getData = async () => {
    const {data} = await request.get(
        'http://localhost:5000/messages'
    );
    return data;
};
const decode = function(input) {
        // Replace non-url compatible chars with base64 standard chars
        input = input
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        // Pad out with standard base64 required padding characters
        var pad = input.length % 4;
        if(pad) {
          if(pad === 1) {
            throw new Error('InvalidLengthError: Input base64url string is the wrong length to determine padding');
          }
          input += new Array(5-pad).join('=');
        }

        return input;
    };


/* filter initial data - creating a new array suitable for further analysis */
const arrayForAnalysis = function(array) {

    const filterByName = (arr,key) => arr
        .filter(header => header.name === key ? header : null);

    return array.map( (message) => {
         return {
            id: message.id,
            sender: filterByName(message.payload.headers,'From')[0].value,
            date: new Date(filterByName(message.payload.headers,'Date')[0].value),
            subjectLine: filterByName(message.payload.headers,'Subject')[0].value,
            snippet: message.snippet,
            body: message.payload.parts !== undefined ?
                message.payload.parts.filter(
                    (x) => x.mimeType === 'text/html' ? x : null
                )[0].body.data : null

        };
    });
};




function App() {

  //const [messages, setMessages] = React.useState([]);
  const { status, data, error } = useQuery("data", getData, {
    initialData:[]
  });

    const [value, setValue] = React.useState([2, 10]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

  React.useEffect(() => {
      if (status === 'error') return console.log(error);
      if (status === 'success' && data.length > 0) {

          const messages = arrayForAnalysis(data);
          console.log((messages[0].date - messages[99].date)/8640000);

          };

  }, [status, data, error]);

  return (
    <>
        <div className="App">
            <h1>Gmail Filter</h1>
            <div id='top-section' className='top-section'>
                <div id='table'>
                    <h3>Time Range </h3>
                    <Slider
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                    />
                </div>
                <div id='distribution'>
                    <h3>Distribution </h3>
                </div>
            </div>
        </div>
    </>
  );
}

export default App;
