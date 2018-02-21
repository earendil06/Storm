grammar Storm;

root:	(expr NEWLINE?)* EOF ;
expr:	fct WHITESPACE value=INT
    ;
fct : 'test';
NEWLINE : [\r\n]+ ;
INT     : [0-9]+ ;
WHITESPACE : (' ')+;