// import {useDispatch, useSelector} from "../contexts/SimpleTodoContext.jsx";
import {useSelector, useDispatch} from "react-redux";

let todoId = 0;

const SimpleTodoList = () => {
    const todos = useSelector(state => state);
    const dispatch = useDispatch();

    const todosComponent = todos ? todos.map(todo => (
        <li
            key={todo.id}
            style={{textDecoration: todo.completed ? "line-through" : "none"}}
            onClick={() => dispatch({type: "toggle-todo", payload: {id: todo.id}})}>
            {todo.text}
        </li>
    )) : null;

    const handleKeyDown = (e) => {
        const {target} = e;
        if (e.code === "Enter") {
            dispatch({
                type: "add-todo",
                payload: {
                    id: todoId++,
                    text: target.value
                }
            })

            target.value = "";
        }
    }

    return (
        <div>
            <input type="text" onKeyDown={handleKeyDown}/>
            <ul>
                {todosComponent}
            </ul>
        </div>
    );
};

export default SimpleTodoList