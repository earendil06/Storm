#!/usr/bin/env bash

./gen-copy-scala.sh

cd ./StormWeb/
chmod +x ./install.sh
./install.sh

echo "electron => npm install"
cd electron
npm install

chmod +x ./build.sh
./build.sh
