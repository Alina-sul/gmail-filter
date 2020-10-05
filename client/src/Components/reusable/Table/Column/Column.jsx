import React, {useCallback, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";
import {Context} from '../../../context';


const Column = props => {
    const { sender, emails, index, addClass} = props;
    const context = useContext(Context);


    const onClick = useCallback((e) => {
        
        context.setSelectAll(false);

        if(context.selected.includes(context.data[index])) {
            if(!context.selectAll) {

                const value = context.selected.filter((x) => x !== context.data[index]);

                if(value.length) {
                    context.setSelected(value);
                }

            } else {
                context.setSelected([context.data[index]]);
            }
        } else {
            context.setSelected(context.selected.concat([context.data[index]]));
        }

    },[context.selected,context.selectAll]);

    return (
        <>
                <td>
                            {
                                <Button
                                    variant="contained"
                                    fullWidth
                                    className={`filter-button ${addClass}`}
                                    id={sender}
                                    onClick={onClick}
                                >
                                    {sender}
                                </Button>
                            }
                        </td>
            <td> {emails.length} </td>

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
