import React from 'react';
import './App.css';
import request from 'axios';
import {useQuery} from 'react-query';
import { useTable } from "react-table";


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


const getData = async () => {
  const {data} = await request.get(
      'http://localhost:5000/messages'
  );
  return data;
};

function App() {

  //const [messages, setMessages] = React.useState([]);
  const { status, data, error } = useQuery("data", getData, {
    initialData:[]
  });

  React.useEffect(() => {
      if (status === 'error') return console.log(error);
      if (status === 'success' && data.length > 0) {

//filter initial data - creating a new array suitable for further analysis
          const filterByName = (arr,key) => arr.filter(header => header.name === key ? header : null);

          const messages = data.reduce( (acc,message,i) => {
              const result = {
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
             // console.log(message.payload.parts)

              return acc.concat(result)
          },[]);

          console.log(data[0]);
          console.log(messages)

      }

  }, [status, data, error]);

  return (
    <div className="App">
        {
           'hi'
        }
    </div>
  );
}

export default App;
