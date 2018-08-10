#!/usr/bin/env bash

echo "install-all"
./install-all.sh

echo "electron => npm install"
cd StormWeb/electron
npm install
