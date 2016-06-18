import React from 'react';
import ReactDOM from 'react-dom'
import {Line} from "react-chartjs";
import {chartData} from "./chartjs.config"
export default class Chart extends React.Component {
    render() {
        return (<Line data={chartData} width="600" height="250"/>);
    }
}
ReactDOM.render(
    <Chart/>, document.getElementById("container"));
