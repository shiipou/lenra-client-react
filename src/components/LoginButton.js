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
