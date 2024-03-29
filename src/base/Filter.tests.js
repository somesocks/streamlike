/* eslint-env mocha */

const {
	Assert,
	Each,
	Drain,
	Filter,
	Count,
	Slice,
	ToArray,
} = require('./');

describe(
	'Streams.Filter',
	() => {
		it('test case 1', () => {
			Count()
				.pipe(Slice, 0, 50)
				.pipe(Filter, (val) => (val % 10 === 0))
				// .pipe(Each, (val) => console.log(val))
				.pipe(Drain)
				.read();
		});

		it('performance test', () => {
			Count()
				.pipe(Slice, 0, 1000000)
				.pipe(Filter, (val, i) => (val % 2 === 0))
				.pipe(Filter, (val, i) => (val % 3 === 0))
				.pipe(Filter, (val, i) => (val % 5 === 0))
				.pipe(Filter, (val, i) => (val % 7 === 0))
				.pipe(ToArray)
				.pipe(Drain)
				.read();
		});

		it('performance test control group', () => {
			let arr = Array(1000000).fill(0);
			arr = arr
				.map((v, i) => i)
				.filter((val) => val % 2 === 0)
				.filter((val) => val % 3 === 0)
				.filter((val) => val % 5 === 0)
				.filter((val) => val % 7 === 0);
		});


	}
);
