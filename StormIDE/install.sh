#!/usr/bin/env bash
echo "=> npm install"
npm install

echo "=> bower install"
./node_modules/bower/bin/bower install

echo "=> done"
