import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, NavbarBrand, Button } from 'reactstrap';
import { LoginMenu } from '../api-authorization/LoginMenu';
import './../../pages/pages.css';
import { ThemeContextConsumer } from './../ThemeContext';
import ThemeToggler from "./components/ThemeToggler";
import './NavMenu.css';
export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
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
                <ul style={{ flexDirection: "inherit" }} className="navbar-nav flex-grow">
                    <ThemeToggler />
                    <Button style={{ backgroundColor: 'transparent', border: 'none' }} className={context.theme + "shadow-none"} >
                         <Link to="/adminPanel">
                                 <img fill="#000000" src="https://www.svgrepo.com/show/355353/user-admin.svg" className={context.theme} style={{ filter: 'invert(1)', width: '20px', height: '20px' }} />
                         </Link>
                    </Button>
                    <LoginMenu />
              </ul>
          </Container>
        </Navbar>
      </header>)
      }
     </ThemeContextConsumer>
    );
  }
}
