import React from 'react';

const { Button } = wp.components;

let getItems = ({ attributes, attribute }) =>
  attributes && attributes[attribute] ? attributes[attribute] : [];

export default class Repeat extends React.Component {
  constructor() {
    super();
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  add() {
    let { attribute, onChange } = this.props;

    onChange(attribute, [...getItems(this.props), {}]);
  }

  update(name, value, tabId, onChange) {
    let { attribute } = this.props;

    let currentAttributes = getItems(this.props);

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
    let { style, title, indent, addNew, max } = this.props;

    let items = getItems(this.props).length;

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
              <Button isPrimary onClick={() => this.add()}>
                {addNew}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
