import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {VictoryChart,VictoryBar,VictoryLabel} from 'victory';
import {average} from "../../../../utils"

const BarChart = props => {
    const { data, x, y, title} = props;
    return (
        <div>
            <h4>{title}</h4>
            <div className="average">
            Avg. emails per day: {average(data,'count',data.length)}
            </div>
            <VictoryChart
                domainPadding={25}
                scale={{ y: "linear" }}
            >
                <VictoryBar
                    height={600}
                    style={{ data: { fill: "#67ced6" } }}
                    barWidth={5}
                    data={data}
                    x={x}
                    y={y}
                    labels={({ datum }) => datum.count}

                    {...props}
                />

            </VictoryChart>

        </div>
    );
};

BarChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    horizontal: PropTypes.bool,
    x: PropTypes.string,
    y: PropTypes.string,
    title: PropTypes.string,
};

export default BarChart;
