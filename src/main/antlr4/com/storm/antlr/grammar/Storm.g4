grammar Storm;

/*
* Parser Rules
*/

root:	(expr NEWLINE?)* EOF ;
expr:	fct WHITESPACE+ value=NUMBER
    ;
fct : 'hi';

/*
* Lexer Rules
*/

NEWLINE    :  ('\r'? '\n' | '\r')+ ;
NUMBER     : [0-9]+ ;
WHITESPACE : (' ' | '\t') ;