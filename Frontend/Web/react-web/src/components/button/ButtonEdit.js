import './Buttons.css';
import { Container } from 'react-bootstrap';
function ButtonEdit(props) {

	return (
		<button onClick={props.onClick}  type="submit" className={props.className + " btn"} style={props.buttonStyle}>
			<Container style={{
				display: 'flex',
				margin: '0%',
				padding: '0%',
                alignItems:'center',
				justifyContent: 'center' } }  >
				<img style={{display: props.image?"block":"none"}} fill="#228BE6" src={props.image} className={props.imageClassName}/>
				<p style={props.textStyle} className={props.classTextName}>{props.textForButton}</p>
			</Container>
		</button>
	)
} export default ButtonEdit;