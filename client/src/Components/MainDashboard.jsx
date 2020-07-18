import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Table from './reusable/Table'
import {BarChart} from './reusable/Charts'
import {calculateWeekDays} from './../utils';

function MainDashboard(props) {
    const {messages} = props;

    const [chartsData, setChartsData] = useState([]);


    useEffect(() => {
        setChartsData(messages);
    },[messages]);

    const barData = chartsData.length > 1 ? calculateWeekDays(chartsData) : [];

    return (
        <>
            <h1>BRANDS EMAILS ACTIVITY</h1>

            <div className="dashboard">
                <Table title="Brands" data={messages} />
                <div className="charts">
                    <BarChart title="Daily Sends" data={barData} x="day" y="count"/>
                    <BarChart title="Time Distribution" data={barData} x="day" y="count"/>
                </div>
            </div>
        </>
    );
}

MainDashboard.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object)
};

export default MainDashboard;
