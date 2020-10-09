import React, {useContext, useEffect, useMemo, useState} from 'react';
import Table from './reusable/Table'
import {BarChart, LineChart} from './reusable/Charts'
import {Context} from './context';

function MainDashboard(props) {

    const {getData,weekDaysData,hoursData} = useContext(Context);



    useEffect(() => {
      getData('messages');
    },[]);

    return (
        <>
            <h1>BRANDS EMAILS ACTIVITY (last 7 days)</h1>
            <div className="dashboard">
                <Table title="Brands" />
                <div className="dashboard">
                    <BarChart title="Daily Sends" data={weekDaysData} x="day" y="count" />
                    <LineChart title="Time Distribution" data={hoursData} x="time" y="count" />
                </div>
            </div>
        </>
    );
}

export default MainDashboard;
