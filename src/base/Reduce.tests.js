/* eslint-env mocha */

const Stream = require('./Stream');
const Expand = require('./Expand');
const Reduce = require('./Reduce');
const Each = require('./Each');

describe(
	'Streams.Reduce',
	() => {
		it('test case 1', () => {
			const expander = (i) => (i < 4 ? i : Stream.END);
			const reducer = (state, val) => state + val;

			let stream = Expand(expander);
			// stream = Each(stream, console.log);
			stream = Reduce(stream, reducer, 0);
			// stream = Each(stream, console.log);

			stream.read();

			// console.log('', stream.read());
		});
	}
);
