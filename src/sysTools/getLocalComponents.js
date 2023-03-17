const path = require('path');
const getAllFiles = require('./getAllFiles');

module.exports = (exceptions = []) => {
  let localComponents = [];

  const componentCategories = getAllFiles(
    path.join(__dirname, '..', 'components'),
    true
  );

  for (const componentCategory of componentCategories) {
    const componentFiles = getAllFiles(componentCategory);

    for (const componentFile of componentFiles) {
      const componentObject = require(componentFile);

      if (exceptions.includes(componentObject.data.name)) {
        continue;
      }

      localComponents.push(componentObject);
    }
  }

  return localComponents;
}
