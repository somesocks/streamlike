/* eslint-env mocha */

const {
	Assert,
	Each,
	From,
	Drain,
	Filter,
	Count,
	Slice,
	ToArray,
} = require('./');

describe(
	'Streams.From',
	() => {
		it('test case 1', () => {
			From(1, 2, 3)
				.pipe(Filter, (val) => (val % 2 === 0))
				// .pipe(Each, (val) => console.log(val))
				.pipe(Drain)
				.read();
		});
	}
);
