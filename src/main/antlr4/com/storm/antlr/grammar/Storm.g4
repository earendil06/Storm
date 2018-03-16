grammar Storm;

// Parser Rules
block    : name NEWLINE stat* EOF ;

name     : WORD ;

stat     : 'AC' const_stat
         | 'PP' const_stat
         | 'HP' var_stat
         | 'stats' WHITESPACE* '{' NEWLINE* (WHITESPACE* stat_line)+ '}'
;

stat_line  : STAT_MOD WHITESPACE+ NUMBER NEWLINE* ;

const_stat : WHITESPACE+ NUMBER NEWLINE* ;
var_stat   : WHITESPACE+ value NEWLINE* ;
dice       : NUMBER 'd' NUMBER WHITESPACE* modifier ;
value      : (dice | NUMBER) ;
modifier   : MODIFIER_OP WHITESPACE* NUMBER ;


// Lexer Rules
MODIFIER_OP : ('+' | '-') ;
STAT_MOD    : ('str' | 'dex' | 'con' | 'int' | 'wis' | 'cha') ;

WORD        : (LOWERCASE | UPPERCASE | '_')+ ;

NUMBER      : [0-9]+ ;
LOWERCASE   : [a-z]  ;
UPPERCASE   : [A-Z]  ;

NEWLINE     : ('\r'? '\n' | '\r')+ ;
WHITESPACE  : (' ' | '\t') ;