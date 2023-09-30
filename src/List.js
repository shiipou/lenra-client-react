import React, { useState, useEffect } from "react";

import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

/**
 *
 * @param {{ router: LenraSocket }}
 * @returns
 */
function List({ router }) {

  const [tasks, setTasks] = useState([]);
  const [addTask, setAddTask] = useState(null);
  const [filters, setFilters] = useState([]);
  const [currentFilter, setCurrentFilter] = useState(0);
  const [todosRoute, setTodosRoute] = useState(null);
  const [filtersRoute, setFiltersRoute] = useState(null);

  useEffect(() => {
    setTodosRoute(router.route("/todos", ({ tasks, onAdd }) => {
      setTasks(tasks);
      setAddTask(onAdd);
    }))
    setFiltersRoute(router.route("/filters", ({ current, filters }) => {
      setFilters(filters);
      setCurrentFilter(current);
    }))
  }, [router]);

  console.log(todosRoute)
  console.log(filtersRoute)

  const taskList = tasks
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskConullmpleted={() => todosRoute.callListener(task.onToggle)}
        deleteTask={() => todosRoute.callListener(task.onDelete)}
        editTask={(name) => todosRoute.callListener({...task.onEdit, event: { value: name }})}
      />
    ));

  const filtersList = filters.map((filter, i) => (
    <FilterButton
      key={filter.name}
      name={filter.name}
      isPressed={currentFilter === i}
      setFilter={()=>filtersRoute.callListener(filter.onSelect)}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div>
      <Form addTask={(name) => todosRoute.callListener({ ...addTask, event: { value: {name} } })} />
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
