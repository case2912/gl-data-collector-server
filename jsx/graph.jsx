import React from "react";
import ReactDOM from 'react-dom';
import Highcharts from 'react-highcharts';
import {config} from "./graph.config";
export default class Graph extends React.Component {

    render() {
        return (
            <Highcharts config={config} ref="chart"></Highcharts>
        );
    }

}

ReactDOM.render(
    <Graph/>, document.getElementById('container'));
