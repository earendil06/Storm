# How to run as a desktop app

## Storm

At top level

```bash
mvn clean install
```

This will generate the antlr4 parser for the StormLanguage then all the dependencies for the api server.

## Storm Term GUI

```bash
cd StormTerm
# Install dependencies
npm install
```

This will generate dist/build.js.
This folder must be copied into StormElectron.

## Storm Akka runnable

```bash
cd StormAKKA
sbt dist
```

This will generate target/universal/storm-http-0.1-SNAPSHOT.zip.
This must be unzipped into StormElectron/dist/

## Storm Electron app

```bash
cd StormElectron
# Install dependencies
npm install
# Run the app
npm start
```

Finally ! This is a first draft, everything will be automated soon !