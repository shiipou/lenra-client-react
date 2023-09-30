import { Listener } from "@lenra/app";
import { Filter, FilterEnum } from "../classes/Filter.js";

/**
 *
 * @param {Filter[]} param0
 * @param {} _props
 * @returns {import("@lenra/app").JsonViewResponse}
 */
export default function filters([currentFilter], _props) {
  return {
    current: currentFilter.filter,
    filters: Object.entries(FilterEnum).map(([key, value]) => ({
      id: value,
      name: key,
      onSelect: Listener("selectFilter")
        .props({
          id: currentFilter._id,
          filter: value
        })
    }))
  };
}
