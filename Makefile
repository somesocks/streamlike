
.PHONY: help build test

help:

test:
	(export NODE_PATH=./; find ./src -name '*.tests.js' | xargs mocha --timeout 10000 $(ARGS))
