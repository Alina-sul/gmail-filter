import React, {useCallback, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";
import {Context} from '../../../context';

const Column = props => {
    const { data, addFilter, index} = props;
    const context = useContext(Context);
    const [filter, setFilter] = useState(false);

    const tdTypeText = useCallback((item) => {

        return  <td key={index+200}>
            {
                filter
                    ?
                <Button
                    variant="contained"
                    className="filter-button"
                    fullWidth
                    id={index}
                    onClick={onClick}
                >
                    {item}
                </Button>
                    :
                    item
            }

        </td>
    },[filter]);

    const onClick = useCallback((e) => {
        console.log(e.target);
        context.setCD([]);
    },[]);


    useEffect(() => {
        setFilter(addFilter);
    },[addFilter]);


    return (
        <>
            {
                data.map((x) => {
                    return typeof(x) === 'object' ? <td key={index+100}> {x.length} </td> :
                        tdTypeText(x)
                })
            }
        </>
    );
};

Column.propTypes = {
    data: PropTypes.array,
    addFilter: PropTypes.bool,
    index: PropTypes.number
};

export default Column;
