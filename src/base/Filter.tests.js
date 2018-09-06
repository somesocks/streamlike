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
			let stream = Count();
			stream = Slice(stream, 0, 999999);
			stream = Filter(stream, (val, i) => (val % 2 === 0));
			stream = Filter(stream, (val, i) => (val % 3 === 0));
			stream = Filter(stream, (val, i) => (val % 5 === 0));
			stream = Filter(stream, (val, i) => (val % 7 === 0));
			stream = ToArray(stream);

			let arr = stream.read();
		});

		it('performance test 2', () => {
			let arr = Array(999999).fill(0);
			arr = arr.map((v, i) => i);
			arr = arr.filter((val) => val % 2 === 0);
			arr = arr.filter((val) => val % 3 === 0);
			arr = arr.filter((val) => val % 5 === 0);
			arr = arr.filter((val) => val % 7 === 0);
		});


	}
);
