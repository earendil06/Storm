// Generated from C:/GitClone/Storm/StormLang/src/main/antlr4/com/storm/antlr/grammar\Storm.g4 by ANTLR 4.7
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by StormParser.
function StormListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

StormListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
StormListener.prototype.constructor = StormListener;

// Enter a parse tree produced by StormParser#block.
StormListener.prototype.enterBlock = function(ctx) {
    console.log("bloooock");
};

// Exit a parse tree produced by StormParser#block.
StormListener.prototype.exitBlock = function(ctx) {
};


// Enter a parse tree produced by StormParser#block_name.
StormListener.prototype.enterBlock_name = function(ctx) {
};

// Exit a parse tree produced by StormParser#block_name.
StormListener.prototype.exitBlock_name = function(ctx) {
};


// Enter a parse tree produced by StormParser#traits.
StormListener.prototype.enterTraits = function(ctx) {
};

// Exit a parse tree produced by StormParser#traits.
StormListener.prototype.exitTraits = function(ctx) {
};


// Enter a parse tree produced by StormParser#stat.
StormListener.prototype.enterStat = function(ctx) {
};

// Exit a parse tree produced by StormParser#stat.
StormListener.prototype.exitStat = function(ctx) {
};


// Enter a parse tree produced by StormParser#ability_block.
StormListener.prototype.enterAbility_block = function(ctx) {
};

// Exit a parse tree produced by StormParser#ability_block.
StormListener.prototype.exitAbility_block = function(ctx) {
};


// Enter a parse tree produced by StormParser#ability.
StormListener.prototype.enterAbility = function(ctx) {
};

// Exit a parse tree produced by StormParser#ability.
StormListener.prototype.exitAbility = function(ctx) {
};


// Enter a parse tree produced by StormParser#action_block.
StormListener.prototype.enterAction_block = function(ctx) {
};

// Exit a parse tree produced by StormParser#action_block.
StormListener.prototype.exitAction_block = function(ctx) {
};


// Enter a parse tree produced by StormParser#action_block_name.
StormListener.prototype.enterAction_block_name = function(ctx) {
};

// Exit a parse tree produced by StormParser#action_block_name.
StormListener.prototype.exitAction_block_name = function(ctx) {
};


// Enter a parse tree produced by StormParser#action_component.
StormListener.prototype.enterAction_component = function(ctx) {
};

// Exit a parse tree produced by StormParser#action_component.
StormListener.prototype.exitAction_component = function(ctx) {
};


// Enter a parse tree produced by StormParser#feature_block.
StormListener.prototype.enterFeature_block = function(ctx) {
};

// Exit a parse tree produced by StormParser#feature_block.
StormListener.prototype.exitFeature_block = function(ctx) {
};


// Enter a parse tree produced by StormParser#feature_name.
StormListener.prototype.enterFeature_name = function(ctx) {
};

// Exit a parse tree produced by StormParser#feature_name.
StormListener.prototype.exitFeature_name = function(ctx) {
};


// Enter a parse tree produced by StormParser#to_hit.
StormListener.prototype.enterTo_hit = function(ctx) {
};

// Exit a parse tree produced by StormParser#to_hit.
StormListener.prototype.exitTo_hit = function(ctx) {
};


// Enter a parse tree produced by StormParser#reach.
StormListener.prototype.enterReach = function(ctx) {
};

// Exit a parse tree produced by StormParser#reach.
StormListener.prototype.exitReach = function(ctx) {
};


// Enter a parse tree produced by StormParser#range.
StormListener.prototype.enterRange = function(ctx) {
};

// Exit a parse tree produced by StormParser#range.
StormListener.prototype.exitRange = function(ctx) {
};


// Enter a parse tree produced by StormParser#hit.
StormListener.prototype.enterHit = function(ctx) {
};

// Exit a parse tree produced by StormParser#hit.
StormListener.prototype.exitHit = function(ctx) {
};


// Enter a parse tree produced by StormParser#dice.
StormListener.prototype.enterDice = function(ctx) {
};

// Exit a parse tree produced by StormParser#dice.
StormListener.prototype.exitDice = function(ctx) {
};


// Enter a parse tree produced by StormParser#modifier.
StormListener.prototype.enterModifier = function(ctx) {
};

// Exit a parse tree produced by StormParser#modifier.
StormListener.prototype.exitModifier = function(ctx) {
};


// Enter a parse tree produced by StormParser#description.
StormListener.prototype.enterDescription = function(ctx) {
};

// Exit a parse tree produced by StormParser#description.
StormListener.prototype.exitDescription = function(ctx) {
};



exports.StormListener = StormListener;