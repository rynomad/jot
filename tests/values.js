var assert = require('assert')
var values = require("../jot/values.js");

// apply

assert.equal(
	values.apply(values.NO_OP(), "1"),
	"1");

assert.equal(
	values.apply(values.REP("1", "2"), "1"),
	"2");

assert.equal(
	values.apply(values.MAP("add", 5), 1),
	6);
assert.equal(
	values.apply(values.MAP("rot", [5, 3]), 1),
	0);
assert.equal(
	values.apply(values.MAP("mult", 5), 2),
	10);
assert.equal(
	values.apply(values.MAP("xor", true), true),
	false);
assert.equal(
	values.apply(values.MAP("xor", true), false),
	true);
assert.equal(
	values.apply(values.MAP("xor", false), true),
	true);
assert.equal(
	values.apply(values.MAP("xor", false), false),
	false);

// simplify

assert.deepEqual(
	values.simplify(values.NO_OP()),
	values.NO_OP());

assert.deepEqual(
	values.simplify(values.REP(0, 1)),
	values.REP(0, 1));
assert.deepEqual(
	values.simplify(values.REP(0, 0)),
	values.NO_OP());

assert.deepEqual(
	values.simplify(values.MAP("add", 5)),
	values.MAP("add", 5));
assert.deepEqual(
	values.simplify(values.MAP("add", 0)),
	values.NO_OP());
assert.deepEqual(
	values.simplify(values.MAP("rot", [0, 999])),
	values.NO_OP());
assert.deepEqual(
	values.simplify(values.MAP("rot", [5, 3])),
	values.MAP("rot", [2, 3]));
assert.deepEqual(
	values.simplify(values.MAP("mult", 0)),
	values.MAP("mult", 0));
assert.deepEqual(
	values.simplify(values.MAP("mult", 1)),
	values.NO_OP());
assert.deepEqual(
	values.simplify(values.MAP("xor", true)),
	values.MAP("xor", true));
assert.deepEqual(
	values.simplify(values.MAP("xor", false)),
	values.NO_OP());

// invert

assert.deepEqual(
	values.invert(values.NO_OP()),
	values.NO_OP());

assert.deepEqual(
	values.invert(values.REP(0, 1)),
	values.REP(1, 0));

assert.deepEqual(
	values.invert(values.MAP("add", 5)),
	values.MAP("add", -5));
assert.deepEqual(
	values.invert(values.MAP("rot", [5, 2])),
	values.MAP("rot", [-5, 2]));
assert.deepEqual(
	values.invert(values.MAP("mult", 5)),
	values.MAP("mult", 1/5));
assert.deepEqual(
	values.invert(values.MAP("xor", true)),
	values.MAP("xor", true));
assert.deepEqual(
	values.invert(values.MAP("xor", false)),
	values.MAP("xor", false));

// compose

assert.deepEqual(
	values.compose(
		values.NO_OP(),
		values.REP(1, 2) ),
	values.REP(1, 2));
assert.deepEqual(
	values.compose(
		values.REP(1, 2),
		values.NO_OP() ),
	values.REP(1, 2));

assert.deepEqual(
	values.compose(
		values.REP(0, 1),
		values.REP(1, 2) ),
	values.REP(0, 2));

assert.deepEqual(
	values.compose(
		values.MAP("add", 1),
		values.MAP("add", 1) ),
	values.MAP("add", 2));
assert.deepEqual(
	values.compose(
		values.MAP("rot", [3, 13]),
		values.MAP("rot", [4, 13]) ),
	values.MAP("rot", [7, 13]));
assert.deepEqual(
	values.compose(
		values.MAP("mult", 2),
		values.MAP("mult", 3) ),
	values.MAP("mult", 6));
assert.deepEqual(
	values.compose(
		values.MAP("xor", true),
		values.MAP("xor", true) ),
	values.NO_OP());
assert.deepEqual(
	values.compose(
		values.MAP("add", 1),
		values.MAP("mult", 2) ),
	null);

// rebase

assert.deepEqual(
	values.rebase(
		values.NO_OP(),
		values.MAP("add", 1) ),
	values.MAP("add", 1));
assert.deepEqual(
	values.rebase(
		values.MAP("add", 1),
		values.NO_OP() ),
	values.NO_OP());

assert.deepEqual(
	values.rebase(
		values.REP(0, 1),
		values.REP(0, 1) ),
	values.NO_OP());
assert.deepEqual(
	values.rebase(
		values.REP(0, 1),
		values.REP(0, 2) ),
	null);
assert.deepEqual(
	values.rebase(
		values.REP(0, 1, 0),
		values.REP(0, 2, 1) ),
	values.REP(1, 2, 1));
assert.deepEqual(
	values.rebase(
		values.REP(0, 2, 1),
		values.REP(0, 1, 0) ),
	values.NO_OP());

assert.deepEqual(
	values.rebase(
		values.MAP("add", 1),
		values.MAP("add", 2) ),
	values.MAP("add", 2));
assert.deepEqual(
	values.rebase(
		values.MAP("rot", [5, 3]),
		values.MAP("rot", [1, 3]) ),
	values.MAP("rot", [1, 3]));
assert.deepEqual(
	values.rebase(
		values.MAP("add", 1),
		values.MAP("mult", 2) ),
	null);


