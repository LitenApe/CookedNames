/**
 * Utility function to concatenate css classnames in a
 * tidy and simple fashion. Takes in an arbitraty number
 * of arguments and returns all truthy arguments as an
 * css class string.
 */
function cookedNames() {
  "use strict"
  /**
   * Retrieves and returns lower cased string of the object type.
   * @param {*} obj 
   * @returns {string} string | number | boolean | object | array | arguments | function | error | date | regexp | undefined | null
   */
  function getType(obj) {
    const objectType = Object.prototype.toString.call(obj);
    return objectType.match(/\[\w+ (\w+)\]/)[1].toLowerCase();
  }

  const classes = new Set();

  for (let i = 0; i < arguments.length; i++) {
    const type = getType(arguments[i])

    if (!arguments[i]) {
      continue;
    }

    if (type === "string" || type === "number") {
      classes.add(arguments[i]);
    } else if (type === "object") {
      for (let key in arguments[i]) {
        if (arguments[i][key]) {
          classes.add(key);
        }
      }
    } else if (type === "array") {
      classes.add(cookedNames(...arguments[i]));
    }
  }

  const processedClasses = Array.from(classes).filter(c => c);

  if (processedClasses.length === 0) {
    return;
  }

  return processedClasses.join(" ");
}

if (module && module.exports) {
  cookedNames.default = cookedNames;
  module.exports = cookedNames;
} else if (define && define.amd) {
  define("cookedNames", [], () => cookedNames);
} else {
  window.cookedNames = cookedNames;
}
