import React from 'react';
import ReactDOM from 'react-dom';
import request from "request";
export default class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: ""
        }
    }
    test () {
        request.get("http://wglstat.grimoire.gl/list", function(err, res, body) {
            this.setState({
                count: this.state.count + body
            });
        }.bind(this));
    }

    render() {
        return (
            <div>
                <button onClick={this.test.bind(this)}>ぼたん</button>
                HELLO{this.state.count}
            </div>
        );
    }
}
ReactDOM.render(
    <Chart/>, document.getElementById("app"));
