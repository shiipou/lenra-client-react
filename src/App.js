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
				<List router={socket}/>
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
