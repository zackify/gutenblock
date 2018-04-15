import 'react-hot-loader';

function importAll(r) {
  r.keys().forEach(r);
}

importAll(require.context('./src', true, /block.js$/));
