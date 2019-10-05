/**
 * Retrieves and returns lower cased string of the object type.
 * @param {*} obj 
 * @returns {string} string | number | boolean | object | array | arguments | function | error | date | regexp | undefined | null
 */
function getType(obj) {
  const objectType = Object.prototype.toString.call(obj);
  return objectType.match(/\[\w+ (\w+)\]/)[1].toLowerCase();
}

function cookedNames() {
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

  return Array.from(classes).join(" ");
}

if (module && module.exports) {
  cookedNames.default = cookedNames;
  module.exports = cookedNames;
} else if (define && define.amd) {
  define("cookedNames", [], () => cookedNames);
} else {
  window.cookedNames = cookedNames;
}
