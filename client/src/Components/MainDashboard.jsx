import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Table from './reusable/Table'
import {BarChart, LineChart} from './reusable/Charts'
import {calculateWeekDays, calculateSendHours} from './../utils';

function MainDashboard(props) {

    const {messages} = props;


    const weekDaysData = messages.length > 1 ? calculateWeekDays(messages) : [];
    const hoursData = messages.length > 1 ? Object.values(calculateSendHours(messages)) : [];

    return (
        <>
            <h1>BRANDS EMAILS ACTIVITY (last 7 days)</h1>

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
