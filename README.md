# Contents

* [Install](#install)
* [Comparison with competition](#create-guten-block-vs-this)
* [Coming Soon](#coming-soon)
* [Usage](#usage)
* [Creating a Block](#creating-a-block)

# Install

`npm install gutenblock -g`

This is a plugin boilerplate + reusable inspector components + hot loading + code splits all built in for gutenberg.

# Quickstart

Follow this guide that [@ericclemmons](http://github.com/ericclemmons) wrote while watching the tutorial video I made https://gist.github.com/ericclemmons/e6b3563e5d8fb0f3b9e55f67dea455e9. It will get you creating a block within a few minutes.

# create-guten-block vs this

[Create Guten Block](https://github.com/ahmadawais/create-guten-block) is another tool out there for making blocks.

| Feature                                | CGB | This Package |
| -------------------------------------- | :-: | -----------: |
| Auto Block registration                | No  |          Yes |
| Automated Attribute changing           | No  |          Yes |
| Automatic code splitting               | No  |          Yes |
| Hot reloading (without page reload)    | No  |          Yes |
| Custom webpack config without ejection | No  |         Soon |

**Auto Block registration**

No need to call `registerBlockType` for wordpress. Our loader does this for you.

**Auto Attribute changing**

Currently, when editing things in gutenberg you make components like this:

```js
const { RichText } = wp.blocks;

export default ({ setAttributes, attributes }) => (
  <div>
    <RichText
      tagName="h1"
      value={attributes.title}
      placeholder="Title"
      onChange={title => setAttributes({ title })}
    />
  </div>
);
```

With Gutenblock, we created a higher order context that is loaded into all edit components. This means you can import our abstracted inputs:

```js
import { RichText } from 'gutenblock-controls';

const Edit = () => (
  <div>
    <RichText name="description" />
  </div>
);
```

The name field is the key in your gutenberg attributes defined in `block.js`. You can create your own inputs that connect and get access to `setAttributes` and `attributes`, no longer needing to pass them all over in your components. [See the example](/controls/src/form/rich-text.js)

**Code splitting**

If you have many blocks, you don't want Gutenberg to load all of that JS when it initializes. With this plugin, your edit blocks will only be loaded in once they are dragged out to the canvas.

**Hot reloading**

Every edit block is hooked into react-hot-loader with our loader so that updates won't need a full page load. Full reloads can make development much slower when Gutenberg has a lot of content on the page at once.

**Custom Webpack**

Coming soon: If you need to customize our zero-config utility, you can add `dev.config.js` and `prod.config.js` to your plugin folder and it will be used instead of ours.

# Coming Soon

* Inspector tools for repeat actions (adding multiple items recursively, ex: tabs with products in each)
* Automatic i18n

* Handling the `save` method

Currently, we don't use wordpress to render blocks, so we don't use this. But I will be working to make this part better if needed.

# Usage

`gutenblock init` will scaffold out a wordpress plugin for you.

`gutenblock watch` inside the folder will start development mode. Copy the blocks folder into your plugins directory, or [use docker](https://gist.github.com/zackify/d8e428f93e018c3fbcce512414d02e62)

`gutenblock build` production build the plugin. After, edit line 35 of `yourplugin/src/init.php` to point to the production assets. All set to publish!

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
import { RichText } from 'gutenblock-controls';

const Edit = () => (
  <RichText tagName="p" name="body" style={{ color: 'white' }} />
);
```

That's it, no registering blocks, importing them into a root folder. It's all done for you!

Now we cam run `gutenblock watch` inside our plugin folder. Inside wordpress the components will hot reload as you edit, thanks to [react-hot-loader](https://github.com/gaearon/react-hot-loader)

You can read more about the [Block API](https://wordpress.org/gutenberg/handbook/block-api/)
