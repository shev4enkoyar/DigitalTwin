//import React, { Component } from 'react';

//function Combobox() {
//    state = {
//        isOpen1: false
//    };
//    toggleOpen1 = () => setTimeout(() => { this.setState({ isOpen1: !this.state.isOpen1}); }, 150);
//    Blur1 = () => setTimeout(() => { this.setState({ isOpen1: false}); }, 150);

//        const menuClass1 = `dropdown-menu${this.state.isOpen1 ? " show" : ""}`;
//        return (
//            <>
//                <div className="dropdown" onClick={this.toggleOpen1} onBlur={this.Blur1}>
//    <a href="#nogo"
//        className="nav-link text-wrap dropdown-toggle show text_header"
//        type="button"
//        data-toggle="dropdown"
//        aria-haspopup="true"
//    ></a>
//    <div className={menuClass1} id="id1" /*aria-labelledby="dropdownMenuButton"*/ onClick={this.toggleOpen1} >
//        <a className="dropdown-item" href="/dir#director">
//            </a>
//        <a className="dropdown-item" href="/dir#zav_inst">
//                            ќвес</a>
//        <a className="dropdown-item" href="/dir#zav_inst">
//                            –ис</a>
//    </div>
//                </div>
//            </>
//        )
//    }export default Combobox;