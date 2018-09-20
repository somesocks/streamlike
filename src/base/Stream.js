
/**
* `Stream` is the base stream class.
* it should always be subclassed.
* stream constructors should never require new.
* @name Stream
* @class
* @constructor
* @memberof streamlike
*/
function Stream () {
	return this;
}

/**
* open is the method that's called when a stream needs to be opened.
* streams should always open as late as possible.
* if read is called on an unopened stream, it should open before reading.
* if open is called twice, it should be safe.
* if open is called on a closed stream, the stream should remain closed.
* @function open
* @memberof streamlike.Stream#
*/
Stream.prototype.open = function open() { };

/**
* close is the method that's called when a stream needs to be close.
* streams should always close as early as possible.
* if read is called on a closed stream, it should stay closed (return Stream.END).
* if close is called twice, it should be safe.
* if open is called on a closed stream, the stream should remain closed.
* @function close
* @memberof streamlike.Stream#
*/
Stream.prototype.close = function close() { };

/**
* read is the core method of streams.  read should return the next value in the stream.
* if there are no more values to read, or the stream is closed, read should return Stream.END
* @function read
* @param recycle - a 'container' value to re-use when returning the next value.  always optional.
* @memberof streamlike.Stream#
*/
Stream.prototype.read = function read(recycle) { };


/**
* ```javascript
* // this
* let stream = From(1, 2, 3, 4);
* stream = Slice(stream, 0, 10);
* stream = Assert(stream, (val, i) => Number.isInteger(val));
* stream = ToArray(stream);
*
* // is equivalent to this
* const stream = From(1, 2, 3, "4")
*    .pipe(Slice, 0, 10)
*    .pipe(Assert, (val, i) => Number.isInteger(val))
*    .pipe(ToArray);
* ```
* pipe is a utility method to wrap one stream in another.
* @function pipe
* @param streamContsructor - the constructor function for another Stream. pipe assumes the constructor takes a source stream as its first argument
* @param {...*} args - any number of additional args to pass into streamConstructor
* @memberof streamlike.Stream#
*/
Stream.prototype.pipe = function pipe(streamConstructor, ...args) {
	return streamConstructor(this, ...args);
};

/**
* a unique object representing a control signal marking the end of a stream
* @name END
* @memberof streamlike.Stream
*/
Stream.END = {};

module.exports = Stream;
