const assert = require("assert");
const cookedNames = require("../");

assert.equal(
  cookedNames(),
  "",
  "returns empty string by default"
);

// Tests for string arguments
assert.equal(
  cookedNames("Hello", "World"),
  "Hello World",
  "join strings"
);

assert.equal(
  cookedNames("Hello", "", "World", ""),
  "Hello World",
  "trim redundant string args"
);

assert.equal(
  cookedNames("Hello", "Hello", "World", "World"),
  "Hello World",
  "remove duplicates"
);

// Tests for list arguments
assert.equal(
  cookedNames(["Hello", "World"]),
  "Hello World",
  "spread arrays"
);

assert.equal(
  cookedNames([]),
  "",
  "returns empty string for empty list"
);

assert.equal(
  cookedNames(["Hello", "", "World", ""]),
  "Hello World",
  "trim redundant args inside an array"
);

assert.equal(
  cookedNames(["Hello"], ["World"]),
  "Hello World",
  "handle multiple array arguments"
);

assert.equal(
  cookedNames(["Hello", ["World"]]),
  "Hello World",
  "handle nested array arguments"
);

assert.equal(
  cookedNames(["Hello", ["World", ["?", ["!"]]]]),
  "Hello World ? !",
  "handle deeply nested array arguments"
);

assert.equal(
  cookedNames([[[[[[]]]]]]),
  "",
  "handle nested empty lists"
);

// Tests for object/dict arguments
assert.equal(
  cookedNames({}),
  "",
  "returns empty string for empty dict"
);

assert.equal(
  cookedNames({Hello: true, World: true}),
  "Hello World",
  "return object keys as class names"
);

assert.equal(
  cookedNames({
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
  cookedNames({
    a:false,
    Hello: 1,
    b: 0,
    World: true
  }),
  "Hello World",
  "return only truthy values from object"
);

assert.equal(
  cookedNames({
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
  cookedNames("Hello", {World: true}, 0),
  "Hello World",
  "supports heterogenous arguments"
);

assert.equal(
  cookedNames([{Hello: true, World: true}]),
  "Hello World",
  "supports lists with dict"
);

assert.equal(
  cookedNames(["a", ["b", [{c: true}]]]),
  "a b c",
  "handle deep lists with dict"
);
