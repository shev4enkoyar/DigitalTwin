import React from 'react';
import { Card, Container } from "reactstrap/lib";
import { ThemeContextConsumer } from "../../ThemeContext";
import './DarkCardForHome.css';
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