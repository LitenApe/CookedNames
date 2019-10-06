/**
 * Utility function to concatenate css classnames in a
 * tidy and simple fashion. Takes in an arbitraty number
 * of arguments and returns all truthy arguments as an
 * css class string.
 * @returns {string | undefined} Returns a css valid combination of classnames
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

  let classes = "";

  for (let i = 0; i < arguments.length; i++) {
    const arg = arguments[i];
    
    if (!arg) continue;
    
    const type = getType(arg);

    if (type === "string" || type === "number") {
      classes += `${arg} `;
    } else if (type === "object") {
      for (let key in arg) {
        if (arg[key]) classes += `${key} `;
      }
    } else if (type === "array") {
      const deep = cookedNames.apply(null, arg);
      if (deep) classes += `${deep} `;
    }
  }

  if (!classes) return;

  return classes.trimRight();
}

if (module && module.exports) {
  cookedNames.default = cookedNames;
  module.exports = cookedNames;
} else if (define && define.amd) {
  define("cookednames", [], () => cookedNames);
} else {
  window.cookedNames = cookedNames;
}
