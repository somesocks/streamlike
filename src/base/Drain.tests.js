/* eslint-env mocha */

const {
	Count,
	Slice,
	Drain,
	Assert,
	Stream,
} = require('./');

describe(
	'Streams.Drain',
	() => {
		it('test case 1', () => {
			const res = Count()
				.pipe(Slice, 0, 4)
				.pipe(Assert, (val) => Number.isInteger(val))
				.pipe(Drain)
				.read();
		});
	}
);
