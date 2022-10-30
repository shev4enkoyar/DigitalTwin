import React, {Children, Component} from 'react';
import { NavMenu } from '../navMenu/NavMenu';
import { ThemeContextConsumer } from '../ThemeContext';
export class Layout extends Component {
  static displayName = Layout.name;

  render () {
      let content = Children.count(this.props.children) === 0 ? <p>Some Text</p> : this.props.children
      return (
          <ThemeContextConsumer>
              { 
                  context=>(
                      <div className={context.theme+"Gray "} style={{height: "100%"}} >
                            <NavMenu />
                            <div className={context.theme + "Gray "} style={{height: "calc(100% - 56px)"}}>
                                {content}
                            </div>
                      </div>
                  )
              }
          </ThemeContextConsumer>
    );
  }
}
