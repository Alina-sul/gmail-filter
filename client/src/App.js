import React, {useEffect} from 'react';
import './App.css';
import request from 'axios';
import {useQuery} from 'react-query';



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
    }
    
const getData = async () => {
  const {data} = await request.get(
      'http://localhost:5000/messages'
  );
  return data;
};

function App() {
  //const [data, setData] = React.useState('');
  const { status, data, error, isFetching } = useQuery("data", getData);
  useEffect(() => {
  console.log(data)
  }, [data]);

  return (
    <div className="App">

    </div>
  );
}

export default App;
