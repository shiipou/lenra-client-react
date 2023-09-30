'use strict'

import { Todo } from "../classes/Todo.js";

/**
 *
 * @param {import("@lenra/app").props} props
 * @param {import("@lenra/app").event} _event
 * @param {import("@lenra/app").Api} api
 * @returns
 */
export default async function selectFilter(props, _event, api) {
    await api.data.coll(Todo).updateMany(props.id, {
        filter: props.filter
    });
}
