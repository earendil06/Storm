grammar Storm;

/*
* Parser Rules
*/

block    : name NEWLINE stat* EOF ;

name     : WORD ;

stat     : 'AC' const_stat
         | 'HP' var_stat
;
const_stat : WHITESPACE+ NUMBER NEWLINE* ;
var_stat   : WHITESPACE+ value NEWLINE* ;
dice       : NUMBER 'd' NUMBER WHITESPACE* modifier ;
value      : (dice | NUMBER) ;
modifier   : MODIFIER_OP WHITESPACE* NUMBER ;


/*
* Lexer Rules
*/

IDENTIFIER  : 'AC' | 'HP' ;
WORD        : (LOWERCASE | UPPERCASE | '_')+ ;
MODIFIER_OP : ('+' | '-') ;

NUMBER      : [0-9]+ ;
LOWERCASE   : [a-z]  ;
UPPERCASE   : [A-Z]  ;

NEWLINE     : ('\r'? '\n' | '\r')+ ;
WHITESPACE  : (' ' | '\t') ;