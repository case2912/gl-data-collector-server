import React from "react";
export default class Base extends React.Component {
    render() {
        return (
            <div>
                <p>Count:{this.props.count}</p>
                <p>Max:{this.props.max}</p>
                <p>Min:{this.props.min}</p>
            </div>
        );
    }
}
