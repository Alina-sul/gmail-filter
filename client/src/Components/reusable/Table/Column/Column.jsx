import React from 'react';
import PropTypes from 'prop-types';

const Column = props => {
    const { data } = props;
    return (
        <>
            {
                data.map((x,i) => {
                    return typeof(x) === 'object' ? <td key={i}> {x.length} </td> :
                        <td key={i}> {x} </td>
                })
            }
        </>
    );
};

Column.propTypes = {
    data: PropTypes.array
};

export default Column;
