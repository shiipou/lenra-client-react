'use strict'

import { Todo } from "../classes/Todo.js";

/**
 *
 * @param {import("@lenra/app").props} props
 * @param {import("@lenra/app").event} _event
 * @param {import("@lenra/app").Api} api
 * @returns
 */
export default async function addTodo (props, event, api) {
    const todo = new Todo("@me", event.value.name);
    await api.data.coll(Todo).createDoc(todo);
}
