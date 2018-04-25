# Contents

* [Install](#install)
* [Comparison with competition](#comparison-with-other-tooling)
* [Future Plans](#future-plans)
* [Usage](#usage)
* [Creating a Block](#creating-a-block)

# Install

`npm install gutenblock -g`

This is a plugin boilerplate + reusable inspector components + hot loading + code splits all built in for gutenberg.

# Quickstart

If you have never done WordPress development, getting started couldn't be easier.

* [Install Docker](https://store.docker.com/search?type=edition&offering=community)
* `gutenblock init && cd blocks`
* `gutenblock watch docker`

When you add `docker` on the end of the watch command, it will bring up WordPress for you. Simply create an account, install the Gutenberg plugin, and activate the blocks plugin. You're all set.

# Comparison with other tooling

Currently, there is only one tool out there to help create blocks (that I have found so far). It's called [Create Guten Block](https://github.com/ahmadawais/create-guten-block). This library was inspired by it. I've added what I consider to be good defaults that *everyone* would want when creating blocks. These features are not included in other libraries by default:

- Auto Block registration             
- Helper utlities         
- Automatic code splitting               
- Hot reloading (without page reload)    
- Custom webpack config without ejection 

**Auto Block registration**

No need to call `registerBlockType` for WordPress. Our loader does this for you.

**Helper utilities**

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

We've included a `Select` `MediaSelect` `Input` `Inspector` `Repeat` and other form fields to help you build blocks faster. A repeat component will handle the hard work of letting users add infinite items to an array of form fields, replacing items, and deleting them.

The name field is the key in your gutenberg attributes defined in `block.js`. You can create your own inputs that connect and get access to `setAttributes` and `attributes`, no longer needing to pass them all over in your components. [See the example](/controls/src/form/rich-text.js)

**Code splitting**

If you have many blocks, you don't want Gutenberg to load all of that JS when it initializes. With this plugin, your edit blocks will only be loaded in once they are dragged out to the canvas.

**Hot reloading**

Every edit block is hooked into react-hot-loader with our loader so that updates won't need a full page load. Full reloads can make development much slower when Gutenberg has a lot of content on the page at once.

**Custom Webpack**

Add a `gutenblock.config.js` file in your blocks folder. It looks like this:

```js
const path = require('path');

module.exports = {
  resolve: {
    alias: {
      shared: path.resolve(__dirname, '../src/shared'),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [require.resolve('style-loader'), require.resolve('css-loader')],
      },
    ],
  },
};
```

The configuration is the exact same as webpack with one extra piece: pass `babelOptions` with plugins and presets like a babelrc has to customize the babel loader.

If you choose to extend the configuration, down the road a future webpack release may require you to make changes and update your configuration. If you do not extend anything, you'll never have to update any configuration in order to upgrade gutenblock! 

# Future plans

* Automatic i18n
* Complicated examples (tabs component, loading in data from wordpress)
* Test coverage
* Batch updates when updating nested tabs that cause lots of rerenders in Gutenberg

# Usage

`gutenblock init` will scaffold out a wordpress plugin for you.

`gutenblock watch` inside the folder will start development mode. Copy the blocks folder into your plugins directory, or [use docker](https://gist.github.com/zackify/d8e428f93e018c3fbcce512414d02e62)

`gutenblock build` production build the plugin. After, edit line 35 of `yourplugin/src/init.php` to point to the production assets. All set to publish!

# Creating a block

Inside `src` you will create blocks matching the `example` one.

All blocks need a `block.js` and `edit.js`.

`./src/paragraph/block.js`

```js
//Optionally use a save block for static rendering on the wordpress frontend

import Save from './save';

const Block = {
  title: 'Paragraph',
  icon: 'shield-alt',
  category: 'common',
  attributes: {
    body: {
      type: 'string',
    },
  },
  save: Save,
};
```

`./src/paragraph/edit.js`

```js
import { RichText } from 'gutenblock-controls';

const Edit = () => (
  <RichText tagName="p" name="body" style={{ color: 'white' }} />
);
```

`./src/paragraph/save.js`

```js
export default ({ attributes }) => <p>{attributes.body}</p>;
```

Side note: We don't use save blocks at Crossfield. This is because we fetch wordpress pages and posts via the api and render the blocks using a custom react frontend. Sadly, if you use save blocks, they will not be code split. This is a limitation of the gutenberg editor not supporting awaiting to render the save method.

No registering blocks, importing them into a root folder. It's all done for you.

Now we can run `gutenblock watch` inside our plugin folder. Inside wordpress the components will hot reload as you edit, thanks to [react-hot-loader](https://github.com/gaearon/react-hot-loader)

You can read more about the [Block API](https://wordpress.org/gutenberg/handbook/block-api/)
