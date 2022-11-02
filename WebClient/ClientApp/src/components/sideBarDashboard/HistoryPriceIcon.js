
/*import historyPriceIcon from '../data/HistoryPriceIcon.svg';*/
import React from "react";
import { NavLink } from "reactstrap/lib";
function HistoryPriceIcon(props) {

	return (


		<NavLink onClick={() => { props.updateActive() }} >
			<img style={{width:'14px'}} />
		</NavLink >
	)
} export default HistoryPriceIcon;