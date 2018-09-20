/* eslint-env mocha */

const {
	Assert,
	Expand,
	Each,
	Filter,
	Count,
	Slice,
	FromArray,
	ToArray,
	ToBlocks,
	Drain,
} = require('./');

const isPositive = (val) => val > 0;

describe(
	'Streams.Count',
	() => {

		it('test 1', () => {
			Count()
				.pipe(Assert, (val) => Number.isInteger(val))
				.pipe(Slice, 0, 9)
				.pipe(Assert, (val) => Number.isInteger(val))
				.pipe(Drain)
				.read();
		});

		it('performance 1', () => {
			Count()
				// .pipe(Assert, (val) => Number.isInteger(val))
				.pipe(Slice, 0, 1000000)
				// .pipe(Assert, (val) => Number.isInteger(val))
				.pipe(Drain)
				.read();
		});

	}
);
