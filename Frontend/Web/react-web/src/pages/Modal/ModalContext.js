import React, { Component } from 'react';
const { Provider, Consumer } = React.createContext(false);
class ModalContextProvider extends Component {
    state = {
        modal: JSON.parse(localStorage.getItem('ModalSave')) || false
    };
    toggleModal = () => {
        this.setState(prevState => {
            const modalSave = prevState.modal
            localStorage.setItem('ModalSave', JSON.stringify(modalSave));
            console.log(JSON.parse(localStorage.getItem('ModalSave')));
            return {
                modal: JSON.parse(localStorage.getItem('ModalSave'))

            };
        });
    };
    
    render() {
        return (
            <Provider value={
                {
                    modal: this.state.modal,
                    toggleModal: this.toggleModal
                }
            } >
                {this.props.children}
            </Provider>
        );
    }
} export { ModalContextProvider, Consumer as ModalContextConsumer };