#!/usr/bin/env bash
echo "=> npm install"
npm install

echo "=> bower install"
./node_modules/.bin/bower install

echo "=> typescript dependencies install"
npm i typescript --save-dev

echo "=> generate antlr files"
./node_modules/.bin/antlr4ts -listener ./src/language/Storm.g4 -o ./src/parser

cd ./src/parser
ls


echo "=> done"

