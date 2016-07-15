import React from 'react';
import ReactDOM from 'react-dom';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Header} from "./header.jsx"
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
injectTapEventPlugin();

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1
        };
    }
    handleChange(event, index, item) {
        this.setState({value: item});
    }
    render() {
        return (
            <div>
                <DropDownMenu value={this.state.value} onChange={this.handleChange.bind(this)}>
                    <MenuItem value={1} primaryText="Never"/>
                    <MenuItem value={2} primaryText="Every Night"/>
                    <MenuItem value={3} primaryText="Weeknights"/>
                    <MenuItem value={4} primaryText="Weekends"/>
                    <MenuItem value={5} primaryText="Weekly"/>
                </DropDownMenu>
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
            </div>
        );
    }
}
App.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
};
ReactDOM.render(
    <App/>, document.getElementById('app'));
