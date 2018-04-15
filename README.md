`npm install gutenblock`

This is a plugin boilerplate + reusable inspector components + hot loading all built in for gutenberg!

# create-guten-block vs this

[Create Guten Block](https://github.com/ahmadawais/create-guten-block) is another tool out there for making blocks.

| Feature                                | CGB | This Package |
| -------------------------------------- | :-: | -----------: |
| Auto Block registration                | No  |          Yes |
| Hot reloading (without page reload)    | No  |          Yes |
| Custom webpack config without ejection | No  |          Yes |

# Coming Soon

* Inspector tools for repeat actions (adding multiple items recursively, ex: tabs with products in each)
* Automatic i18n

# Usage

`gutenblock init` will scaffold out a wordpress plugin for you.

# Creating a block

Inside `src` you will create blocks matching the `example` one.

All blocks need a `block.js` and `edit.js`.

`./src/paragraph/block.js`

```js
const Block = {
  title: 'Paragraph',
  icon: 'shield-alt',
  category: 'common',
  attributes: {
    body: {
      type: 'string',
    },
  },
};
```

`./src/paragraph/edit.js`

```js
const { RichText } = wp.blocks;

const Edit = ({ attributes, setAttributes, isSelected }) => {
  let { description } = attributes;
  return (
    <div>
      <RichText
        tagName="p"
        value={description}
        placeholder="Description"
        onChange={title => setAttributes({ description })}
      />
    </div>
  );
};
```

That's it, no registering blocks, importing them into a root folder. It's all done for you!

Now we cam run `gutenblock watch` inside our plugin folder. Inside wordpress the components will hot reload as you edit, thanks to [react-hot-loader](https://github.com/gaearon/react-hot-loader)

You can read more about the [Block API](https://wordpress.org/gutenberg/handbook/block-api/)

# Editing Components

We included a few helper components for inspector controls. We know this is not the ideal way to edit components in gutenberg, but it is much faster for those on a time crunch like us. You can see an example using editing inside gutenberg itself without the inspector too.
