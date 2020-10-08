function readPackage(pkg, context) {
  if (pkg.name === '@julienne/react') {
    delete pkg.dependencies['mini-css-extract-plugin'];
  }

  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};
