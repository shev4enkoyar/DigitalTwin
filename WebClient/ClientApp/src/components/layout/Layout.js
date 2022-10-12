import React, { Component } from 'react';
import { NavMenu } from '../navMenu/NavMenu';
export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div style={{height: "100%"}} >
        <NavMenu />

        <div style={{height: "calc(100% - 56px)"}}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
