grammar Storm;

// Parser Rules
block    : name NEWLINE traits EOF ;

name     : WORD ;

traits    : stat* (NEWLINE ability_block NEWLINE)? stat*
;

stat     : CONST_STAT const_stat
         | VAR_STAT var_stat
;

ability_block : 'scores' WHITESPACE* '{' NEWLINE* (WHITESPACE* ability)+ '}' ;

ability    : STAT_ID WHITESPACE+ NUMBER NEWLINE* ;

const_stat : WHITESPACE+ NUMBER NEWLINE* ;
var_stat   : WHITESPACE+ value NEWLINE* ;
dice       : NUMBER 'd' NUMBER WHITESPACE* modifier ;
value      : (dice | NUMBER) ;
modifier   : MODIFIER_OP WHITESPACE* NUMBER ;


// Lexer Rules
MODIFIER_OP : ('+' | '-') ;
STAT_ID     : ('str' | 'dex' | 'con' | 'int' | 'wis' | 'cha') ;
CONST_STAT  : ('ac' | 'pp' | 'AC' | 'PP') ;
VAR_STAT    : ('hp' | 'HP') ;


WORD        : (LOWERCASE | UPPERCASE | '_')+ ;
NUMBER      : [0-9]+ ;
LOWERCASE   : [a-z]  ;
UPPERCASE   : [A-Z]  ;
NEWLINE     : ('\r'? '\n' | '\r')+ ;
WHITESPACE  : (' ' | '\t') ;