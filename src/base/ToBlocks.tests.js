/* eslint-env mocha */

const {
	Expand,
	Each,
	Filter,
	Count,
	Slice,
	ToArray,
	ToBlocks,
	Drain,
} = require('./');

describe(
	'Streams.ToBlocks',
	() => {

		it('test 1', () => {
			let stream = Count();
			stream = Slice(stream, 0, 99);
			stream = ToBlocks(stream, 10);
			stream = Each(stream, console.log);
			stream = Drain(stream);

			stream.read();
		});

		it('performance 1', () => {
			let stream = Count();
			stream = Slice(stream, 0, 999999);
			stream = ToBlocks(stream, 10);
			stream = Drain(stream);

			stream.read();
		});

	}
);
