#!/usr/bin/env bash
echo "=> npm install"
npm install

echo "=> generate antlr files"
npm run antlr

echo "=> typescript dependencies install"
npm i typescript --save-dev


echo "=> done"

