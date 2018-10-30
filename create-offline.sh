#!/usr/bin/env bash

cd ./StormWeb
rm -rf ./generated/cdn
rm ./index-offline.html
rm ./ide-offline.html

mkdir -p ./generated/cdn/js
mkdir -p ./generated/cdn/css
cp ./index.html ./index-offline.html
cat ./index-offline.html | grep -Eoi '<script [^>]+>' | grep -Eo 'src="[^\"]+"' | grep -Eo '(http|https)://[^"]+' | while read -r line ; do
    temp=`mktemp XXXXXXXXX.js -u`
    curl "$line" --output "./generated/cdn/js/$temp"
    sed -i "s,$line,generated/cdn/js/$temp,g" ./index-offline.html
   done
cat ./index-offline.html | grep -Eoi '<link [^>]+>' | grep -Eo '(src|href)="[^\"]+"' | grep -Eo '(http|https)://[^"]+' | while read -r line ; do
    temp=`mktemp XXXXXXXXX.css -u`
    curl "$line" --output "./generated/cdn/css/$temp"
    sed -i "s,$line,generated/cdn/css/$temp,g" ./index-offline.html
   done

cp ./ide.html ./ide-offline.html
cat ./ide-offline.html | grep -Eoi '<script [^>]+>' | grep -Eo 'src="[^\"]+"' | grep -Eo '(http|https)://[^"]+' | while read -r line ; do
    temp=`mktemp XXXXXXXXX.js -u`
    curl "$line" --output "./generated/cdn/js/$temp"
    sed -i "s,$line,generated/cdn/js/$temp,g" ./ide-offline.html
   done
cat ./ide-offline.html | grep -Eoi '<link [^>]+>' | grep -Eo '(src|href)="[^\"]+"' | grep -Eo '(http|https)://[^"]+' | while read -r line ; do
    temp=`mktemp XXXXXXXXX.css -u`
    curl "$line" --output "./generated/cdn/css/$temp"
    sed -i "s,$line,generated/cdn/css/$temp,g" ./ide-offline.html
   done