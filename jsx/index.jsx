import React from 'react';
import ReactDOM from 'react-dom';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Header} from "./header.jsx"
import {Hooter} from "./hooter.jsx"
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Chart from "./chart.jsx"
import ChartSub from "./chartSub.jsx"
import request from "request"
injectTapEventPlugin();
const items = [];
const pitems = [];
request.get("http://wglstat.grimoire.gl/list?browser_name=i&browser_version=n&platform_name=d&platform_version=e&domain=x", function(err, res, body) {
    for (var key in JSON.parse(body).Items[0].index.browser) {
        items.push(<MenuItem value={key} key={key} primaryText={key}/>);
    }
    for (var key in JSON.parse(body).Items[0].index.platform) {
        pitems.push(<MenuItem value={key} key={key} primaryText={key}/>);
    }
});

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "-",
            pvalue: "-",
            index: ""
        };
    }
    getIndex() {
        request.get("http://wglstat.grimoire.gl/list?browser_name=" + this.state.value + "&platform_name=" + this.state.pvalue, function(err, res, body) {
            this.setState({index: body});
        }.bind(this));
    }
    handleChange(event, index, item) {
        this.setState({value: item});
    }
    phandleChange(event, index, item) {
        this.setState({pvalue: item});
    }
    render() {
        return (
            <div>
                <DropDownMenu value={this.state.value} onChange={this.handleChange.bind(this)}>
                    {items}
                </DropDownMenu>
                <DropDownMenu value={this.state.pvalue} onChange={this.phandleChange.bind(this)}>
                    {pitems}
                </DropDownMenu>
                <RaisedButton label="Result" onClick={this.getIndex.bind(this)}/>
                <p>{this.state.index}</p>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    getChildContext() {
        return {muiTheme: getMuiTheme(baseTheme)};
    }

    render() {
        return (
            <div>
                <Header/>
                <Home/>
                <Chart/>
                <ChartSub/>
            </div>
        );
    }
}
App.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
};
ReactDOM.render(
    <App/>, document.getElementById('app'));
