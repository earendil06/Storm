echo "=> npm install"
npm install

echo "=> bower install"
./node_modules/bower/bin/bower install

echo "=> antlr4 download"
mkdir -p antlr4
cd antlr4
curl -O http://www.antlr.org/download/antlr-4.7.1-complete.jar
cd ..

echo "=> generate Storm parser"
java -jar ./antlr4/antlr-4.7.1-complete.jar -Dlanguage=JavaScript Storm.g4 -o ./parser

echo "=> done"