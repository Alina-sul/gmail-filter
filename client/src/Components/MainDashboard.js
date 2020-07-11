import React from 'react';
import PropTypes from 'prop-types';
import { BrandsList, TimePeriod } from './reusable-components';
import Table from './reusable/Table'

function MainDashboard(props) {

    return (
        <>
            <Table title="Brands" data={props.messages}  />
        </>
    );
}

MainDashboard.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object)
};

export { MainDashboard };
