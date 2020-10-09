import React, {useCallback, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";
import {Context} from '../../../context';


const Column = props => {
    const { sender, emails, index, addClass} = props;
    const {data,setSelectAll,selectAll,selected,setSelected} = useContext(Context);


    const onClick = useCallback((e) => {
        setSelectAll(false);

        if(selected.includes(data[index])) {
            if(!selectAll) {

                const value = selected.filter((x) => x !== data[index]);

                if(value.length) {
                   setSelected(value);
                }

            } else {
                setSelected([data[index]]);
            }
        } else {
            setSelected(selected.concat([data[index]]));
        }

    },[selected,selectAll]);

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
