install:
							npm install

build:
							npm run build

run:
							npm run babel-node -- src/bin/gendiff.js

publish:
	                        rm -rf dist
							npm publish

lint:
							npm run eslint .

test:
							npm run test

testWatch:
							npm run test-watch
