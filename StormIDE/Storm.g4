grammar Storm;

block         : block_name NEWLINE+ traits EOF ;
block_name    : .+?;

traits        : stat* ability_block action_block* feature_block* description? ;

stat          : STAT WS+ (NUMBER | dice) NEWLINE* ;
ability_block : (ability NEWLINE*)+ NEWLINE* ;
ability       : STAT_ID WS+ NUMBER NEWLINE* ;

action_block      : action_block_name NEWLINE action_component+ NEWLINE? ;
action_block_name : .+?;
action_component : (to_hit | reach | range | hit | description) NEWLINE? ;

feature_block : feature_name ARROW description? NEWLINE*;
feature_name  : .~(ARROW | '{' | '}')+;

to_hit        : MODIFIER_OP NUMBER WS+ TO_HIT NEWLINE ;
reach         : REACH WS+ NUMBER ;
range         : RANGE WS+ NUMBER SLASH NUMBER ;
hit           : HIT WS+ dice WS+ DAMAGE_TYPE ;

dice          : NUMBER D NUMBER (WS* modifier)? ;
modifier      : MODIFIER_OP WS* NUMBER ;

description   : WS* '{' .~('{' | '}')* '}' WS* ;


// Lexer Rules
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


//FEATURE_NAME : (WORD | NUMBER | MODIFIER_OP | WS+)+ ARROW;
WORD        : (LOWERCASE | UPPERCASE | '_' | '(' | ')' | '\'' | '.' | ',' | '?' | '!' | ';')+ ;
NUMBER      : [0-9]+ ;
NEWLINE     : ('\r'? '\n' | '\r')+ ;
WS          : (' ' | '\t') ;



fragment LOWERCASE : [a-z] ;
fragment UPPERCASE : [A-Z] ;