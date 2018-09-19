// /* eslint-env node, mocha */
//
// const {
// 	Count,
// 	Slice,
// 	Splice,
// 	FromArray,
// 	ToArray,
// 	Drain,
// 	Each,
// } = require('./');
//
// describe(
// 	'Streams.Splice',
// 	() => {
// 		it('test case 1', () => {
// 			Splice(
// 				FromArray([ 1, 2, 3 ]),
// 				FromArray([ 4, 5, 6 ]),
// 				FromArray([ 7, 8, 9 ])
// 			)
// 				.pipe(Each, (val, i) => console.log(val, i))
// 				.pipe(ToArray)
// 				.pipe(Drain)
// 				.read();
// 		});
// 	}
// );
