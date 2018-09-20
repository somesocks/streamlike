/* eslint-env mocha */

const {
	Stream,
	Count,
	Slice,
	Reduce,
	Drain,
} = require('./');

describe(
	'Streams.Reduce',
	() => {
		it('test case 1', () => {
			Count()
				.pipe(Slice, 0, 10)
				.pipe(Reduce, (state, val) => state + val, 0)
				.pipe(Drain)
				.read();
		});
	}
);
