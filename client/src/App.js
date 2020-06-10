import React, {useEffect} from 'react';
import './App.css';
import request from 'axios';
import {useQuery} from 'react-query';

const getData = async () => {
  const { data } = await request.get(
      "http://localhost:5000/messages"
  );
  return data;
};

function App() {
  const [labels, setLabels] = React.useState('');
  const { status, data, error, isFetching } = useQuery("data", getData);

  console.log(data);

  return (
    <div className="App">
      {status === "loading" ? (
          "Loading..."
      ) : status === "error" ? (
          <span>Error: {error.message}</span>
      ) : (
          <>
            <div>
              {'Hi'}
            </div>
            <div>{isFetching ? "Background Updating..." : " "}</div>
          </>
      )}
    </div>
  );
}

export default App;
