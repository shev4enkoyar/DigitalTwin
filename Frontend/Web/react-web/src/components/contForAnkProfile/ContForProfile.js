import React, { Component } from 'react';
import { ThemeContextConsumer } from '../ThemeContext.js';
import InsideCardForBody from '../insideCardForBody/InsideCardForBody';
import CardForBody from '../cardForBody/CardForBody';
import './ContForProfile.css';
import { Container } from 'react-bootstrap';
import Input from '../input/Input';
import GPlus from './../logo/G+';
import Yandex from './../logo/Yandex';
import VK from './../logo/VK';
import ButtonEdit from '../button/ButtonEdit';
const ContForProfile = (props) => {
    return (
        <Container className={props.classNameForContMain}>
            {props.dopCont}
            <InsideCardForBody>
                <p className={props.classNameForP} >
                    {props.nameCard}
                </p>
                <Container style={{ padding: '2px 5px' }}>
                    {props.children}
                </Container>
            </InsideCardForBody>
        </Container >
    );
}; export default ContForProfile;