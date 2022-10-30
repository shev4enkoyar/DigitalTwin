import React, { Component } from 'react';
import {Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from '../api-authorization/LoginMenu';
import './NavMenu.css';
import { ThemeContextConsumer } from './../ThemeContext';
import './../../pages/pages.css';
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
            <NavbarToggler onClick={this.toggleNavbar} className={context.theme + (this.props.Gray ? "Gray " : " ") + " mr-2"} />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                {/*<li>
                  <ThemeContextConsumer>
                    {context => (
                        <Nav.Link className={context.theme } onClick={context.toggleTheme}>
                          <img fill="#000000" src={vector} className={context.theme + (props.Gray ? "Gray " : "Icon ") + " icon_for_header"} />
                          Солнышко
                        </Nav.Link>)}
                  </ThemeContextConsumer>
                </li>*/}
                <LoginMenu>
                </LoginMenu>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>)
      }
     </ThemeContextConsumer>
    );
  }
}
