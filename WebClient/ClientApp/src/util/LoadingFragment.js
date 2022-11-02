import {PropagateLoader} from "react-spinners";
import React, {useEffect, useState} from "react";
import {Container} from "reactstrap";



export const LoadingFragment = (props) => {
    const override = props.fullscreen ? "justify-content-center h-100 align-items-center d-flex" : "";
    return(
        <Container className={override} >
            <PropagateLoader  color="#ffc521" />
        </Container>
    );
};