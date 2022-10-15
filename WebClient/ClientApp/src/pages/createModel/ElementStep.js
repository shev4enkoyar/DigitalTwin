import { Button, Container } from 'react-bootstrap';
import './ElementStep.css';
const ElementStep = (props) => {
    
    return (
        <>
            <Container className={(props.progress ? "progressStep" : " ") + " p-1 m-0 d-flex justify-content-center align-items-center"} style={{ minHeight: '55px', width: '13%', height:'100%' }}>
                <div className=" rounded-circle d-flex justify-content-center align-items-center mx-1" style={{
                    backgroundColor: 'white',
                    width: '30px',
                    height: '30px',
                    minWidth: '30px', minHeight: '30px',                }}>
                    <label className="m-0" style={{ color: '#262626', fontFamily: "Open Sans" }}>
                        {props.numberStep}
                    </label>
                </div>
                <label className="textForStep my-0 mx-1" style={{ color: '#ffff', fontFamily: "Open Sans", fontSize: '80%'} }>{props.nameCard}</label>
            </Container>
        </>
    )
}
export default ElementStep;