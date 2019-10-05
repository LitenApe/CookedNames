classNames
==========

A simple JavaScript utility function for conditionally concatenating css class names and strings together.

## Usage
The `classNames` function takes any number of arguments which can be a string, number, object or list. All truthy arguments will be kept while falsy are discarded. Duplicates are also discarded to prevent redundant class names from being injected.

```js
classNames("Hello", "World"); // => "Hello World"
classNames("Hello", ["World"]); // => "Hello World"
classNames(["Hello"], ["World"]); // => "Hello World"
classNames("Hello", {World: true}); // => "Hello World"
classNames(["Hello"], {World: true}); // => "Hello World"
classNames({Hello: true, World: true}); // => "Hello World"
classNames({Hello: true}, {World: true}); // => "Hello World"
```

When used inside an environment with the ability to use computed keys, the function can be used to create compact class name combinations.
```js
const { active, block, disabled, className } = this.props;
classNames(
  "button"
  {active},   // true
  {block},    // false
  {disabled}, // true
  className,  // error
); // => "button active disabled error"
```

Arrays will be recursively flattened to allow for nested collection of arguments of desirable.
```js
classNames(["Hello", ["World", ["?", ["!"]]]]); // => "Hello World ? !"
```
