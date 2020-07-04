import React from 'react';
import PropTypes from 'prop-types';
import { BrandsList, TimePeriod } from './reusable-components';

function MainDashboard(props) {

    return (
        <>
            <BrandsList header="Brands" messages={Object.entries(props.messages)} />
            <TimePeriod />
        </>
    );
}

MainDashboard.propTypes = {

};

export { MainDashboard };
