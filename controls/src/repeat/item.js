import React from 'react';
import Caret from './caret';

export default class Item extends React.Component {
  constructor({ collapsable }) {
    super();
    this.state = { collapsed: collapsable };
  }

  render() {
    let { collapsed } = this.state;
    let { children, deleteButton, first, collapsable, title } = this.props;
    return (
      <React.Fragment>
        {collapsable ? (
          <div style={{ display: 'flex' }}>
            <h2 style={{ marginRight: 10 }}>{title}</h2>
            {first}
            <div
              style={{
                marginLeft: 20,
                padding: 10,
                justifyContent: 'center',
                alignSelf: 'center',
              }}
              onClick={() => this.setState({ collapsed: !collapsed })}
            >
              <Caret rotate={collapsed ? 90 : -90} color="#0085ba" />
            </div>
          </div>
        ) : null}
        {collapsed ? null : children}
        {collapsed ? null : deleteButton}
      </React.Fragment>
    );
  }
}
