import React from 'react';
import PropTypes from 'prop-types';
import IconButton from "@material-ui/core/IconButton";

const Headings = ({data}) => {

    return (
        <>
            <IconButton aria-label="delete" disabled color="primary">
                <DeleteIcon />
            </IconButton>
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
