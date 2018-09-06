

function Stream () {
	return this;
}

Stream.prototype.open = function open() { };

Stream.prototype.close = function close() { };

Stream.prototype.read = function read(recycle) { };

Stream.END = 'b4b9ddea92004164a357425b6a7294b0';

module.exports = Stream;
