import React, {useCallback, useContext, useEffect, useState} from 'react';
import PropTypes, {object} from 'prop-types';
import Headings from './Headings';
import Row from './Row';
import Column from './Column';
import SelectAllIcon from '@material-ui/icons/SelectAll';
import { descendObjects } from '../../../utils';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";
import {Context} from "../../context";


const Table = props => {
    const [sort, setSort] = useState('descending');
    const context = useContext(Context);

    // const tableData = useCallback(() => {
    //     if(sort === 'descending') {
    //         return descendObjects(data, 'emails')
    //     } else {
    //         console.log('should be ascending data')
    //     }
    // },[data]);



    return (
        <>
            <IconButton aria-label="dis-select" className="dis-select" onClick={() => context.setSelectAll(true)}>
                <SelectAllIcon />
            </IconButton>
            <table>
                <thead>
                    <Row>
                        <Headings data={ context.data[0] ? Object.keys(context.data[0]) : [] } />
                    </Row>

                </thead>
                <tbody>
                    {
                        context.data ? context.data.map( (x,i) => {
                            return <Row key={x.sender}>
                                <Column sender={x.sender}
                                        emails={x.emails}
                                        key={`${x.sender}-${Object.keys(x)[i]}`}
                                        index={i}
                                        addClass={context.selected.includes(x) ? 'selected' : ''}
                                />
                            </Row>
                        }) : null
                    }
                </tbody>
            </table>
        </>
    );
};

Table.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        sender: PropTypes.string,
        emails: PropTypes.arrayOf(PropTypes.object)}))
};

export default Table;
