import React, {useEffect} from 'react';
import './App.css';
import request from 'axios';
import {useQuery} from 'react-query';

const getData = async () => {
  const { data } = await request.get(
      "http://localhost:5000/test"
  );
  return data;
};

function App() {
  const [labels, setLabels] = React.useState('');
  const { status, data, error, isFetching } = useQuery("data", getData);

  return (
    <div className="App">
      {status === "loading" ? (
          "Loading..."
      ) : status === "error" ? (
          <span>Error: {error.message}</span>
      ) : (
          <>
            <div>
              {data}
            </div>
            <div>{isFetching ? "Background Updating..." : " "}</div>
          </>
      )}
    </div>
  );
}

export default App;
