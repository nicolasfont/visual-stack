const noop = () => null;

require.extensions['.css'] = noop;
require.extensions['.md'] = noop;
