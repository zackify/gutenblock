import React from 'react';

const { Button } = wp.components;

export default class Repeat extends React.Component {
  constructor({ attribute, attributes }) {
    super();
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);

    let items =
      attributes && attributes[attribute] ? attributes[attribute] : [];
    this.state = { items: items.length };
  }

  static getDerivedStateFromProps({ attributes, attribute }, state) {
    let items =
      attributes && attributes[attribute] ? attributes[attribute] : [];
    if (items.length !== state.items) return { items: items.length };

    return null;
  }

  update(name, value, tabId, onChange) {
    let { attribute, attributes } = this.props;

    let currentAttributes = attributes[attribute] || [];

    let foundAttribute = currentAttributes.find(
      (attr, index) => index === tabId
    );
    let newAttributes;
    if (!foundAttribute)
      newAttributes = [...currentAttributes, { [name]: value }];
    else
      newAttributes = currentAttributes.map(
        (attr, index) => (index === tabId ? { ...attr, [name]: value } : attr)
      );

    return onChange(attribute, newAttributes);
  }

  delete(tabId, onChange) {
    let { attribute, attributes } = this.props;

    let newAttributes = attributes[attribute].filter(
      (attr, index) => index !== tabId
    );

    return onChange(attribute, newAttributes);
  }

  renderChildren(index) {
    let {
      attribute,
      children,
      setAttributes,
      attributes,
      onChange,
    } = this.props;

    return (
      <div
        style={{
          marginLeft: '10px',
          marginTop: '15px',
        }}
      >
        {React.Children.map(children, child =>
          React.cloneElement(child, {
            key: index,
            index,
            setAttributes,
            attributes:
              attributes &&
              attributes[attribute] &&
              attributes[attribute][index]
                ? attributes[attribute][index]
                : {},
            onChange: (name, value) =>
              this.update(name, value, index, onChange),
          })
        )}
        <div onClick={() => this.delete(index, onChange)}>Delete item</div>
      </div>
    );
  }

  render() {
    let { items } = this.state;
    let { style, title, indent, addNew, max } = this.props;

    let repeats = [];
    for (let item = 0; item < items; item++) {
      repeats.push(this.renderChildren(item));
    }

    return (
      <div style={style}>
        <h1>{title}</h1>
        <div>
          {repeats}
          <div style={{ marginTop: '10px' }}>
            {max > items || !max ? (
              <Button
                isPrimary
                onClick={() => this.setState({ items: items + 1 })}
              >
                {addNew}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
