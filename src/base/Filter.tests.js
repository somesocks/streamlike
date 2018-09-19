/* eslint-env mocha */

const {
	Expand,
	Each,
	Filter,
	Count,
	Slice,
	ToArray,
} = require('./');

describe(
	'Streams.Filter',
	() => {
		it('test case 1', () => {
			let stream = Expand((i) => i);
			// stream = Each(stream, (val, i) => console.log('Each 1', val));
			stream = Filter(stream, (val, i) => (val % 10 === 0));
			// stream = Each(stream, (val, i) => console.log('Each 2', val));

			stream.read();
			stream.read();
			stream.read();

		});

		it('performance test 1', () => {
			let stream = Count()
				.pipe(Slice, 0, 999999)
				.pipe(Filter, (val, i) => (val % 2 === 0))
				.pipe(Filter, (val, i) => (val % 3 === 0))
				.pipe(Filter, (val, i) => (val % 5 === 0))
				.pipe(Filter, (val, i) => (val % 7 === 0))
				.pipe(ToArray);

			let arr = stream.read();
		});

		it('performance test 2', () => {
			let arr = Array(999999).fill(0);
			arr = arr
				.map((v, i) => i)
				.filter((val) => val % 2 === 0)
				.filter((val) => val % 3 === 0)
				.filter((val) => val % 5 === 0)
				.filter((val) => val % 7 === 0);
		});


	}
);
