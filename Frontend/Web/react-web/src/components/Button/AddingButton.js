import './Buttons.css';
import { Container } from 'react-bootstrap';
function AddingButton(props) {

	return (
		<button type="submit" className="btn blueBut" >
			<Container style={{
				display: 'flex',
				margin: '0%',
				padding: '0%',
				alignItems: 'center' } } >
				<svg fill="#228BE6" xmlns="http://www.w3.org/2000/svg" viewBox="10 10 46 46" className={"plus " + props.ClassName} >
					<path d="M32,10c12.15,0,22,9.85,22,22s-9.85,22-22,22s-22-9.85-22-22S19.85,10,32,10z 
M40,34c1.104,0,2-0.895,2-2	c0-1.105-0.896-2-2-2c-0.248,0-2.913,0-6,0c0-3.087,0-5.752,0-6c0-1.104-0.895-2-2-2c-1.104,
0-2,0.896-2,2c0,0.248,0,2.913,0,6	c-3.087,0-5.752,0-6,0c-1.104,0-2,0.895-2,2c0,1.105,0.896,2,2,2c0.248,0,2.913,0,6,0c0,3.087,
0,5.752,0,6c0,1.104,0.896,2,2,2	c1.105,0,2-0.896,2-2c0-0.248,0-2.913,0-6C37.087,34,39.752,34,40,34z" />
				</svg>
				<p className={ "textOpenSans "+props.ClassName}>{props.textForButton}</p>
			</Container>
			</button>
	)
} export default AddingButton;