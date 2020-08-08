import React from 'react';
import PropTypes from 'prop-types';

const Headings = ({data}) => {

    return (
        <>
            {
                data.map(x => {
                    return <th className={`heading-${x}`} key={`heading-${x}`}>
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
