import React, {useCallback, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";
import {Context} from '../../../context';

const Column = props => {
    const { data, addFilter, index} = props;
    const context = useContext(Context);

    const tdTypeText = useCallback((item) => {

        return  <td key={index+200}>
            {
                addFilter
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
    });

    const onClick = useCallback((e) => {

        if(e.target.className.includes('selected')){
            e.target.className = e.target.className.replace(' selected','');
            context.setSelected(context.selected.filter(x => x !== context.data[e.target.id]));

        } else {
            e.target.className += ' selected';
            context.setSelected(context.selected.concat([context.data[e.target.id]]));
        }

    },[context.selected]);

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
