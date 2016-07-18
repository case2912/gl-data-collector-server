import React from 'react';
import ReactDOM from 'react-dom'
import {Bar} from "react-chartjs";
import {chartData} from "./chartConfigSub.js"
export default class ChartSub extends React.Component {

    render() {
        return (
          <Bar data={chartData} width="1200" height="500"/>
        );
    }
}
