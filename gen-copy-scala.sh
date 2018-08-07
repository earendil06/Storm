#!/usr/bin/env bash

cd ./engine/
sbt clean "~fastOptJS"
cp ./target/scala-2.12/engine-fastopt.js ../StormWeb/js/