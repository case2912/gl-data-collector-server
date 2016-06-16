import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider, connect} from 'react-redux'
// Redux向けに再構成したカウンター
class ReduxCounter extends React.Component {
    render() {
        const {count, onIncrement, onDecrement} = this.props
        return (
            <div>
                カウント: {count}
                回
                <br/>
                <button onClick={onIncrement}>プラス</button>
                <button onClick={onDecrement}>マイナス</button>
            </div>
        )
    }
}

// Actions
const INCREMENT_COUNTER = {
    type: 'INCREMENT_COUNTER'
};
const DECREMENT_COUNTER = {
    type: 'DECREMENT_COUNTER'
};

// Reducer
function counterReducer(state = {
    count: 0
}, action) {
    switch (action.type) {
        case 'INCREMENT_COUNTER':
            return {
                count: state.count + 1
            };
        case 'DECREMENT_COUNTER':
            return {
                count: state.count - 1
            };
        default:
            return state
    }
}

// Store
const store = createStore(counterReducer);

function mapStateToProps(state) {
    return {count: state.count};
}

function mapDispatchToProps(dispatch) {
    return {
        onIncrement: () => dispatch(INCREMENT_COUNTER),
        onDecrement: () => dispatch(DECREMENT_COUNTER)
    };
}

let ReduxCounterApp = connect(mapStateToProps, mapDispatchToProps)(ReduxCounter);

// レンダリング
ReactDOM.render(
    <Provider store={store}>
    <ReduxCounterApp/>
</Provider>, document.getElementById('container'));
