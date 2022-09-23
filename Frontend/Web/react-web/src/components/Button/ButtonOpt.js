import './Buttons.css';
import { Container } from 'react-bootstrap';
function ButtonOpt(props) {

	return (
		<button type="submit" className="btn blueBut" style={{ borderRadius: '2px'} }>
			<Container style={{
				display: 'flex',
				margin: '0px 10px',
				padding: '0px',
				alignItems: 'center'
			}} >
				<p className={"textOpenSans14 " + props.ClassName}>{props.textForButton}</p>
			</Container>
		</button>
	)
} export default ButtonOpt;