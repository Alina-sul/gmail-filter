import React, {useCallback, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";
import {Context} from '../../../context';


const Column = props => {
    const { data, index, addClass} = props;
    const context = useContext(Context);

    const onClick = useCallback((e) => {
        context.setSelected([context.data[index]]);
        context.setSelectAll(false);
    },[context.selected,context.selectAll]);

    return (
        <>
            {
                data.map((x) => {
                    return typeof (x) === 'object' ? <td key={index + 100}> {x.length} </td> :
                        <td key={index + 200}>
                            {
                                <Button
                                    variant="contained"
                                    fullWidth
                                    className={`filter-button ${addClass}`}
                                    id={x}
                                    onClick={onClick}
                                >
                                    {x}
                                </Button>
                            }

                        </td>
                })
            }
        </>
    );
};

Column.propTypes = {
    data: PropTypes.array,
    addFilter: PropTypes.bool,
    index: PropTypes.number,
    addClass: PropTypes.string
};

export default Column;
