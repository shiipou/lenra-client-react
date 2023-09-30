import { Listener } from "@lenra/app";
import { Todo } from "../classes/Todo.js";

/**
 *
 * @param {Todo[]} param0
 * @param {*} _props
 * @returns {import("@lenra/app").JsonViewResponse}
 */
export default function todos (todos, _props) {
  return {
    tasks: todos.map((todo) => ({
      id: todo._id,
      name: todo.name,
      state: todo.state,
      onToggle: Listener("toggleTodo")
        .props({
          id: todo._id,
          state: !todo.state
        }),
      onDelete: Listener("deleteTodo").props({
        id: todo._id
      }),
      onEdit: Listener("editTodo").props({
        id: todo._id
      })
    })),
    onAdd: Listener("addTodo")
      .props({
        user: "@me"
      })
  };
}
