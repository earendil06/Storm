grammar Storm;

// Parser Rules
block    : name NEWLINE traits EOF ;

name     : WORD ;

traits   : stat* (NEWLINE ability_block NEWLINE)? stat* ;

stat     : STAT WHITESPACE+ (NUMBER | dice) NEWLINE* ;

ability_block : 'scores' WHITESPACE* '{' NEWLINE* (WHITESPACE* ability)+ '}' ;

ability    : STAT_ID WHITESPACE+ NUMBER NEWLINE* ;

dice       : NUMBER 'd' NUMBER (WHITESPACE* modifier)? ;

modifier   : MODIFIER_OP WHITESPACE* NUMBER ;


// Lexer Rules
MODIFIER_OP : ('+' | '-') ;
STAT_ID     : ('str' | 'dex' | 'con' | 'int' | 'wis' | 'cha') ;
STAT        : ('ac' | 'AC' | 'pp'  | 'PP' | 'hp' | 'HP') ;

WORD        : (LOWERCASE | UPPERCASE | '_')+ ;
NUMBER      : [0-9]+ ;
LOWERCASE   : [a-z]  ;
UPPERCASE   : [A-Z]  ;
NEWLINE     : ('\r'? '\n' | '\r')+ ;
WHITESPACE  : (' ' | '\t') ;