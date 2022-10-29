
/*import recIcon from '../data/RecIcon.svg';*/
import React from "react";
import {NavLink} from "reactstrap/lib";
function RecIcon(props) {

	return (


		<NavLink onClick={() => { props.updateActive() }} >
			<img className="imgForPanel"  />
		</NavLink >
	)
} export default RecIcon;