#!/usr/bin/env bash

cd StormWeb
npm run build -- --watch &
cd ../StormWeb/electron
npm start