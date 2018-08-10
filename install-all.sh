#!/usr/bin/env bash

./gen-copy-scala.sh

cd ./StormWeb/
./install.sh
./build.sh

echo "electron => npm install"
cd electron
npm install
