/* eslint-env mocha */

const {
	Expand,
	Each,
	Slice,
	Drain,
} = require('./');

describe(
	'Streams.Expand',
	() => {
		it('test case 1', () => {
			Expand((i) => i)
				.pipe(Slice, 0, 4)
				.pipe(Drain)
				.read();
		});

		it('test case 2', () => {
			Expand((i) => i)
				.pipe(Slice, 1, 4)
				// .pipe(Each, (val, i) => console.log(`element ${i} is ${val}`))
				.pipe(Drain)
				.read();
		});

	}
);
