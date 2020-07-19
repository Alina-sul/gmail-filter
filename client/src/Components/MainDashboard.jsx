import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Table from './reusable/Table'
import {BarChart, LineChart} from './reusable/Charts'
import {calculateWeekDays, calculateSendHours} from './../utils';

function MainDashboard(props) {
    const {messages} = props;

    const [chartsData, setChartsData] = useState([]);


    useEffect(() => {
        setChartsData(messages);

    },[messages]);

    const weekDaysData = chartsData.length > 1 ? calculateWeekDays(chartsData) : [];
    const hoursData = chartsData.length > 1 ? Object.values(calculateSendHours(chartsData)) : [];

    return (
        <>
            <h1>BRANDS EMAILS ACTIVITY</h1>

            <div className="dashboard">
                <Table title="Brands" data={messages} />
                    <BarChart title="Daily Sends" data={weekDaysData} x="day" y="count"/>
                    <LineChart title="Time Distribution" data={hoursData} x="time" y="count" />
            </div>
        </>
    );
}

MainDashboard.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object)
};

export default MainDashboard;
