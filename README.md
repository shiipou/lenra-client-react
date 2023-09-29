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

3. Create a react component that will show a button to login to Lenra that take as params the `app` object

{:data-file="src/Login.js"}
```js
import React from 'react';
import { LenraApp } from '@lenra/client';


/**
 * @param {{ app: LenraApp }} props
 */
export default function Login({ app }) {
	/**
	 * @type {LenraApp}
	 */
	return (
		<div style={{
		  display: "flex",
		  flexDirection: "column",
		  alignItems: "center"
		  }}>
			<button onClick={onLogin(app)} style={{
			  border: "1px solid black",
			  padding: "5px",
			  margin: "10px 0px"
			  }}>Login</button>
		</div>
	);
}
```

4. Add the function call on the button that will handle the login on the click event.

{:data-file="src/Login.js"}
```js
<button onClick={()=>app.connect()} /* [...] */ />
```


6. Check if the app is connected in the `root.render` from the  `index.js` file.

{:data-file="src/index.js"}
```js
root.render(
  <React.StrictMode>
    {app.lenraSocket?.isConnected() ? (<App app={app} tasks={DATA} />) : (<Login app={app} />)}
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
