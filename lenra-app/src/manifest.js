import { View } from "@lenra/app";
import { Todo } from "./classes/Todo.js";

/**
 * @type {import("@lenra/app").Manifest["json"]}
 */
export const json = {
    routes: [
        {
            path: "/filters",
            view: View("filters").find("", {
                "user": "@me"
            })
        },
        {
            path: "/todos",
            view: View("todos").find(Todo, {
                "user": "@me"
            })
        }
    ]
};

/**
 * @type {import("@lenra/app").Manifest["lenra"]}
 */
export const lenra = {
    routes: [
        {
            path: "/",
            view: View("lenra.main")
        }
    ]
};
