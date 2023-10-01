import React from "react";

import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

/**
 *
 * @param {{ router: LenraSocket }}
 * @returns
 */
function List({ todos, filters, todosRoute, filtersRoute }) {

  const taskList = todos.tasks?.map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.state}
        key={task.id}
        toggleTaskCompleted={() => todosRoute.callListener(task.onToggle)}
        deleteTask={() => todosRoute.callListener(task.onDelete)}
        editTask={(name) => todosRoute.callListener({...task.onEdit, event: { value: name }})}
      />
    )) ?? [];

  const filtersList = filters.filters?.map((filter, i) => (
    <FilterButton
      key={filter.name}
      name={filter.name}
      isPressed={filters.currentFilter === i}
      setFilter={()=>filtersRoute.callListener(filter.onSelect)}
    />
  )) ?? [];

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div>
      <Form addTask={(name) => todosRoute.callListener({ ...todos.addTask, event: { value: {name} } })} />
      <div className="filters btn-group stack-exception">{filtersList}</div>
      <h2 id="list-heading" tabIndex="-1">
        {headingText}
      </h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default List;
