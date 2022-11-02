
import React from "react";
import { NavLink } from "reactstrap/lib";
function GraphicIcon(props) {

	return (


		<NavLink onClick={() => { props.updateActive() }} >
			<img className="imgForPanel"  />
		</NavLink >
	)
} export default GraphicIcon;