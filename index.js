(function() {
  /**
   * Utility function to concatenate css classnames in a
   * tidy and simple fashion. Takes in an arbitraty number
   * of arguments and returns all truthy arguments as an
   * css class string.
   * @returns {string | undefined} Returns a css valid combination of classnames
   */
  function cookedNames() {
    "use strict"
    let classes = "";

    for (let i = 0; i < arguments.length; i++) {
      const arg = arguments[i];

      if (!arg) continue;

      const type = typeof arg;

      if (type === "string" || type === "number") {
        classes += `${arg} `;
      } else if (Array.isArray(arg)) {
        const deep = cookedNames(...arg);
        if (deep) classes += `${deep} `;
      } else if (type === "object") {
        for (let key in arg) {
          if (arg[key]) classes += `${key} `;
        }
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
}());
