module.exports = function(source) {
  if (this.resource.match(/block.js/))
    return `
    import Import from 'gutenblock-controls/dist/base/import';
    
    ${source}

    Block.edit = props => wp.element.createElement(Import, {...props, load: () => import('./edit')});
   
    if(!Block.save) Block.save = () => ''; 
    
    const { registerBlockType } = wp.blocks;

    registerBlockType("archsystems/${this.resource
      .split('src/')[1]
      .replace('/block.js', '')}", Block)
  `;

  if (this.resource.match(/edit.js/))
    return `
      import { hot } from 'react-hot-loader';
    
      ${source}

      export default hot(module)(Edit)
  `;

  return source;
};
