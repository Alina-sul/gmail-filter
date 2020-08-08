import React, {useContext, useEffect, useMemo, useState} from 'react';
import Table from './reusable/Table'
import {BarChart, LineChart} from './reusable/Charts'
import {calculateWeekDays, calculateSendHours} from './../utils';
import {Context} from './context';

function MainDashboard(props) {

    const context = useContext(Context);
    const messages = context.data;

    useEffect(() => {
        context.getData('messages')
    },[]);


    return (
        <>
            <h1>BRANDS EMAILS ACTIVITY (last 7 days)</h1>

            <div className="dashboard">
                <Table title="Brands" data={messages} />
                <BarChart title="Daily Sends" data={context.weekDaysData} x="day" y="count"/>
                <LineChart title="Time Distribution" data={context.hoursData} x="time" y="count" />
            </div>
        </>
    );
}

export default MainDashboard;
