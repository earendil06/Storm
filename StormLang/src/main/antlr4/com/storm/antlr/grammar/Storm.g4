grammar Storm;

// com.ddmodel.Block Statistics Parser Rules
block         : WORD NEWLINE+ traits EOF ;

traits        : stat* ability_block action_block* feature_block* description? ;

stat          : STAT WS+ (NUMBER | dice) NEWLINE* ;
ability_block : (ability NEWLINE*)+ NEWLINE* ;
ability       : STAT_ID WS+ NUMBER NEWLINE* ;

action_block     : WORD NEWLINE action_component+ NEWLINE? ;
action_component : (to_hit | reach | range | hit | description) NEWLINE? ;

feature_block :       feature_name ARROW feature_description NEWLINE?;
feature_name :        (WORD | WS+)+ ;
feature_description : (WORD | WS+)+ ;

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
STAT        : ('ac' | 'AC' | 'pp'  | 'PP' | 'hp' | 'HP'| 'speed'| 'SPEED') ;
DAMAGE_TYPE : ('piercing' | 'slashing' | 'bludgeoning' | 'fire' | 'acid' | 'ice' | 'arcane' | 'thunder') ;

ARROW       : '=>';

WORD        : (LOWERCASE | UPPERCASE | '_')+ ;
NUMBER      : [0-9]+ ;
NEWLINE     : ('\r'? '\n' | '\r')+ ;
WS          : (' ' | '\t') ;


fragment LOWERCASE : [a-z] ;
fragment UPPERCASE : [A-Z] ;