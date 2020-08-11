import React from 'react';
import PropTypes from 'prop-types';
import {VictoryChart,VictoryBar,VictoryLabel} from 'victory';


const BarChart = props => {
    const { data, x, y, title} = props;

    return (
        <div>
            <h4>{title}</h4>

            <VictoryChart
                domainPadding={25}
                scale={{ y: "linear" }}
            >
                <VictoryBar
                    style={{ data: { fill: "#67ced6" } }}
                    barWidth={30}
                    data={data}
                    x={x}
                    y={y}
                    labels={({ datum }) => datum.count}
                    labelComponent={<VictoryLabel dy={20} />}
                />
            </VictoryChart>
        </div>
    );
};

BarChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    x: PropTypes.string,
    y: PropTypes.string,
    title: PropTypes.string,
};

export default BarChart;
