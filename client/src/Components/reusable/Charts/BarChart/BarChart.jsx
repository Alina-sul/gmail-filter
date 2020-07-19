import React from 'react';
import PropTypes from 'prop-types';
import * as V from 'victory';

const BarChart = props => {
    const {data, x, y, title} = props;

    return (
        <div>
            <h4>{title}</h4>

            <V.VictoryChart
                domainPadding={25}
                scale={{ y: "linear" }}
            >
                <V.VictoryBar
                    style={{ data: { fill: "#67ced6" } }}
                    barWidth={30}
                    data={data}
                    x={x}
                    y={y}
                    labels={({ datum }) => datum.count}
                    labelComponent={<V.VictoryLabel dy={20} />}
                />
            </V.VictoryChart>
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
