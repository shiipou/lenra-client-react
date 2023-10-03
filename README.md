# todo-react

## How to add Lenra to your project

In this guide I'll show you how to add Lenra to an existing app. We'll use the [Todo-React](https://github.com/mdn/todo-react) app from MDN as an example.

Download the code and start tweak it following the guide.

1. Add Lenra client lib to your project and initialize Lenra app

```bash
npm i @lenra/client
lenra new -p lenra-app js
```

That will add the `@lenra/client` lib to your project and create the `lenra-app` folder that contain the backend lenra app. You can move the `lenra.yml` to the root of your react app and add the key `path` at the root of the file.

{:data-file="lenra.yml"}
```yml
componentsApi: "1.0"
path: lenra-app
generator:
  dofigen:
		[...]
```

2. Create the lenra app object and initialize it in the `index.js` file

{:data-file="src/index.js"}
```js
import { LenraApp } from '@lenra/client';

const app = new LenraApp({
  appName: "Example Client",
  clientId: "XXX-XXX-XXX",
});
```

3. Create a react component that will show a button to login to Lenra that take as params the callback function `onClick` that will be called when the button is clicked. Which will handle the login to Lenra.

{:data-file="src/components/LoginButton.js"}
```js
import React from "react";

function LoginButton(props) {
  return (
			<div style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center"
			}} >
				<button onClick={props.onClick} style={{
					border: "1px solid black",
					padding: "5px",
					margin: "10px 0px"
				}}>
					Login
				</button>
			</div >
  );
}

export default LoginButton;
```

4. In order to make the app code more readable, I'll rename the `App.js` file into `List.js`. So the `App.js` will be the main component that will handle the initialization of the lenra app and `List.js` will just contain the view that list todos.

You can also replace the `<div>` in the root of the component of `List.js` that contain the style of the app that will be common for the whole app and place it in `App.js`.

{:data-file="src/List.js"}
```js
	return (
    <div className="todoapp stack-large">
		 ...
		</div>
	);
```
Into a classic div :

{:data-file="src/List.js"}
```js
	return (
		<div>
		 ...
		</div>
	);
```

1. Create the new `App.js` file that will handle the initialization of the lenra app.

{:data-file="src/App.js"}
```js
import React, { useState } from "react";

import LoginButton from './components/LoginButton'
import List from './List'

/**
 * @param {{ app: LenraApp }} props
 */
function App({ app }) {
	/**
	 * @type {[LenraSocket, (value: LenraSocket) => void]}
	 */
	const [socket, setSocket] = useState(null);

	return (
    <div className="todoapp stack-large">
			{socket ? (
				<List />
			) : (
					<LoginButton onClick={() => {
						app.connect().then((value) => {
							setSocket(value);
						});
					}}
				/>
			)}
		</div >
	);
}

export default App;
```

At the same time I added the function call on the button that will handle the login on the click event you can see in the previous code

{:data-file="src/App.js"}
```js
<button onClick={()=>app.connect()}
```

6. In the `List.js`, you can use the `router` to connect to the routes you'll later define in the lenra-app `manifest.js`.

In this example, we'll connect to the `/todos` and `/filters` routes using the router. React need states variables to be updated in order to re-render the component. So we'll use the `useState` hook to store the routes and the todos and filters objects that will contains the json of each routes which will be able to use later in the `List` component.

{:data-file="src/App.js"}
```jsx
function App({ app }) {
	/**
	 * @type {[LenraSocket, (value: LenraSocket) => void]}
	 */
	const [socket, setSocket] = useState(null);

	const [todosRoute, setTodosRoute] = useState(null);
	const [filtersRoute, setFiltersRoute] = useState(null);

	const [todos, setTodos] = useState({});
	const [filters, setFilters] = useState({});

	useEffect(() => {
		const todosRoute = socket?.route("/todos", (json) => {
			console.log('Get todos', json)
			setTodos(json);
		});
		setTodosRoute(todosRoute);

		const filtersRoute = socket?.route("/filters", (json) => {
			console.log('Get filters', json)
			setFilters(json);
		})
		setFiltersRoute(filtersRoute);
		return () => {
			todosRoute?.remove();
			filtersRoute?.remove();
		}
	}, [socket]);
	[...]
}
```


7. You can update the List component to pass thoses json as params to the `List` component.

{:data-file="src/App.js"}
```jsx
return (
	<div className="todoapp stack-large">
		{socket ? (
			<List
				todos={todos}
				filters={filters}
				todosRoute={todosRoute}
				filtersRoute={filtersRoute} />
		) : (
				<LoginButton onClick={() => {
					app.connect().then((value) => {
						setSocket(value);
					});
				}}
			/>
		)}
	</div >
);
```

8. You can now update the `List` component to use thoses json parameters that describe your UI's data.

In this example, I just copy pasted the code from the original `List.js` file and replaced the static data by the json data from the routes.

I also removed all `setState` call because it's not needed anymore here.

To handle the events, I used the `callListener` method of the `LenraRoute` object that will call the listener of the route with the event object as parameter if needed.

Example with the edit action on the `Todo` component :

{:data-file="src/List.js"}
```jsx
editTask={(name) => todosRoute.callListener({...task.onEdit, event: { value: name }})}
```

You can also use the `callListener` method to call the listener of the route without any event object.

{:data-file="src/List.js"}
```jsx
deleteTask={() => todosRoute.callListener(task.onDelete)}
```

Here the full code of this `List.js` file if needed :

{:data-file="src/List.js"}
```jsx
import React from "react";

import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

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
```

9. Check if the app is connected in the `root.render` from the  `index.js` file.

{:data-file="src/index.js"}
```js
root.render(
  <React.StrictMode>
    {<App app={app} />}
  </React.StrictMode>
);
```

10. Start the react app

```bash
npm start
```

11. In another terminal, start the lenra devtool

```bash
lenra dev
```

12. Open the react app and click on the login button when the devtool is healthy.

13. You should see a popup openning and quickly closing itself. If you see this, you are connected to Lenra.

14. Now that you can successfully connected to your app, we can start to write code of the backend part of the app.

15. In the `lenra-app` folder, update the `manifest.js` file that will define each accessible routes of the app.

The `View()` function allow you to define a view call with a query that will be used to filter the data of the view. You can use the `@me` keyword to get the current user id.

{:data-file="lenra-app/manifest.js"}
```js
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
            view: View("todos").find(Todo, {
                "user": "@me"
            })
        }
    ]
};
```

16.  Create the `classes` folder and the `Todo.js` and `Filter.js` files that will contain the classes that will handle the data of the app.

This extends the `Data` class from the `@lenra/app` lib that allow the class to be stored in the database as documents with each fields as properties of the document.

{:data-file="lenra-app/classes/Todo.js"}
```js
import { Data } from "@lenra/app";

export class Todo extends Data {
    /**
     *
     * @param {string} user
     * @param {string} name
     * @param {boolean} state
     */
    constructor(user, name, state = false) {
        super();
        this.user = user;
        this.name = name;
        this.state = state;
    }
}
```

{:data-file="lenra-app/classes/Filter.js"}
```js
import { Data } from "@lenra/app";

export const FilterEnum = {
    all: 0,
    active: 1,
    completed: 2
};

export class Filter extends Data {
    /**
     *
     * @param {string} user
     * @param {number} filter
     */
    constructor(user, filter = FilterEnum.all) {
        super();
        this.user = user;
        this.filter = filter;
    }
}
```

17. Now we'll define the views todos and filters that will handle the data of the app.

The first parameter of the function will be an array of the data returned by the query of the view. The second parameter will be the props passed to the view in the manifest.

We can with that return the data we need to display in the UI in your app, but also define some listeners call that will be called when the user will interact with your app using the `Listeners` class from the `@lenra/app` lib. The props passed to the listener will allow you to pass data to the listener call without even letting the user know about it. (No data is sent to the client app)


This view will return an object with the `tasks` array that will contain the todos data, on each todos we'll add a listener to update it's state or to delete it. And the `addTask` listener that will be called when the user will add a new todo.

{:data-file="lenra-app/views/todos.js"}
```js
import { Listener } from "@lenra/app";
import { Todo } from "../classes/Todo.js";

/**
 *
 * @param {Todo[]} param0
 * @param {*} _props
 * @returns {import("@lenra/app").JsonViewResponse}
 */
export default function todos (todos, _props) {
  return {
    tasks: todos.map((todo) => ({
      id: todo._id,
      name: todo.name,
      state: todo.state,
      onToggle: Listener("toggleTodo")
        .props({
          id: todo._id,
          state: !todo.state
        }),
      onDelete: Listener("deleteTodo").props({
        id: todo._id
      }),
      onEdit: Listener("editTodo").props({
        id: todo._id
      })
    })),
    addTask: Listener("addTodo")
      .props({
        user: "@me"
      })
  };
}
```

This view will return an object with the `filters` array that will contain the filters data which will represent one of the three buttons to filter the todos based on it's state (Show all todos, show only active todos, show only completed todos), on each filter we'll add a listener to update the current filter. And the `selectFilter` listener that will be called when the user will select a new filter.

{:data-file="lenra-app/views/filters.js"}
```js
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
          filter: value
        })
    }))
  };
}
```
