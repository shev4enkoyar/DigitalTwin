import React, { Component } from 'react';
import {Collapse, Container, Navbar, NavbarBrand, NavbarToggler} from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from '../api-authorization/LoginMenu';
import './NavMenu.css';
import { ThemeContextConsumer } from './../ThemeContext';
import './../../pages/pages.css';
import ThemeToggler from "./components/ThemeToggler";
export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
      return (
     <ThemeContextConsumer>{
     context => (
       <header className={context.theme + (this.props.Gray ? "Gray " : " " + context.theme +"ForInsideCardShadow ")}>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white box-shadow  " dark>
          <Container >
            <NavbarBrand className={context.theme + (this.props.Gray ? "Gray " : " ")} tag={Link} to="/">AgroDigitalTwin</NavbarBrand>
              <ul style={{flexDirection: "inherit"}} className="navbar-nav flex-grow">
                <ThemeToggler />
                <LoginMenu/>
              </ul>
          </Container>
        </Navbar>
      </header>)
      }
     </ThemeContextConsumer>
    );
  }
}
