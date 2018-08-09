#!/usr/bin/env bash

echo "Storm => mvn clean install -DskipTests"
mvn clean package -DskipTests

echo "StormAKKA => sbt dist"
cd StormAKKA
sbt dist
cd ..

echo "StormAKKA => copy storm http jar"
cp StormAKKA/target/universal/storm-http-0.1-SNAPSHOT.jar StormElectron/dist/storm-http-server.jar

echo "StormWeb => npm install"
cd StormWeb
npm install

echo "StormWeb => bower install"
./node_modules/bower/bin/bower install

echo "StormWeb => typescript dependencies install"
npm i typescript --save-dev

echo "StormWeb => npm run build"
npm run build

cd ..

echo "electron => npm install"
cd StormWeb/electron
npm install
