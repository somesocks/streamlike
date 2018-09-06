/* eslint-env mocha */

const Expand = require('./Expand');
const Each = require('./Each');

describe(
	'Streams.Expand',
	() => {
		it('test case 1', () => {
			let stream = Expand((i) => i);
			// stream = Each(stream, (val, i) => console.log('Each', val, i));

			stream.read();
			stream.read();
			stream.read();

		});
	}
);
