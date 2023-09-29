import React, { useState, useRef, useEffect } from "react";

import { LenraSocket, ListenerCall } from "@lenra/client";

import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";

/**
 *
 * @param {LenraSocket}
 * @returns
 */
function List({ router }) {

  const [tasks, setTasks] = useState([]);
  const [addTask, setAddTask] = useState(null);
  const [filters, setFilters] = useState([]);
  const [currentFilter, setCurrentFilter] = useState(0);

  const todosRoute = router.route("/todos", ({ tasks, onAdd }) => {
    console.log(arguments);
    setTasks(tasks);
    setAddTask(onAdd);
  });

  const filterRoute = router.route("/filters", ({ current, filters }) => {
    console.log(arguments);
    setFilter(filters);
    setCurrentFilter(current);
  });

  const taskList = tasks
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskConullmpleted={()=>ListenerCall(todosRoute, task.onToggle)}
        deleteTask={()=>ListenerCall(todosRoute, task.onDelete)}
        editTask={()=>ListenerCall(todosRoute, task.onEdit)}
      />
    ));

  const filterList = FILTER_NAMES.map((filter, i) => (
    <FilterButton
      key={filter.name}
      name={filter.name}
      isPressed={currentFilter === i}
      setFilter={()=>ListenerCall(todosRoute, filter.onSelect)}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div>
      <Form addTask={() => todosRoute.callListener({ addTask, event: {} })} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
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
