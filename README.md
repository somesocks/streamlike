# streamlike
A set of tools for quickly processing data in a streaming way

<a name="streamlike"></a>

## streamlike : <code>object</code>
**Kind**: global namespace  

* [streamlike](#streamlike) : <code>object</code>
    * [.Stream](#streamlike.Stream)
        * [new Stream()](#new_streamlike.Stream_new)
        * [stream.open()](#streamlike.Stream+open)
        * [stream.close()](#streamlike.Stream+close)
        * [stream.read(recycle)](#streamlike.Stream+read)
        * [stream.pipe(streamContsructor, ...args)](#streamlike.Stream+pipe)
        * [Stream.END](#streamlike.Stream.END)
    * [.Assert](#streamlike.Assert) ⇒ <code>Stream</code>
    * [.Count](#streamlike.Count) ⇒ <code>Stream</code>
    * [.Drain](#streamlike.Drain) ⇒ <code>Stream</code>
    * [.Each](#streamlike.Each) ⇒ <code>Stream</code>
    * [.Expand](#streamlike.Expand) ⇒ <code>Stream</code>
    * [.Filter](#streamlike.Filter) ⇒ <code>Stream</code>
    * [.FromArray](#streamlike.FromArray) ⇒ <code>Stream</code>
    * [.FromBlocks](#streamlike.FromBlocks) ⇒ <code>Stream</code>
    * [.From](#streamlike.From) ⇒ <code>Stream</code>
    * [.Guard](#streamlike.Guard) ⇒ <code>Stream</code>
    * [.Map](#streamlike.Map) ⇒ <code>Stream</code>
    * [.Reduce](#streamlike.Reduce) ⇒ <code>Stream</code>
    * [.Slice](#streamlike.Slice) ⇒ <code>Stream</code>
    * [.Splice](#streamlike.Splice) ⇒ <code>Stream</code>
    * [.ToArray](#streamlike.ToArray) ⇒ <code>Stream</code>
    * [.ToBlocks](#streamlike.ToBlocks) ⇒ <code>Stream</code>


* * *

<a name="streamlike.Stream"></a>

### streamlike.Stream
**Kind**: static class of [<code>streamlike</code>](#streamlike)  

* [.Stream](#streamlike.Stream)
    * [new Stream()](#new_streamlike.Stream_new)
    * [stream.open()](#streamlike.Stream+open)
    * [stream.close()](#streamlike.Stream+close)
    * [stream.read(recycle)](#streamlike.Stream+read)
    * [stream.pipe(streamContsructor, ...args)](#streamlike.Stream+pipe)
    * [Stream.END](#streamlike.Stream.END)


* * *

<a name="new_streamlike.Stream_new"></a>

#### new Stream()
`Stream` is the base stream class.
it should always be subclassed.
stream constructors should never require new.


* * *

<a name="streamlike.Stream+open"></a>

#### stream.open()
open is the method that's called when a stream needs to be opened.
streams should always open as late as possible.
if read is called on an unopened stream, it should open before reading.
if open is called twice, it should be safe.
if open is called on a closed stream, the stream should remain closed.

**Kind**: instance method of [<code>Stream</code>](#streamlike.Stream)  

* * *

<a name="streamlike.Stream+close"></a>

#### stream.close()
close is the method that's called when a stream needs to be close.
streams should always close as early as possible.
if read is called on a closed stream, it should stay closed (return Stream.END).
if close is called twice, it should be safe.
if open is called on a closed stream, the stream should remain closed.

**Kind**: instance method of [<code>Stream</code>](#streamlike.Stream)  

* * *

<a name="streamlike.Stream+read"></a>

#### stream.read(recycle)
read is the core method of streams.  read should return the next value in the stream.
if there are no more values to read, or the stream is closed, read should return Stream.END

**Kind**: instance method of [<code>Stream</code>](#streamlike.Stream)  
**Params**

- recycle - a 'container' value to re-use when returning the next value.  always optional.


* * *

<a name="streamlike.Stream+pipe"></a>

#### stream.pipe(streamContsructor, ...args)
```javascript
// this
let stream = From(1, 2, 3, 4);
stream = Slice(stream, 0, 10);
stream = Assert(stream, (val, i) => Number.isInteger(val));
stream = ToArray(stream);

// is equivalent to this
const stream = From(1, 2, 3, "4")
   .pipe(Slice, 0, 10)
   .pipe(Assert, (val, i) => Number.isInteger(val))
   .pipe(ToArray);
```
pipe is a utility method to wrap one stream in another.

**Kind**: instance method of [<code>Stream</code>](#streamlike.Stream)  
**Params**

- streamContsructor - the constructor function for another Stream. pipe assumes the constructor takes a source stream as its first argument
- ...args <code>\*</code> - any number of additional args to pass into streamConstructor


* * *

<a name="streamlike.Stream.END"></a>

#### Stream.END
a unique object representing a control signal marking the end of a stream

**Kind**: static property of [<code>Stream</code>](#streamlike.Stream)  

* * *

<a name="streamlike.Assert"></a>

### streamlike.Assert ⇒ <code>Stream</code>
```javascript
// works
const integers = From(1, 2, 3, 4)
   .pipe(Slice, 0, 10)
   .pipe(Assert, (val, i) => Number.isInteger(val))
   .pipe(ToArray)
   .read();

// throws error
const integers = From(1, 2, 3, "4")
   .pipe(Assert, (val, i) => Number.isInteger(val))
   .pipe(ToArray)
   .read();
```
`Assert` is a stream constructor that builds a stream to run an assertion against every value in the stream

**Kind**: static property of [<code>streamlike</code>](#streamlike)  
**Params**

- source <code>Stream</code> - a source stream
- assert <code>function</code> - an assertion function
- error <code>function</code> - an error builder function


* * *

<a name="streamlike.Count"></a>

### streamlike.Count ⇒ <code>Stream</code>
```javascript
// array of [ 0, 1, 2, 3 ]
const integers = Count()
   .pipe(Slice, 0, 4)
   .pipe(ToArray)
   .read();
```
`Count` is a stream constructor that builds a stream that counts integers upward
`Count` never terminates, so make sure to add a terminating stream like a `Slice` somewhere after it.

**Kind**: static property of [<code>streamlike</code>](#streamlike)  
**Params**

- start <code>number</code> - the number to start counting from


* * *

<a name="streamlike.Drain"></a>

### streamlike.Drain ⇒ <code>Stream</code>
```javascript
 // returns Stream.END
 Count()
   .pipe(Slice, 0, 4)
   .pipe(Drain)
   .read();
```
`Drain` is a stream constructor wraps a source stream, and when read is called it reads the entire stream and throws it away.
Useful for streams with side-effects.

**Kind**: static property of [<code>streamlike</code>](#streamlike)  
**Params**

- source <code>Stream</code> - the source stream to drain


* * *

<a name="streamlike.Each"></a>

### streamlike.Each ⇒ <code>Stream</code>
```javascript
 // should log:
 // element 0 is 1
 // element 1 is 2
 // element 2 is 3
 Count()
   .pipe(Slice, 1, 4)
   .pipe(Each, (val, i) => console.log(`element ${i} is ${val}`))
   .pipe(Drain)
   .read();
```
`Each` is a stream constructor wraps a source stream, and when read is called it reads the entire stream and throws it away.
Useful for streams with side-effects.

**Kind**: static property of [<code>streamlike</code>](#streamlike)  
**Params**

- source <code>Stream</code> - the source stream to drain
- each <code>function</code> - a function to get called for each value


* * *

<a name="streamlike.Expand"></a>

### streamlike.Expand ⇒ <code>Stream</code>
```javascript
 // should log:
 // element 0 is 1
 // element 1 is 2
 // element 2 is 3
 Expand((i) => i)
   .pipe(Slice, 1, 4)
   .pipe(Each, (val, i) => console.log(`element ${i} is ${val}`))
   .pipe(Drain)
   .read();
```
`Expand` is useful when you need custom code to expand something into a stream.
Keep in mind you'll need to return `Stream.END` at some point.

**Kind**: static property of [<code>streamlike</code>](#streamlike)  
**Params**

- expander <code>function</code> - a function to get called for each value


* * *

<a name="streamlike.Filter"></a>

### streamlike.Filter ⇒ <code>Stream</code>
```javascript
 // res is [0, 10, 20, 30, 40]:
 let res = Count()
   .pipe(Slice, 0, 50)
   .pipe(Filter, (val, i) => (val % 10 === 0))
   .pipe(ToArray)
   .read();
```
`Filter` removes some items from a stream.

**Kind**: static property of [<code>streamlike</code>](#streamlike)  
**Params**

- source <code>Stream</code> - a source stream
- filter <code>function</code> - a filter function


* * *

<a name="streamlike.FromArray"></a>

### streamlike.FromArray ⇒ <code>Stream</code>
```javascript
 // res is [1, 2, 3]:
 let res = FromArray([ 1, 2, 3 ])
   .pipe(ToArray)
   .read();
```
`FromArray` builds a stream from its arguments.

**Kind**: static property of [<code>streamlike</code>](#streamlike)  
**Params**

- values <code>array</code> - values to return in the stream, in order


* * *

<a name="streamlike.FromBlocks"></a>

### streamlike.FromBlocks ⇒ <code>Stream</code>
```javascript
 // res is [1, 2, 3, 4, 5, 6]:
 let res = From([ 1, 2, 3 ], [4, 5, 6])
   .pipe(FromBlocks)
   .pipe(ToArray)
   .read();
```
`FromBlocks` 'flattens' a stream of arrays into a stream of elements.

**Kind**: static property of [<code>streamlike</code>](#streamlike)  
**Params**

- source <code>Stream</code> - a stream of arrays


* * *

<a name="streamlike.From"></a>

### streamlike.From ⇒ <code>Stream</code>
```javascript
 // res is [1, 2, 3]:
 let res = From(1, 2, 3)
   .pipe(ToArray)
   .read();
```
`From` builds a stream from its arguments.

**Kind**: static property of [<code>streamlike</code>](#streamlike)  
**Params**

- ...values <code>\*</code> - values to return in the stream, in order


* * *

<a name="streamlike.Guard"></a>

### streamlike.Guard ⇒ <code>Stream</code>
`Guard` is a special-purpose stream wrapper designed to 'protect' a stream,
and make sure it gets opened and closed properly, even in the event of an error

**Kind**: static property of [<code>streamlike</code>](#streamlike)  
**Params**

- source <code>Stream</code> - a source stream


* * *

<a name="streamlike.Map"></a>

### streamlike.Map ⇒ <code>Stream</code>
```javascript
 // res is [1, 2, 3]:
 let res = Count()
   .pipe(Slice, 0, 4)
   .pipe(Map, (val, i) => val + 1)
   .pipe(ToArray)
   .read();
```
`Map` transforms each element in a stream.

**Kind**: static property of [<code>streamlike</code>](#streamlike)  
**Params**

- source <code>Stream</code> - a source stream
- map <code>function</code> - a map function


* * *

<a name="streamlike.Reduce"></a>

### streamlike.Reduce ⇒ <code>Stream</code>
```javascript
 // res is 6:
 let res = Count()
   .pipe(Slice, 0, 4)
   .pipe(Reduce, (state, val, i) => state + val)
   .read();
```
`Reduce` 'reduces' a stream of elements to a single result.

**Kind**: static property of [<code>streamlike</code>](#streamlike)  
**Params**

- source <code>Stream</code> - a source stream
- reduce <code>function</code> - a reduce function
- state <code>\*</code> - the initial value of the state


* * *

<a name="streamlike.Slice"></a>

### streamlike.Slice ⇒ <code>Stream</code>
```javascript
 // res is [1, 2, 3]:
 let res = Count()
   .pipe(Slice, 0, 4)
   .pipe(ToArray)
   .read();
```
`Slice` 'slices' out a piece of a stream to use

**Kind**: static property of [<code>streamlike</code>](#streamlike)  
**Params**

- source <code>Stream</code> - a source stream
- reduce <code>function</code> - a reduce function
- state <code>\*</code> - the initial value of the state


* * *

<a name="streamlike.Splice"></a>

### streamlike.Splice ⇒ <code>Stream</code>
```javascript
 // res is [1, 2, 3, 4, 5, 6]:
 let res = Splice(From(1, 2, 3), From(4, 5, 6))
   .pipe(ToArray)
   .read();
```
`Splice` 'splices' several streams together, concatenating them into a single stream

**Kind**: static property of [<code>streamlike</code>](#streamlike)  
**Params**

- ...sources <code>Streams</code> - the source streams


* * *

<a name="streamlike.ToArray"></a>

### streamlike.ToArray ⇒ <code>Stream</code>
```javascript
 // res is [1, 2, 3]:
 let res = From(1, 2, 3)
   .pipe(ToArray)
   .read();
```
`ToArray` converts a stream into an array

**Kind**: static property of [<code>streamlike</code>](#streamlike)  
**Params**

- source <code>Stream</code> - the source stream


* * *

<a name="streamlike.ToBlocks"></a>

### streamlike.ToBlocks ⇒ <code>Stream</code>
```javascript
 // res is [ [1, 2, 3], [4, 5, 6] ]:
 let res = From(1, 2, 3, 4, 5, 6)
   .pipe(ToBlocks, 3)
   .pipe(ToArray)
   .read();
```
`ToBlocks` converts a stream into a stream of 'blocks' (fixed-size arrays of the elements)

**Kind**: static property of [<code>streamlike</code>](#streamlike)  
**Params**

- source <code>Stream</code> - the source stream
- size <code>number</code> - the size of blocks to emit
- padding <code>\*</code> - the padding for partial blocks


* * *

