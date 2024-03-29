
.PHONY: help build test

help:

test:
	(export NODE_PATH=./; find ./src -name '*.tests.js' | xargs mocha --timeout 10000 $(ARGS))

docs:
	(export NODE_PATH=./; find ./src -name *.js | sort -t/ -k2.2 -k2.1 | xargs jsdoc2md --separators --param-list-format list --property-list-format list --member-index-format list --template README.hbs --files ) > README.md

dist:
	mkdir -p dist

build: docs dist
	cp ./package.json ./dist;
	cp ./README.md ./dist;
	cp ./LICENSE ./dist;
	cp -R ./src/* ./dist;
	(export NODE_PATH=./; find ./src -name '*.tests.js' | xargs mocha --timeout 10000 $(ARGS))
	find ./dist -name *.tests.js | xargs rm;

publish:
	cd ./dist && pnpm publish
