import React, { Component } from 'react';
import { Cookies } from 'react-cookie';
const { Provider, Consumer } = React.createContext("dark");
class ThemeContextProvider extends Component {
    state = {
        //theme: JSON.parse(localStorage.getItem('ThemeSave')) || "dark"
        theme: (new Cookies()).get('ThemeSave') || "dark"
    };
    toggleTheme = () => {
        this.setState(prevState => {
            const themeSave = prevState.theme === "light" ? "dark" : "light";
            const cookie = new Cookies();
            cookie.set('ThemeSave', themeSave);
            //localStorage.setItem('ThemeSave', JSON.stringify(themeSave));
            console.log(JSON.parse(localStorage.getItem('ThemeSave')));
            return {
                theme: cookie.get('ThemeSave')
                
            };
        });
    };
    render() {

        return (
            <Provider value={
                {
                    theme: this.state.theme,
                    toggleTheme:this.toggleTheme
                }
            } >
                {this.props.children}
            </Provider>
            );
    }
} export { ThemeContextProvider, Consumer as ThemeContextConsumer };