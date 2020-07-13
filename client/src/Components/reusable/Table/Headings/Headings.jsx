import React from 'react';
import PropTypes from 'prop-types';

const Headings = props => {

    return (
        <>
            {
                props.data.map(x => {
                    return <th key={`heading-${x}`}>
                           {x}
                    </th>
                })
            }
        </>
    );
};

Headings.propTypes = {
    data: PropTypes.arrayOf(PropTypes.string)
};

export default Headings;
