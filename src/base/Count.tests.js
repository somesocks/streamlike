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
				.pipe(Slice, 0, 9)
				.pipe(Drain)
				.read();
		});

		it('performance 1', () => {
			Count()
				.pipe(Slice, 0, 999999)
				.pipe(Drain)
				.read();
		});

	}
);
