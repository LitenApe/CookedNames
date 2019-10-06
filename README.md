CookedNames
==========
[![npm version](https://img.shields.io/npm/v/cookednames?style=for-the-badge)](https://www.npmjs.com/package/cookednames)
[![npm package size](https://img.shields.io/bundlephobia/min/cookednames?style=for-the-badge)](https://www.npmjs.com/package/cookednames)

A simple JavaScript utility function for conditionally concatenating css class names and strings together.

## Usage
The `cookedNames` function takes any number of arguments which can be a string, number, object or list. All truthy arguments will be kept while falsy are discarded.

```js
cookedNames("Hello", "World"); // => "Hello World"
cookedNames("Hello", ["World"]); // => "Hello World"
cookedNames(["Hello"], ["World"]); // => "Hello World"
cookedNames("Hello", {World: true}); // => "Hello World"
cookedNames(["Hello"], {World: true}); // => "Hello World"
cookedNames({Hello: true, World: true}); // => "Hello World"
cookedNames({Hello: true}, {World: true}); // => "Hello World"
```

When used inside an environment with the ability to use computed keys, the function can be used to create compact class name combinations.
```js
const { active, block, disabled, className } = this.props;
cookedNames(
  "button"
  {active},   // true
  {block},    // false
  {disabled}, // true
  className,  // error
); // => "button active disabled error"
```

Arrays will be recursively flattened to allow for nested collection of arguments if desirable.
```js
cookedNames(["Hello", ["World", ["?", ["!"]]]]); // => "Hello World ? !"
```
