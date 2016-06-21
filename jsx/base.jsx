import React from "react";
export default class Base extends React.Component {
    render() {
        return (
            <div>
                <p>Count:{this.props.count}</p>
            </div>
        );
    }
}
