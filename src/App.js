import React, { useState } from "react";

import { LenraApp, LenraSocket } from "@lenra/client";

import LoginButton from './components/LoginButton'
import List from './List'

const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false },
];

/**
 * @param {{ app: LenraApp }} props
 */
function App({ app }) {
	/**
	 * @type {[LenraSocket, (value: LenraSocket) => void]}
	 */
	const [socket, setSocket] = useState(null);

	console.log(socket)

	return (
    <div className="todoapp stack-large">
			{socket ? (
				<List router={socket} tasks={DATA} />
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
