import React from "react";
import request from "request";
export default class Base extends React.Component {
    render() {
        return (
            <div>
                <p>Count:{this.props.count}</p>
            </div>
        );
    }
}
