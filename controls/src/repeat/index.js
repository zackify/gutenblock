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

  update(name, value, tabId, parentChange, customUpdate) {
    let { attribute, attributes, setAttributes } = this.props;

    //if nested repeats, pass state up to top most one
    if (parentChange) {
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

      return parentChange(attribute, newAttributes);
    }

    let topLevel = [...attributes[attribute]];

    topLevel[tabId] = { ...topLevel[tabId], [name]: value };

    setAttributes({ [attribute]: topLevel });
  }

  delete(childAttributes, childAttribute, tabId, onDelete, customDelete) {
    let { attribute, attributes, setAttributes } = this.props;

    let newAttributes;
    if (!childAttributes)
      newAttributes = attributes[attribute].filter(
        (attr, index) => index !== tabId
      );

    if (childAttributes) {
      let newItem = {
        ...attributes[attribute][tabId],
        [childAttribute]: childAttributes,
      };
      newAttributes = attributes[attribute].map(
        (item, index) => (index === tabId ? newItem : item)
      );
    }

    if (onDelete) return onDelete(newAttributes, attribute);

    setAttributes({ [attribute]: newAttributes });
  }

  renderChildren(index) {
    let {
      attribute,
      children,
      setAttributes,
      attributes,
      onChange,
      onDelete,
    } = this.props;

    return React.Children.map(children, child =>
      React.cloneElement(child, {
        key: index,
        index,
        setAttributes,
        attributes:
          attributes && attributes[attribute] && attributes[attribute][index]
            ? attributes[attribute][index]
            : {},
        onChange: (name, value) =>
          this.update(name, value, index, onChange, child.onUpdate),
        onDelete: (childAttributes, childAttribute) =>
          this.delete(
            childAttributes,
            childAttribute,
            index,
            onDelete,
            child.onDelete
          ),
        style: {
          marginLeft: '10px',
          marginTop: '15px',
        },
      })
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
