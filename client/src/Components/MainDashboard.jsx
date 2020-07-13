import React from 'react';
import PropTypes from 'prop-types';
import Table from './reusable/Table'

function MainDashboard(props) {

    return (
        <>
            <h1>BRANDS EMAILS ACTIVITY</h1>

            <div className="dashboard">
                <Table title="Brands" data={props.messages} />
                <div className="charts">

                </div>
            </div>
        </>
    );
}

MainDashboard.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object)
};

export default MainDashboard;
