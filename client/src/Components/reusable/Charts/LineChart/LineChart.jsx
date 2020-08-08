import React from 'react';
import PropTypes from 'prop-types';
import * as V from 'victory';

const LineChart = props => {
    const {data, x, y, title, scale} = props;
    return (
        <div>
            <h4>{title}</h4>

            <V.VictoryChart
                domainPadding={0}
                scale={ scale }
            >
                <V.VictoryLine
                    style={{ data: { stroke: "#67ced6" } }}
                    data={data}
                    x={x}
                    y={y}
                    labels={({ datum }) => datum.time}
                />
            </V.VictoryChart>
        </div>
    );
};

LineChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    x: PropTypes.string,
    y: PropTypes.string,
    title: PropTypes.string,
    scale: PropTypes.object
};

export default LineChart;
