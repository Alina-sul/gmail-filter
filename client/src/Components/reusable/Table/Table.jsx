import React, {useCallback, useEffect} from 'react';
import PropTypes, {object} from 'prop-types';
import Headings from './Headings';
import Row from './Row';
import Column from './Column';
import { descendObjects } from '../../../utils';

const Table = props => {
    const { data } = props;
    const [sort, setSort] = React.useState('descending');

    const tableData = useCallback(() => {
        if(sort === 'descending') {
            return descendObjects(data, 'emails')
        } else {
            console.log('should be ascending data')
        }
    },[data]);



    return (
        <>
            <table>
                <thead>
                    <Row>
                        <Headings data={ data[0] ? Object.keys(data[0]) : [] } />
                    </Row>
                </thead>
                <tbody>
                    {
                        data ? tableData().map( (x,i) => {
                            return <Row key={x.sender}>
                                <Column data={ Object.values(x) } key={`${x.sender}-${Object.keys(x)[i]}`} addFilter={true} index={i}/>
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
