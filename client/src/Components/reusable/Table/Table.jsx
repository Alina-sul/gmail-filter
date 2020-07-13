import React from 'react';
import PropTypes, {object} from 'prop-types';
import Headings from './Headings';
import Row from './Row';
import Column from './Column';

const Table = props => {

    const {data} = props;


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
                        data.map( (x,i) => {
                            return <Row key={x.sender}>
                                <Column data={ x ? Object.values(x) : null } key={`${x.sender}-${Object.keys(x)[i]}`} />
                            </Row>
                        })
                    }
                </tbody>
            </table>
        </>
    );
};

Table.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({}))
};

export default Table;
