const assert = require("assert");
const classNames = require("../");

assert.equal(
  classNames(),
  "",
  "returns empty string by default"
);

// Tests for string arguments
assert.equal(
  classNames("Hello", "World"),
  "Hello World",
  "join strings"
);

assert.equal(
  classNames("Hello", "", "World", ""),
  "Hello World",
  "trim redundant string args"
);

assert.equal(
  classNames("Hello", "Hello", "World", "World"),
  "Hello World",
  "remove duplicates"
);

// Tests for list arguments
assert.equal(
  classNames(["Hello", "World"]),
  "Hello World",
  "spread arrays"
);

assert.equal(
  classNames([]),
  "",
  "returns empty string for empty list"
);

assert.equal(
  classNames(["Hello", "", "World", ""]),
  "Hello World",
  "trim redundant args inside an array"
);

assert.equal(
  classNames(["Hello"], ["World"]),
  "Hello World",
  "handle multiple array arguments"
);

assert.equal(
  classNames(["Hello", ["World"]]),
  "Hello World",
  "handle nested array arguments"
);

assert.equal(
  classNames(["Hello", ["World", ["?", ["!"]]]]),
  "Hello World ? !",
  "handle deeply nested array arguments"
);

assert.equal(
  classNames([[[[[[]]]]]]),
  "",
  "handle nested empty lists"
);

// Tests for object/dict arguments
assert.equal(
  classNames({}),
  "",
  "returns empty string for empty dict"
);

assert.equal(
  classNames({Hello: true, World: true}),
  "Hello World",
  "return object keys as class names"
);

assert.equal(
  classNames({
    whitespace: " ",
    "empty-list": [],
    "greater-zero": 1,
    "empty-object": {},
    "non-empty-list": [1],
    "non-empty-string": "foobar",
    "non-empty-object": {a: 1},
    function: Object.prototype.toString
  }),
  "whitespace empty-list greater-zero empty-object non-empty-list non-empty-string non-empty-object function",
  "return all truthy keys"
);

assert.equal(
  classNames({
    a:false,
    Hello: 1,
    b: 0,
    World: true
  }),
  "Hello World",
  "return only truthy values from object"
);

assert.equal(
  classNames({
    // falsy:
    zero: 0,
    null: null,
    false: false,
    "no-number": NaN,
    "empty-string": "",
    "negative-zero": -0,
    undefined: undefined,

    // truthy
    whitespace: " ",
    "empty-list": [],
    "greater-zero": 1,
    "empty-object": {},
    "non-empty-list": [1],
    "non-empty-string": "foobar",
    "non-empty-object": {a: 1},
    function: Object.prototype.toString
  }),
  "whitespace empty-list greater-zero empty-object non-empty-list non-empty-string non-empty-object function",
  "handle all kinds of truthy and falsy values"
);

// Tests for heterogenous arguments
assert.equal(
  classNames("Hello", {World: true}, 0),
  "Hello World",
  "supports heterogenous arguments"
);

assert.equal(
  classNames([{Hello: true, World: true}]),
  "Hello World",
  "supports lists with dict"
);

assert.equal(
  classNames(["a", ["b", [{c: true}]]]),
  "a b c",
  "handle deep lists with dict"
);
