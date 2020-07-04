import React from 'react';
import PropTypes from 'prop-types';

function BrandsList(props) {

    const sorted = props.messages.sort((a,b) => {return b[1].emails.length - a[1].emails.length});

    return(
        <>
            <h2 className="title">
                {props.header}
            </h2>
            <div className="double-list">
                <div className="list">
                    <List
                        array={sorted}
                        index={0}
                    />
                </div>
                <div className="list">
                    <ListArrayLength
                        array={sorted}
                        index={1}
                        param={'emails'}
                    />
                </div>
            </div>
        </>
    );
}

function List(props) {
    return (
        props.array.map((x,i) => {
            return <div key={i} className=""> {x[props.index]} </div>
        })
    )
}

function ListArrayLength(props) {
    return (
        props.array.map((x,i) => {
            return <div key={i} className=""> {
                props.param ?
                x[props.index][props.param].length :
                    x[props.index].length
            } </div>
        })
    )
}

function TimePeriod() {

    return (
        <>
            <h2 className="title">
                Time Period
            </h2>
        </>
    );
}

BrandsList.propType = {
    messages: PropTypes.arrayOf(PropTypes.array),
    header: PropTypes.string,
};
ListArrayLength.propType = {
    index: PropTypes.number,
    array: PropTypes.array

};
List.propType = {
    index: PropTypes.number,
    array: PropTypes.array,
    param: PropTypes.string
};

export { List, BrandsList, ListArrayLength, TimePeriod }

