const createStore = (reducer) => {
    let state;
    let listeners = [];

    const getState = () => state

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener())
    }

    const subscribe = (listener) => {
        listeners.push(listener)
    }

    dispatch({});
    return {getState, dispatch, subscribe}
}

const counter = (state = 0, action) => {
    switch (action.type) {
        case "increment":
            return state + 1
        case "decrement":
            return state - 1
        default:
            return state
    }
}

const store = createStore(counter);

store.subscribe(() => console.log(store.getState()))

store.dispatch({type: "increment"});
store.dispatch({type: "increment"});
store.dispatch({type: "increment"});