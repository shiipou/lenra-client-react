import { View } from "@lenra/app";
import { Todo } from "./classes/Todo.js";
import { Filter } from "./classes/Filter.js";

/**
 * @type {import("@lenra/app").Manifest["json"]}
 */
export const json = {
    routes: [
        {
            path: "/filters",
            view: View("filters").find(Filter, {
                "user": "@me"
            })
        },
        {
            path: "/todos",
            view: View("preTodo").find(Filter, {
                "user": "@me"
            })
        }
    ]
};
