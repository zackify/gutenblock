const { getOptions } = require('loader-utils');
const validateOptions = require('schema-utils');

const schema = {
  type: 'object',
  properties: {
    pluginFolderName: {
      type: 'string',
    },
  },
};

module.exports = function(source) {
  const options = getOptions(this);
  validateOptions(schema, options, 'Gutenberg Loader');

  if (this.resource.match(/block.js/)) {
    //grab the plugin folder name
    let pluginName = `${this.resource
      .split('src/')[1]
      .replace('/block.js', '')}`;

    /*
      Replace slashes with double dash, wordpress doesnt support blocks/test/plugin-name
      This way you can have sub folders
    */

    pluginName = `${options.pluginFolderName}/${pluginName.replace('/', '--')}`;

    return `
      import { Import } from 'gutenblock-controls';
      
      ${source}

      Block.edit = props => <Import {...props} load={() => import('./edit')} />;
    
      if(!Block.save) Block.save = () => ''; 
      
      const { registerBlockType } = wp.blocks;

      registerBlockType("${pluginName}", Block)
    `;
  }
  if (this.resource.match(/edit.js/))
    return `
      import { hot } from 'react-hot-loader';
    
      ${source}

      export default hot(module)(Edit)
  `;

  return source;
};
