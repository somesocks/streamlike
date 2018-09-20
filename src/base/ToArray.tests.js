/* eslint-env mocha */

const {
	Assert,
	Count,
	Slice,
	ToArray,
	Drain,
} = require('./');

describe(
	'Streams.ToArray',
	() => {

		it('test 1', () => {
			Count()
				.pipe(Assert, (val) => Number.isInteger(val))
				.pipe(Slice, 0, 99)
				.pipe(Assert, (val) => Number.isInteger(val))
				.pipe(ToArray)
				.pipe(Assert, (val) => Array.isArray(val))
				.pipe(Assert, (val) => val.length === 99)
				.pipe(Drain)
				.read();
		});

		it('performance 1', () => {
			Count()
				.pipe(Slice, 0, 999999)
				.pipe(ToArray, 10)
				.pipe(Drain)
				.read();
		});

	}
);
