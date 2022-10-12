import React, { Component } from 'react';
const { Provider, Consumer } = React.createContext("dark");
class ThemeContextProvider extends Component {
    state = {
        theme: JSON.parse(localStorage.getItem('ThemeSave')) || "dark"
    };
    toggleTheme = () => {
        this.setState(prevState => {
            const themeSave = prevState.theme === "light" ? "dark" : "light";
            localStorage.setItem('ThemeSave', JSON.stringify(themeSave));
            console.log(JSON.parse(localStorage.getItem('ThemeSave')));
            return {
                theme: JSON.parse(localStorage.getItem('ThemeSave'))
                
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