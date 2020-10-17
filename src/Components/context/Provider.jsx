import React, {useCallback, useEffect, useState} from 'react';
import Context from "./Context";
import axios from "axios";
import {calculateSendHours, calculateWeekDays, descendObjects, retrieveRelevantData} from "../../utils/arrays";

function Provider(props) {
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState([]);
    const [selectAll, setSelectAll] = useState(true);

    const getData = useCallback((param) => {
        return axios.get(`http://localhost:5000/${param}`)
            .then((res) => {
                setData(descendObjects((Object.values(retrieveRelevantData(res.data))), 'emails'))
            });
    }, []);

    useEffect(() => {
            if (selectAll) {
                setSelected(data)
            }
        },
        [data, selectAll]);

    const chartCalculus = useCallback((func) => {
        return selected.length ? func(selected) :
            data.length ? func(data) : []

    }, [selected, data]);

    return (
        <Context.Provider
            value={
                {
                    getData: getData,
                    setData: setData,
                    data: data,
                    setSelected: setSelected,
                    selected: selected,
                    selectAll: selectAll,
                    setSelectAll: setSelectAll,
                    weekDaysData: chartCalculus(calculateWeekDays),
                    hoursData: chartCalculus(calculateSendHours),
                }
            }
        >
            {props.children}
        </Context.Provider>
    );
}

export default Provider;
