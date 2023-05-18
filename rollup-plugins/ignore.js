export default function (options = {}) {
  // Files need to be absolute paths.
  // This only works if the file has no exports
  // and only is imported for its side effects
  const files = options.files || [];
  const debug = !!options.debug;

  if (files.length === 0) {
    return {
      name: 'ignore',
    };
  }

  return {
    name: 'ignore',

    load(id) {
      if (files.some(toIgnorePath => id.startsWith(toIgnorePath))) {
        debug && console.log('\x1b[31mIGNORE\x1b[0m:', `\x1b[37m${id}\x1b[0m`);
        return { code: '' };
      } else {
        debug && console.log('\x1b[33mPASS\x1b[0m:  ', `\x1b[37m${id}\x1b[0m`);
        return null;
      }
    },
  };
}
