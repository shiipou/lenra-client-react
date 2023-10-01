import React, { useEffect, useState } from "react";

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
}

export default App;
