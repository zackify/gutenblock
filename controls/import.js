import React from 'react';

export default class Import extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    let component = await this.props.load();

    this.setState({ component: component.default });
  }
  render() {
    let { component } = this.state;
    let { load, ...props } = this.props;
    if (!component) return '';
    return React.createElement(component, { ...props });
  }
}
