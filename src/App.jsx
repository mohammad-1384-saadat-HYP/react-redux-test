import SimpleTodoList from "./pages/SimpleTodoList.jsx";
import {createStore} from "redux";
// import {SimpleTodoProvider} from "./contexts/SimpleTodoContext.jsx";
import {Provider} from "react-redux";
// import "./index.js";

const todoList = [
    {id: "1", text: "task1", completed: false},
    {id: "2", text: "task2", completed: true},
    {id: "3", text: "task3", completed: false},
]

const todos = (state = todoList, action) => {
    const data = action.payload;
    switch (action.type) {
        case "add-todo":
            return [
                ...state,
                {
                    id: data.id,
                    text: data.text,
                    completed: false
                }
            ]
        case "toggle-todo":
            return state.map(todo => {
                if (todo.id === data.id) {
                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                } else {
                    return todo
                }
            })
        default:
            return state
    }
}

const store = createStore(todos);

function App() {
    return <div id="app">
        <Provider store={store}>
            <SimpleTodoList/>
        </Provider>
    </div>
}

export default App
