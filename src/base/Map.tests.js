/* eslint-env mocha */

const {
	Count,
	Each,
	Map,
	Slice,
	Drain,
	ToArray,
} = require('./');

describe(
	'Streams.Map',
	() => {
		it('test case 1', () => {
			let stream = Count();
			// stream = Each(stream, (val, i) => console.log('Each 1', val));
			stream = Map(stream, (val, i) => val + 1);
			// stream = Each(stream, (val, i) => console.log('Each 2', val));

			stream.read();
			stream.read();
			stream.read();

		});

		it('performance test 1', () => {
			let stream = Count();
			stream = Slice(stream, 0, 999999);
			stream = Map(stream, (val, i) => val + 1);
			stream = Map(stream, (val, i) => val + 1);
			stream = Map(stream, (val, i) => val + 1);
			stream = Map(stream, (val, i) => val + 1);
			stream = ToArray(stream);

			let arr = stream.read();
		});

		it('performance test 2', () => {
			let arr = Array(999999).fill(0);
			arr = arr.map((val) => val + 1);
			arr = arr.map((val) => val + 1);
			arr = arr.map((val) => val + 1);
			arr = arr.map((val) => val + 1);
		});

	}
);
