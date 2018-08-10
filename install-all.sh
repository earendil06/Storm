#!/usr/bin/env bash

./gen-copy-scala.sh

cd ./StormWeb/
./install.sh
./build.sh