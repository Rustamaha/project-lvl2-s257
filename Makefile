install:
							npm install

build:
							rm -rf dist
							npm run build

run:
							npm run babel-node -- src/bin/gendiff.js

publish:
							npm publish

lint:
							npm run eslint .

test:
							npm run test

test-watch:
							npm run test-watch
