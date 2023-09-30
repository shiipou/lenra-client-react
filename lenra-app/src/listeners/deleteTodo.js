'use strict'

import { Todo } from "../classes/Todo.js";

/**
 *
 * @param {import("@lenra/app").props} props
 * @param {import("@lenra/app").event} _event
 * @param {import("@lenra/app").Api} api
 * @returns
 */
export default async function deleteTodo (props, event, api) {
    await api.data.coll(Todo).deleteDoc({ _id: props.id });
}
