grammar Storm;

block         : block_name NEWLINE+ traits NEWLINE* EOF ;
block_name    : .+?~(NEWLINE)*? ;

traits        : stat* ability_block action_zone* feature_zone* ;

stat          : STAT WS+ (NUMBER | dice) NEWLINE+ ;
ability_block : (ability NEWLINE)+ NEWLINE* ;
ability       : STAT_ID WS NUMBER ;

action_zone       : ACTIONS WS+ OPEN NEWLINE* action_block* NEWLINE* CLOSE NEWLINE* ;
action_block      : action_block_name (WS | NEWLINE)+ ARROW (WS | NEWLINE)+ action_component* NEWLINE? description? NEWLINE* ;
action_block_name : .~(NEWLINE | OPEN |  CLOSE)+? ;
action_component  : WS* (to_hit | reach | range | hit) WS* NEWLINE ;

feature_zone  : FEATURES WS+ OPEN NEWLINE* feature_block* NEWLINE* CLOSE NEWLINE* ;
feature_block : feature_name (WS | NEWLINE)+ ARROW (WS | NEWLINE)+ description NEWLINE* ;
feature_name  : .+?~(NEWLINE | OPEN | CLOSE)*? ;

to_hit        : MODIFIER_OP NUMBER WS+ TO_HIT ;
reach         : REACH WS+ NUMBER ;
range         : RANGE WS+ NUMBER SLASH NUMBER ;
hit           : HIT WS+ dice WS+ DAMAGE_TYPE  ;

dice          : NUMBER D NUMBER (WS* modifier)? ;
modifier      : MODIFIER_OP WS* NUMBER ;
description   : WS* OPEN .*?~(OPEN | CLOSE)*? CLOSE ;

// Lexer Rules
OPEN        : '{';
CLOSE       : '}';
MODIFIER_OP : ('+' | '-') ;
STAT_ID     : ('str' | 'dex' | 'con' | 'int' | 'wis' | 'cha') ;
STAT        : ('ac' | 'AC' | 'pp'  | 'PP' | 'hp' | 'HP'| 'speed'| 'SPEED') ;
DAMAGE_TYPE : ('piercing' | 'slashing' | 'bludgeoning' | 'fire' | 'acid' | 'ice' | 'arcane' | 'thunder') ;

ARROW       : '=>';
TO_HIT      : 'to hit';

HIT         : 'hit';
ACTION      : 'action';
REACH       : 'reach';
RANGE       : 'range';
D           : 'd';
SLASH       : '/';
ACTIONS     : 'actions';
FEATURES    : 'features';

WORD        : (LOWERCASE | UPPERCASE | '_' | '(' | ')' | '\'' | '.' | ',' | '?' | '!' | ';')+ ;
NUMBER      : [0-9]+ ;
NEWLINE     : ('\r'? '\n' | '\r') ;
WS          : (' ' | '\t') ;
ANY : . ;


fragment LOWERCASE : [a-z] ;
fragment UPPERCASE : [A-Z] ;