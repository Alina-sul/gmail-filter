import React from 'react';
import PropTypes from 'prop-types';

const Row = props => {
    return (
        <tr>
            {props.children}
        </tr>
    );
};

Row.propTypes = {
    children: PropTypes.element
};

export default Row;
