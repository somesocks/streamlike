/* eslint-env mocha */

const {
	Assert,
	Count,
	Slice,
	From,
	ToArray,
	ToBlocks,
	Drain,
} = require('./');

const isPositive = (val) => val > 0;

describe(
	'Streams.Assert',
	() => {

		it('test 1', () => {
			From(1, 2, 3)
				.pipe(Assert, isPositive)
				.pipe(Drain)
				.read();
		});

		it('test 2', () => {
			try {
				From(1, 2, 3, -1)
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
				.pipe(Slice, 1, 1000000)
				.pipe(Assert, isPositive)
				.pipe(Drain)
				.read();
		});

	}
);
