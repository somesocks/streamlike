/* eslint-env mocha */

const {
	Count,
	Slice,
	Each,
	Drain,
} = require('./');

describe(
	'Streams.Each',
	() => {
		it('test case 1', () => {
			Count()
				.pipe(Slice, 1, 4)
				// .pipe(Each, (val, i) => console.log(`element ${i} is ${val}`))
				.pipe(Drain)
				.read();
		});
	}
);
