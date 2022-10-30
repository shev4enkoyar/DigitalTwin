import React, {Component} from "react";
import { ThemeContextConsumer } from '../../../ThemeContext';
import '../../NavMenu.css'
import {Button, Whisper} from "rsuite";
import RenderProfileContent from "./renderProfileContent";

class ProfileDropDown extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
          <ThemeContextConsumer>
           {context => (
               <Whisper placement="bottomStart" trigger="click" speaker={RenderProfileContent}>
                   <Button className="background-transparent">
                       <img className={context.theme + "Icon" + " icon"} src="https://www.svgrepo.com/show/333287/profile.svg"/>
                   </Button>

               </Whisper>
          )}
        </ThemeContextConsumer>
        );
    }


}

export default ProfileDropDown;