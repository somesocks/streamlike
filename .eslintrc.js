module.exports = {
	parser: 'babel-eslint',
	extends: [
		'esnext'
	],
	rules: {
		'import/no-commonjs': [ 'off' ],
		'no-console': [ 'warn' ],
		'no-empty-function': [ 'warn' ],
		'no-unused-vars': [ 'warn' ],
	}
};
