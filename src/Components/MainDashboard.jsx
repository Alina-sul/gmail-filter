import React, {useContext, useEffect, useMemo, useState} from 'react';
import Table from './main/Table'
import {BarChart, LineChart} from './main/Charts'
import {Context} from './context';

function MainDashboard(props) {

    const {getData,weekDaysData,hoursData} = useContext(Context);

    useEffect(() => {
      getData('messages');
    },[]);

    return (
        <>
            <div className="main-title">
                <h1>INBOX ANALYSIS BY SENDER NAME</h1>
                <span>(last 7 days, 99 emails max)</span>
            </div>
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
