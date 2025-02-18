let url = '../assets/images/';

// In TypeScript, require does not support dynamic paths because it requires static paths at compile time.
// To handle this, you can declare the types properly and adjust the export.

export default {
  awesome: require(url + 'awesome.png'),
};
