grammar Storm;

// Block Statistics Parser Rules
block         : WORD NEWLINE+ traits EOF ;

traits        : stat* ability_block action_block* spell_block* description? ;

stat          : STAT WS+ (NUMBER | dice) NEWLINE* ;
ability_block : (ability NEWLINE*)+ NEWLINE* ;
ability       : STAT_ID WS+ NUMBER NEWLINE* ;

action_block  : WORD NEWLINE spell+ NEWLINE? ;
spell        : (to_hit | reach | range | hit | description) NEWLINE? ;

spell_block : (WORD | WS+)+ ARROW (WORD | WS+)+ NEWLINE+;

to_hit        : MODIFIER_OP NUMBER WS+ 'to hit' NEWLINE ;
reach         : 'reach' WS+ NUMBER ;
range         : 'range' WS+ NUMBER '/' NUMBER ;
hit           : 'hit' WS+ dice WS+ DAMAGE_TYPE ;

dice          : NUMBER 'd' NUMBER (WS* modifier)? ;
modifier      : MODIFIER_OP WS* NUMBER ;
description   : '[' .~('[' | ']')+ ']' ;


// Lexer Rules
MODIFIER_OP : ('+' | '-') ;
STAT_ID     : ('str' | 'dex' | 'con' | 'int' | 'wis' | 'cha') ;
STAT        : ('ac' | 'AC' | 'pp'  | 'PP' | 'hp' | 'HP') ;
DAMAGE_TYPE : ('piercing' | 'slashing' | 'bludgeoning' | 'fire' | 'acid' | 'ice' | 'arcane' | 'thunder') ;

ARROW       : '=>';

WORD        : (LOWERCASE | UPPERCASE | '_')+ ;
NUMBER      : [0-9]+ ;
NEWLINE     : ('\r'? '\n' | '\r')+ ;
WS          : (' ' | '\t') ;


fragment LOWERCASE : [a-z] ;
fragment UPPERCASE : [A-Z] ;