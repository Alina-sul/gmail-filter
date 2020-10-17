import React, {useCallback, useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {descendObjects} from "../../../../utils/arrays";
import {Context} from "../../../context";


const Headings = ({data}) => {
    const [sort, setSort] = useState('descending');
    const context = useContext(Context);

    const handleClick = useCallback(async () => {
        //const ascending =  descendObjects(context.data, 'emails')
        if(sort === 'descending') {
            context.setData(descendObjects(context.data, 'emails'));
        } else {

        }
    },[context.data]);

    return (
        <>
            {
                data.map(x => {
                    return <th onClick={handleClick} className={`heading-${x}`} key={`heading-${x}`}>
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
