/**
 * Retrieves and returns lower cased string of the object type.
 * @param {*} obj 
 * @returns {string} string | number | boolean | object | array | arguments | function | error | date | regexp | undefined | null
 */
function getType(obj) {
  const objectType = Object.prototype.toString.call(obj);
  return objectType.match(/\[\w+ (\w+)\]/)[1].toLowerCase();
}

function classNames() {
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
      classes.add(classNames(...arguments[i]));
    }
  }

  return Array.from(classes).join(" ");
}

if (module && module.exports) {
  classNames.default = classNames;
  module.exports = classNames;
} else if (define && define.amd) {
  define("classnames", [], () => classNames);
} else {
  window.classNames = classNames;
}
