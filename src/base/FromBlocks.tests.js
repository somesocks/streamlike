/* eslint-env mocha */

const {
	Expand,
	Each,
	Filter,
	Count,
	Slice,

	FromArray,
	ToArray,

	FromBlocks,
	ToBlocks,

	Drain,
} = require('./');

describe(
	'Streams.FromBlocks',
	() => {

		it('test 1', () => {
			let stream = Count()
				.pipe(Slice, 0, 100)
				.pipe(ToBlocks, 10)
				.pipe(FromBlocks)
				.pipe(Drain);

			stream.read();
		});

		it('performance 1', () => {
			let stream = Count()
				.pipe(Slice, 0, 999999)
				.pipe(ToBlocks, 10)
				.pipe(FromBlocks)
				.pipe(Drain);

			stream.read();
		});

	}
);
