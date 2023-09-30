# todo-react

## How to add Lenra to your project

1. Add Lenra client lib to your project and initialize Lenra app

```bash
npm i @lenra/client
lenra new -p lenra-app js
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

1. Create a react component that will show a button to login to Lenra that take as params the callback function `onClick` that will be called when the button is clicked. Which will handle the login to Lenra.

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

4. In order to make the app code more readable, I'll rename the App.js into List.js. So the App.js will be the main component that will handle the initialization of the lenra app.

I'll just replace the `<div>` in the root of the component that contain the style of the app.

{:data-file="src/App.js"}
```js
	return (
    <div className="todoapp stack-large">
		 ...
		</div>
	);
```
Into a classic div :

{:data-file="src/App.js"}
```js
	return (
		<div>
		 ...
		</div>
	);
```

So I can add the style in the `index.css` file.

5. Create the new `App.js` file that will handle the initialization of the lenra app.

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
```

At the same time I added the function call on the button that will handle the login on the click event you can see in the previous code

{:data-file="src/App.js"}
```js
<button onClick={()=>app.connect()}
```

6. In the `List.js`, I'll add the `router` param that will connect to the channel of your route which will send you the list of todos you currently have with they states.

{:data-file="src/List.js"}
```js


7.

{:data-file="src/List.js"}
```js





1. Check if the app is connected in the `root.render` from the  `index.js` file.

{:data-file="src/index.js"}
```js
root.render(
  <React.StrictMode>
    {<App app={app} />}
  </React.StrictMode>
);
```

7. Start the react app

```bash
npm start
```

8. In another terminal, start the lenra devtool

```bash
lenra dev
```

9. Open the react app and click on the login button when the devtool is healthy.

10. You should see a popup openning and quickly closing itself. If you see this, you are connected to Lenra.
11. You are now successfully connected to your app.
12.
