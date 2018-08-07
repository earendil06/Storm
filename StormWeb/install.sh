#!/usr/bin/env bash
echo "=> npm install"
npm install

echo "=> bower install"
bower install

echo "=> typescript dependencies install"
npm i typescript --save-dev

echo "=> generate antlr files"
npm run antlr


echo "=> done"

