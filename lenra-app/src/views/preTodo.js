import { View } from "@lenra/app";
import { Filter, FilterEnum } from "../classes/Filter.js";
import { Todo } from "../classes/Todo.js";

/**
 *
 * @param {Todo[]} param0
 * @param {*} _props
 * @returns {import("@lenra/app").JsonViewResponse}
 */
export default function todos ([user], _props) {
  return View("todos").find(Todo, {
    "user": "@me",
    "state": user.filter === FilterEnum.completed
  })
}
