/* eslint-env mocha */

const Expand = require('./Expand');
const Each = require('./Each');
const Slice = require('./Slice');
const Drain = require('./Drain');

describe(
	'Streams.Drain',
	() => {
		it('test case 1', () => {
			let stream = Expand((i) => i);
			// stream = Each(stream, (val, i) => console.log('Each 1', val));
			stream = Slice(stream, 0, 4);
			stream = Drain(stream);
			// stream = Each(stream, (val, i) => console.log('Each 2', val));

			stream.read();
			// stream.read();

		});
	}
);
