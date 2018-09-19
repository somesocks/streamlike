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
	'Streams.Assert',
	() => {

		it('test 1', () => {
			FromArray([1, 2, 3])
				.pipe(Assert, isPositive)
				.pipe(Drain)
				.read();
		});

		it('test 2', () => {
			try {
				FromArray([1, 2, 3, -1])
					.pipe(Assert, isPositive)
					.pipe(Drain)
					.read();
				return false;
			} catch (err) {
				return true;
			}
		});

		it('performance 1', () => {
			Count()
				.pipe(Slice, 1, 999999)
				.pipe(Assert, isPositive)
				.pipe(Drain)
				.read();
		});

	}
);
