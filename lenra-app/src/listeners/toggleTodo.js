'use strict'

import { Todo } from "../classes/Todo.js";

/**
 *
 * @param {import("@lenra/app").props} props
 * @param {import("@lenra/app").event} _event
 * @param {import("@lenra/app").Api} api
 * @returns
 */
export default async function toggleTodo(props, _event, api) {
    const todo = await api.data.coll(Todo).getDoc(props.id);
    todo.state = !todo.state;
    await api.data.coll(Todo).updateDoc(todo);
}
