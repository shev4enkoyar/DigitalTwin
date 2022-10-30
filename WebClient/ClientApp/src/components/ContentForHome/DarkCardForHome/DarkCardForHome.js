import './DarkCardForHome.css';
import React from 'react';
import { ThemeContextConsumer } from "../../ThemeContext";
import {Card, Container} from "reactstrap/lib";
function    DarkCardForHome(props) {
    return (
        <ThemeContextConsumer>
            {context => (
                <Card className={props.lightGray + " " + (props.lightGray === "" ? context.theme : "") + " darkCard " +
                (context.theme === "light" ? context.theme +"BorderForCard" : "")} >
                    <Container className={context.theme + " textForCardDarkHome"}>
                        {props.contentForHome}
                    </Container>
                </Card>
            )}
        </ThemeContextConsumer>
        );
} export default DarkCardForHome;