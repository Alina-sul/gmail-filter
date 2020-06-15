import React from 'react';
import './App.css';
import request from 'axios';
import {useQuery} from 'react-query';
import './style.sass'
import { Slider } from '@material-ui/core';
import func from './Functions'
import { useTable } from "react-table";

const getData = async () => {
    const {data} = await request.get(
        'http://localhost:5000/messages'
    );
    return data;
};

function Table({ columns, data }) {
    return (
        <>
        </>
    )
}

function App() {
  const [max, setMax] = React.useState(7);
  const [messages, setMessages] = React.useState([]);

    const { status, data, error } = useQuery("data", getData, {
    initialData:[]
  });


  const [value, setValue] = React.useState([2, 6]);
  const handleChange = (event, newValue) => {
        setValue(newValue);
  };

  React.useEffect(() => {
      if (status === 'error') return console.log(error);
      if (status === 'success' && data.length > 0) {

          const msg = func.arrayForAnalysis(data);
          console.log(msg);
          debugger
          setMessages(msg);
          //setMessages(func.arrayForAnalysis(data));
          console.log(messages);
         // setMax(Math.ceil(func.miliToDays(messages[0].date - messages[99].date)));

      }

  }, [status, data, error]);

  return (
    <>
        <div className="App">
            <h1>Gmail Filter</h1>
            <div id='top-section' className='top-section'>
                <div id='table'>
                    <h3>TIME RANGE (days)</h3>
                    <Slider
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        max={max}
                    />
                    <Table columns={''} data={''} />
                </div>
                <div id='distribution'>
                    <h3>DISTRIBUTION</h3>
                </div>
            </div>
        </div>
    </>
  );
}

export default App;
