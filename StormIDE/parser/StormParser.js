// Generated from C:/GitClone/Storm/StormIDE\Storm.g4 by ANTLR 4.7
// jshint ignore: start
var antlr4 = require('antlr4/index');
var StormListener = require('./StormListener').StormListener;
var grammarFileName = "Storm.g4";

var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003\u0017\u0161\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f",
    "\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010",
    "\u0004\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013\u0004\u0014",
    "\t\u0014\u0004\u0015\t\u0015\u0003\u0002\u0003\u0002\u0006\u0002-\n",
    "\u0002\r\u0002\u000e\u0002.\u0003\u0002\u0003\u0002\u0007\u00023\n\u0002",
    "\f\u0002\u000e\u00026\u000b\u0002\u0003\u0002\u0003\u0002\u0003\u0003",
    "\u0006\u0003;\n\u0003\r\u0003\u000e\u0003<\u0003\u0003\u0007\u0003@",
    "\n\u0003\f\u0003\u000e\u0003C\u000b\u0003\u0003\u0004\u0007\u0004F\n",
    "\u0004\f\u0004\u000e\u0004I\u000b\u0004\u0003\u0004\u0003\u0004\u0007",
    "\u0004M\n\u0004\f\u0004\u000e\u0004P\u000b\u0004\u0003\u0004\u0007\u0004",
    "S\n\u0004\f\u0004\u000e\u0004V\u000b\u0004\u0003\u0005\u0003\u0005\u0006",
    "\u0005Z\n\u0005\r\u0005\u000e\u0005[\u0003\u0005\u0003\u0005\u0005\u0005",
    "`\n\u0005\u0003\u0005\u0006\u0005c\n\u0005\r\u0005\u000e\u0005d\u0003",
    "\u0006\u0003\u0006\u0003\u0006\u0006\u0006j\n\u0006\r\u0006\u000e\u0006",
    "k\u0003\u0006\u0007\u0006o\n\u0006\f\u0006\u000e\u0006r\u000b\u0006",
    "\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\b\u0003\b\u0006",
    "\bz\n\b\r\b\u000e\b{\u0003\b\u0003\b\u0007\b\u0080\n\b\f\b\u000e\b\u0083",
    "\u000b\b\u0003\b\u0007\b\u0086\n\b\f\b\u000e\b\u0089\u000b\b\u0003\b",
    "\u0007\b\u008c\n\b\f\b\u000e\b\u008f\u000b\b\u0003\b\u0003\b\u0007\b",
    "\u0093\n\b\f\b\u000e\b\u0096\u000b\b\u0003\t\u0003\t\u0006\t\u009a\n",
    "\t\r\t\u000e\t\u009b\u0003\t\u0003\t\u0006\t\u00a0\n\t\r\t\u000e\t\u00a1",
    "\u0003\t\u0007\t\u00a5\n\t\f\t\u000e\t\u00a8\u000b\t\u0003\t\u0005\t",
    "\u00ab\n\t\u0003\t\u0005\t\u00ae\n\t\u0003\t\u0007\t\u00b1\n\t\f\t\u000e",
    "\t\u00b4\u000b\t\u0003\n\u0003\n\u0006\n\u00b8\n\n\r\n\u000e\n\u00b9",
    "\u0003\u000b\u0007\u000b\u00bd\n\u000b\f\u000b\u000e\u000b\u00c0\u000b",
    "\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0005\u000b\u00c6",
    "\n\u000b\u0003\u000b\u0007\u000b\u00c9\n\u000b\f\u000b\u000e\u000b\u00cc",
    "\u000b\u000b\u0003\u000b\u0003\u000b\u0003\f\u0003\f\u0006\f\u00d2\n",
    "\f\r\f\u000e\f\u00d3\u0003\f\u0003\f\u0007\f\u00d8\n\f\f\f\u000e\f\u00db",
    "\u000b\f\u0003\f\u0007\f\u00de\n\f\f\f\u000e\f\u00e1\u000b\f\u0003\f",
    "\u0007\f\u00e4\n\f\f\f\u000e\f\u00e7\u000b\f\u0003\f\u0003\f\u0007\f",
    "\u00eb\n\f\f\f\u000e\f\u00ee\u000b\f\u0003\r\u0003\r\u0006\r\u00f2\n",
    "\r\r\r\u000e\r\u00f3\u0003\r\u0003\r\u0006\r\u00f8\n\r\r\r\u000e\r\u00f9",
    "\u0003\r\u0003\r\u0007\r\u00fe\n\r\f\r\u000e\r\u0101\u000b\r\u0003\u000e",
    "\u0006\u000e\u0104\n\u000e\r\u000e\u000e\u000e\u0105\u0003\u000e\u0007",
    "\u000e\u0109\n\u000e\f\u000e\u000e\u000e\u010c\u000b\u000e\u0003\u000f",
    "\u0003\u000f\u0003\u000f\u0006\u000f\u0111\n\u000f\r\u000f\u000e\u000f",
    "\u0112\u0003\u000f\u0003\u000f\u0003\u0010\u0003\u0010\u0006\u0010\u0119",
    "\n\u0010\r\u0010\u000e\u0010\u011a\u0003\u0010\u0003\u0010\u0003\u0011",
    "\u0003\u0011\u0006\u0011\u0121\n\u0011\r\u0011\u000e\u0011\u0122\u0003",
    "\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0012\u0003\u0012\u0006",
    "\u0012\u012b\n\u0012\r\u0012\u000e\u0012\u012c\u0003\u0012\u0003\u0012",
    "\u0006\u0012\u0131\n\u0012\r\u0012\u000e\u0012\u0132\u0003\u0012\u0003",
    "\u0012\u0003\u0013\u0003\u0013\u0003\u0013\u0003\u0013\u0007\u0013\u013b",
    "\n\u0013\f\u0013\u000e\u0013\u013e\u000b\u0013\u0003\u0013\u0005\u0013",
    "\u0141\n\u0013\u0003\u0014\u0003\u0014\u0007\u0014\u0145\n\u0014\f\u0014",
    "\u000e\u0014\u0148\u000b\u0014\u0003\u0014\u0003\u0014\u0003\u0015\u0007",
    "\u0015\u014d\n\u0015\f\u0015\u000e\u0015\u0150\u000b\u0015\u0003\u0015",
    "\u0003\u0015\u0007\u0015\u0154\n\u0015\f\u0015\u000e\u0015\u0157\u000b",
    "\u0015\u0003\u0015\u0007\u0015\u015a\n\u0015\f\u0015\u000e\u0015\u015d",
    "\u000b\u0015\u0003\u0015\u0003\u0015\u0003\u0015\t<A\u00b9\u0105\u010a",
    "\u0155\u015b\u0002\u0016\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014",
    "\u0016\u0018\u001a\u001c\u001e \"$&(\u0002\u0006\u0003\u0002\u0015\u0015",
    "\u0003\u0002\u0015\u0016\u0004\u0002\u0003\u0004\u0015\u0015\u0003\u0002",
    "\u0003\u0004\u0002\u017e\u0002*\u0003\u0002\u0002\u0002\u0004:\u0003",
    "\u0002\u0002\u0002\u0006G\u0003\u0002\u0002\u0002\bW\u0003\u0002\u0002",
    "\u0002\ni\u0003\u0002\u0002\u0002\fs\u0003\u0002\u0002\u0002\u000ew",
    "\u0003\u0002\u0002\u0002\u0010\u0097\u0003\u0002\u0002\u0002\u0012\u00b5",
    "\u0003\u0002\u0002\u0002\u0014\u00be\u0003\u0002\u0002\u0002\u0016\u00cf",
    "\u0003\u0002\u0002\u0002\u0018\u00ef\u0003\u0002\u0002\u0002\u001a\u0103",
    "\u0003\u0002\u0002\u0002\u001c\u010d\u0003\u0002\u0002\u0002\u001e\u0116",
    "\u0003\u0002\u0002\u0002 \u011e\u0003\u0002\u0002\u0002\"\u0128\u0003",
    "\u0002\u0002\u0002$\u0136\u0003\u0002\u0002\u0002&\u0142\u0003\u0002",
    "\u0002\u0002(\u014e\u0003\u0002\u0002\u0002*,\u0005\u0004\u0003\u0002",
    "+-\u0007\u0015\u0002\u0002,+\u0003\u0002\u0002\u0002-.\u0003\u0002\u0002",
    "\u0002.,\u0003\u0002\u0002\u0002./\u0003\u0002\u0002\u0002/0\u0003\u0002",
    "\u0002\u000204\u0005\u0006\u0004\u000213\u0007\u0015\u0002\u000221\u0003",
    "\u0002\u0002\u000236\u0003\u0002\u0002\u000242\u0003\u0002\u0002\u0002",
    "45\u0003\u0002\u0002\u000257\u0003\u0002\u0002\u000264\u0003\u0002\u0002",
    "\u000278\u0007\u0002\u0002\u00038\u0003\u0003\u0002\u0002\u00029;\u000b",
    "\u0002\u0002\u0002:9\u0003\u0002\u0002\u0002;<\u0003\u0002\u0002\u0002",
    "<=\u0003\u0002\u0002\u0002<:\u0003\u0002\u0002\u0002=A\u0003\u0002\u0002",
    "\u0002>@\n\u0002\u0002\u0002?>\u0003\u0002\u0002\u0002@C\u0003\u0002",
    "\u0002\u0002AB\u0003\u0002\u0002\u0002A?\u0003\u0002\u0002\u0002B\u0005",
    "\u0003\u0002\u0002\u0002CA\u0003\u0002\u0002\u0002DF\u0005\b\u0005\u0002",
    "ED\u0003\u0002\u0002\u0002FI\u0003\u0002\u0002\u0002GE\u0003\u0002\u0002",
    "\u0002GH\u0003\u0002\u0002\u0002HJ\u0003\u0002\u0002\u0002IG\u0003\u0002",
    "\u0002\u0002JN\u0005\n\u0006\u0002KM\u0005\u000e\b\u0002LK\u0003\u0002",
    "\u0002\u0002MP\u0003\u0002\u0002\u0002NL\u0003\u0002\u0002\u0002NO\u0003",
    "\u0002\u0002\u0002OT\u0003\u0002\u0002\u0002PN\u0003\u0002\u0002\u0002",
    "QS\u0005\u0016\f\u0002RQ\u0003\u0002\u0002\u0002SV\u0003\u0002\u0002",
    "\u0002TR\u0003\u0002\u0002\u0002TU\u0003\u0002\u0002\u0002U\u0007\u0003",
    "\u0002\u0002\u0002VT\u0003\u0002\u0002\u0002WY\u0007\u0007\u0002\u0002",
    "XZ\u0007\u0016\u0002\u0002YX\u0003\u0002\u0002\u0002Z[\u0003\u0002\u0002",
    "\u0002[Y\u0003\u0002\u0002\u0002[\\\u0003\u0002\u0002\u0002\\_\u0003",
    "\u0002\u0002\u0002]`\u0007\u0014\u0002\u0002^`\u0005$\u0013\u0002_]",
    "\u0003\u0002\u0002\u0002_^\u0003\u0002\u0002\u0002`b\u0003\u0002\u0002",
    "\u0002ac\u0007\u0015\u0002\u0002ba\u0003\u0002\u0002\u0002cd\u0003\u0002",
    "\u0002\u0002db\u0003\u0002\u0002\u0002de\u0003\u0002\u0002\u0002e\t",
    "\u0003\u0002\u0002\u0002fg\u0005\f\u0007\u0002gh\u0007\u0015\u0002\u0002",
    "hj\u0003\u0002\u0002\u0002if\u0003\u0002\u0002\u0002jk\u0003\u0002\u0002",
    "\u0002ki\u0003\u0002\u0002\u0002kl\u0003\u0002\u0002\u0002lp\u0003\u0002",
    "\u0002\u0002mo\u0007\u0015\u0002\u0002nm\u0003\u0002\u0002\u0002or\u0003",
    "\u0002\u0002\u0002pn\u0003\u0002\u0002\u0002pq\u0003\u0002\u0002\u0002",
    "q\u000b\u0003\u0002\u0002\u0002rp\u0003\u0002\u0002\u0002st\u0007\u0006",
    "\u0002\u0002tu\u0007\u0016\u0002\u0002uv\u0007\u0014\u0002\u0002v\r",
    "\u0003\u0002\u0002\u0002wy\u0007\u0011\u0002\u0002xz\u0007\u0016\u0002",
    "\u0002yx\u0003\u0002\u0002\u0002z{\u0003\u0002\u0002\u0002{y\u0003\u0002",
    "\u0002\u0002{|\u0003\u0002\u0002\u0002|}\u0003\u0002\u0002\u0002}\u0081",
    "\u0007\u0003\u0002\u0002~\u0080\u0007\u0015\u0002\u0002\u007f~\u0003",
    "\u0002\u0002\u0002\u0080\u0083\u0003\u0002\u0002\u0002\u0081\u007f\u0003",
    "\u0002\u0002\u0002\u0081\u0082\u0003\u0002\u0002\u0002\u0082\u0087\u0003",
    "\u0002\u0002\u0002\u0083\u0081\u0003\u0002\u0002\u0002\u0084\u0086\u0005",
    "\u0010\t\u0002\u0085\u0084\u0003\u0002\u0002\u0002\u0086\u0089\u0003",
    "\u0002\u0002\u0002\u0087\u0085\u0003\u0002\u0002\u0002\u0087\u0088\u0003",
    "\u0002\u0002\u0002\u0088\u008d\u0003\u0002\u0002\u0002\u0089\u0087\u0003",
    "\u0002\u0002\u0002\u008a\u008c\u0007\u0015\u0002\u0002\u008b\u008a\u0003",
    "\u0002\u0002\u0002\u008c\u008f\u0003\u0002\u0002\u0002\u008d\u008b\u0003",
    "\u0002\u0002\u0002\u008d\u008e\u0003\u0002\u0002\u0002\u008e\u0090\u0003",
    "\u0002\u0002\u0002\u008f\u008d\u0003\u0002\u0002\u0002\u0090\u0094\u0007",
    "\u0004\u0002\u0002\u0091\u0093\u0007\u0015\u0002\u0002\u0092\u0091\u0003",
    "\u0002\u0002\u0002\u0093\u0096\u0003\u0002\u0002\u0002\u0094\u0092\u0003",
    "\u0002\u0002\u0002\u0094\u0095\u0003\u0002\u0002\u0002\u0095\u000f\u0003",
    "\u0002\u0002\u0002\u0096\u0094\u0003\u0002\u0002\u0002\u0097\u0099\u0005",
    "\u0012\n\u0002\u0098\u009a\t\u0003\u0002\u0002\u0099\u0098\u0003\u0002",
    "\u0002\u0002\u009a\u009b\u0003\u0002\u0002\u0002\u009b\u0099\u0003\u0002",
    "\u0002\u0002\u009b\u009c\u0003\u0002\u0002\u0002\u009c\u009d\u0003\u0002",
    "\u0002\u0002\u009d\u009f\u0007\t\u0002\u0002\u009e\u00a0\t\u0003\u0002",
    "\u0002\u009f\u009e\u0003\u0002\u0002\u0002\u00a0\u00a1\u0003\u0002\u0002",
    "\u0002\u00a1\u009f\u0003\u0002\u0002\u0002\u00a1\u00a2\u0003\u0002\u0002",
    "\u0002\u00a2\u00a6\u0003\u0002\u0002\u0002\u00a3\u00a5\u0005\u0014\u000b",
    "\u0002\u00a4\u00a3\u0003\u0002\u0002\u0002\u00a5\u00a8\u0003\u0002\u0002",
    "\u0002\u00a6\u00a4\u0003\u0002\u0002\u0002\u00a6\u00a7\u0003\u0002\u0002",
    "\u0002\u00a7\u00aa\u0003\u0002\u0002\u0002\u00a8\u00a6\u0003\u0002\u0002",
    "\u0002\u00a9\u00ab\u0007\u0015\u0002\u0002\u00aa\u00a9\u0003\u0002\u0002",
    "\u0002\u00aa\u00ab\u0003\u0002\u0002\u0002\u00ab\u00ad\u0003\u0002\u0002",
    "\u0002\u00ac\u00ae\u0005(\u0015\u0002\u00ad\u00ac\u0003\u0002\u0002",
    "\u0002\u00ad\u00ae\u0003\u0002\u0002\u0002\u00ae\u00b2\u0003\u0002\u0002",
    "\u0002\u00af\u00b1\u0007\u0015\u0002\u0002\u00b0\u00af\u0003\u0002\u0002",
    "\u0002\u00b1\u00b4\u0003\u0002\u0002\u0002\u00b2\u00b0\u0003\u0002\u0002",
    "\u0002\u00b2\u00b3\u0003\u0002\u0002\u0002\u00b3\u0011\u0003\u0002\u0002",
    "\u0002\u00b4\u00b2\u0003\u0002\u0002\u0002\u00b5\u00b7\u000b\u0002\u0002",
    "\u0002\u00b6\u00b8\n\u0004\u0002\u0002\u00b7\u00b6\u0003\u0002\u0002",
    "\u0002\u00b8\u00b9\u0003\u0002\u0002\u0002\u00b9\u00ba\u0003\u0002\u0002",
    "\u0002\u00b9\u00b7\u0003\u0002\u0002\u0002\u00ba\u0013\u0003\u0002\u0002",
    "\u0002\u00bb\u00bd\u0007\u0016\u0002\u0002\u00bc\u00bb\u0003\u0002\u0002",
    "\u0002\u00bd\u00c0\u0003\u0002\u0002\u0002\u00be\u00bc\u0003\u0002\u0002",
    "\u0002\u00be\u00bf\u0003\u0002\u0002\u0002\u00bf\u00c5\u0003\u0002\u0002",
    "\u0002\u00c0\u00be\u0003\u0002\u0002\u0002\u00c1\u00c6\u0005\u001c\u000f",
    "\u0002\u00c2\u00c6\u0005\u001e\u0010\u0002\u00c3\u00c6\u0005 \u0011",
    "\u0002\u00c4\u00c6\u0005\"\u0012\u0002\u00c5\u00c1\u0003\u0002\u0002",
    "\u0002\u00c5\u00c2\u0003\u0002\u0002\u0002\u00c5\u00c3\u0003\u0002\u0002",
    "\u0002\u00c5\u00c4\u0003\u0002\u0002\u0002\u00c6\u00ca\u0003\u0002\u0002",
    "\u0002\u00c7\u00c9\u0007\u0016\u0002\u0002\u00c8\u00c7\u0003\u0002\u0002",
    "\u0002\u00c9\u00cc\u0003\u0002\u0002\u0002\u00ca\u00c8\u0003\u0002\u0002",
    "\u0002\u00ca\u00cb\u0003\u0002\u0002\u0002\u00cb\u00cd\u0003\u0002\u0002",
    "\u0002\u00cc\u00ca\u0003\u0002\u0002\u0002\u00cd\u00ce\u0007\u0015\u0002",
    "\u0002\u00ce\u0015\u0003\u0002\u0002\u0002\u00cf\u00d1\u0007\u0012\u0002",
    "\u0002\u00d0\u00d2\u0007\u0016\u0002\u0002\u00d1\u00d0\u0003\u0002\u0002",
    "\u0002\u00d2\u00d3\u0003\u0002\u0002\u0002\u00d3\u00d1\u0003\u0002\u0002",
    "\u0002\u00d3\u00d4\u0003\u0002\u0002\u0002\u00d4\u00d5\u0003\u0002\u0002",
    "\u0002\u00d5\u00d9\u0007\u0003\u0002\u0002\u00d6\u00d8\u0007\u0015\u0002",
    "\u0002\u00d7\u00d6\u0003\u0002\u0002\u0002\u00d8\u00db\u0003\u0002\u0002",
    "\u0002\u00d9\u00d7\u0003\u0002\u0002\u0002\u00d9\u00da\u0003\u0002\u0002",
    "\u0002\u00da\u00df\u0003\u0002\u0002\u0002\u00db\u00d9\u0003\u0002\u0002",
    "\u0002\u00dc\u00de\u0005\u0018\r\u0002\u00dd\u00dc\u0003\u0002\u0002",
    "\u0002\u00de\u00e1\u0003\u0002\u0002\u0002\u00df\u00dd\u0003\u0002\u0002",
    "\u0002\u00df\u00e0\u0003\u0002\u0002\u0002\u00e0\u00e5\u0003\u0002\u0002",
    "\u0002\u00e1\u00df\u0003\u0002\u0002\u0002\u00e2\u00e4\u0007\u0015\u0002",
    "\u0002\u00e3\u00e2\u0003\u0002\u0002\u0002\u00e4\u00e7\u0003\u0002\u0002",
    "\u0002\u00e5\u00e3\u0003\u0002\u0002\u0002\u00e5\u00e6\u0003\u0002\u0002",
    "\u0002\u00e6\u00e8\u0003\u0002\u0002\u0002\u00e7\u00e5\u0003\u0002\u0002",
    "\u0002\u00e8\u00ec\u0007\u0004\u0002\u0002\u00e9\u00eb\u0007\u0015\u0002",
    "\u0002\u00ea\u00e9\u0003\u0002\u0002\u0002\u00eb\u00ee\u0003\u0002\u0002",
    "\u0002\u00ec\u00ea\u0003\u0002\u0002\u0002\u00ec\u00ed\u0003\u0002\u0002",
    "\u0002\u00ed\u0017\u0003\u0002\u0002\u0002\u00ee\u00ec\u0003\u0002\u0002",
    "\u0002\u00ef\u00f1\u0005\u001a\u000e\u0002\u00f0\u00f2\t\u0003\u0002",
    "\u0002\u00f1\u00f0\u0003\u0002\u0002\u0002\u00f2\u00f3\u0003\u0002\u0002",
    "\u0002\u00f3\u00f1\u0003\u0002\u0002\u0002\u00f3\u00f4\u0003\u0002\u0002",
    "\u0002\u00f4\u00f5\u0003\u0002\u0002\u0002\u00f5\u00f7\u0007\t\u0002",
    "\u0002\u00f6\u00f8\t\u0003\u0002\u0002\u00f7\u00f6\u0003\u0002\u0002",
    "\u0002\u00f8\u00f9\u0003\u0002\u0002\u0002\u00f9\u00f7\u0003\u0002\u0002",
    "\u0002\u00f9\u00fa\u0003\u0002\u0002\u0002\u00fa\u00fb\u0003\u0002\u0002",
    "\u0002\u00fb\u00ff\u0005(\u0015\u0002\u00fc\u00fe\u0007\u0015\u0002",
    "\u0002\u00fd\u00fc\u0003\u0002\u0002\u0002\u00fe\u0101\u0003\u0002\u0002",
    "\u0002\u00ff\u00fd\u0003\u0002\u0002\u0002\u00ff\u0100\u0003\u0002\u0002",
    "\u0002\u0100\u0019\u0003\u0002\u0002\u0002\u0101\u00ff\u0003\u0002\u0002",
    "\u0002\u0102\u0104\u000b\u0002\u0002\u0002\u0103\u0102\u0003\u0002\u0002",
    "\u0002\u0104\u0105\u0003\u0002\u0002\u0002\u0105\u0106\u0003\u0002\u0002",
    "\u0002\u0105\u0103\u0003\u0002\u0002\u0002\u0106\u010a\u0003\u0002\u0002",
    "\u0002\u0107\u0109\n\u0004\u0002\u0002\u0108\u0107\u0003\u0002\u0002",
    "\u0002\u0109\u010c\u0003\u0002\u0002\u0002\u010a\u010b\u0003\u0002\u0002",
    "\u0002\u010a\u0108\u0003\u0002\u0002\u0002\u010b\u001b\u0003\u0002\u0002",
    "\u0002\u010c\u010a\u0003\u0002\u0002\u0002\u010d\u010e\u0007\u0005\u0002",
    "\u0002\u010e\u0110\u0007\u0014\u0002\u0002\u010f\u0111\u0007\u0016\u0002",
    "\u0002\u0110\u010f\u0003\u0002\u0002\u0002\u0111\u0112\u0003\u0002\u0002",
    "\u0002\u0112\u0110\u0003\u0002\u0002\u0002\u0112\u0113\u0003\u0002\u0002",
    "\u0002\u0113\u0114\u0003\u0002\u0002\u0002\u0114\u0115\u0007\n\u0002",
    "\u0002\u0115\u001d\u0003\u0002\u0002\u0002\u0116\u0118\u0007\r\u0002",
    "\u0002\u0117\u0119\u0007\u0016\u0002\u0002\u0118\u0117\u0003\u0002\u0002",
    "\u0002\u0119\u011a\u0003\u0002\u0002\u0002\u011a\u0118\u0003\u0002\u0002",
    "\u0002\u011a\u011b\u0003\u0002\u0002\u0002\u011b\u011c\u0003\u0002\u0002",
    "\u0002\u011c\u011d\u0007\u0014\u0002\u0002\u011d\u001f\u0003\u0002\u0002",
    "\u0002\u011e\u0120\u0007\u000e\u0002\u0002\u011f\u0121\u0007\u0016\u0002",
    "\u0002\u0120\u011f\u0003\u0002\u0002\u0002\u0121\u0122\u0003\u0002\u0002",
    "\u0002\u0122\u0120\u0003\u0002\u0002\u0002\u0122\u0123\u0003\u0002\u0002",
    "\u0002\u0123\u0124\u0003\u0002\u0002\u0002\u0124\u0125\u0007\u0014\u0002",
    "\u0002\u0125\u0126\u0007\u0010\u0002\u0002\u0126\u0127\u0007\u0014\u0002",
    "\u0002\u0127!\u0003\u0002\u0002\u0002\u0128\u012a\u0007\u000b\u0002",
    "\u0002\u0129\u012b\u0007\u0016\u0002\u0002\u012a\u0129\u0003\u0002\u0002",
    "\u0002\u012b\u012c\u0003\u0002\u0002\u0002\u012c\u012a\u0003\u0002\u0002",
    "\u0002\u012c\u012d\u0003\u0002\u0002\u0002\u012d\u012e\u0003\u0002\u0002",
    "\u0002\u012e\u0130\u0005$\u0013\u0002\u012f\u0131\u0007\u0016\u0002",
    "\u0002\u0130\u012f\u0003\u0002\u0002\u0002\u0131\u0132\u0003\u0002\u0002",
    "\u0002\u0132\u0130\u0003\u0002\u0002\u0002\u0132\u0133\u0003\u0002\u0002",
    "\u0002\u0133\u0134\u0003\u0002\u0002\u0002\u0134\u0135\u0007\b\u0002",
    "\u0002\u0135#\u0003\u0002\u0002\u0002\u0136\u0137\u0007\u0014\u0002",
    "\u0002\u0137\u0138\u0007\u000f\u0002\u0002\u0138\u0140\u0007\u0014\u0002",
    "\u0002\u0139\u013b\u0007\u0016\u0002\u0002\u013a\u0139\u0003\u0002\u0002",
    "\u0002\u013b\u013e\u0003\u0002\u0002\u0002\u013c\u013a\u0003\u0002\u0002",
    "\u0002\u013c\u013d\u0003\u0002\u0002\u0002\u013d\u013f\u0003\u0002\u0002",
    "\u0002\u013e\u013c\u0003\u0002\u0002\u0002\u013f\u0141\u0005&\u0014",
    "\u0002\u0140\u013c\u0003\u0002\u0002\u0002\u0140\u0141\u0003\u0002\u0002",
    "\u0002\u0141%\u0003\u0002\u0002\u0002\u0142\u0146\u0007\u0005\u0002",
    "\u0002\u0143\u0145\u0007\u0016\u0002\u0002\u0144\u0143\u0003\u0002\u0002",
    "\u0002\u0145\u0148\u0003\u0002\u0002\u0002\u0146\u0144\u0003\u0002\u0002",
    "\u0002\u0146\u0147\u0003\u0002\u0002\u0002\u0147\u0149\u0003\u0002\u0002",
    "\u0002\u0148\u0146\u0003\u0002\u0002\u0002\u0149\u014a\u0007\u0014\u0002",
    "\u0002\u014a\'\u0003\u0002\u0002\u0002\u014b\u014d\u0007\u0016\u0002",
    "\u0002\u014c\u014b\u0003\u0002\u0002\u0002\u014d\u0150\u0003\u0002\u0002",
    "\u0002\u014e\u014c\u0003\u0002\u0002\u0002\u014e\u014f\u0003\u0002\u0002",
    "\u0002\u014f\u0151\u0003\u0002\u0002\u0002\u0150\u014e\u0003\u0002\u0002",
    "\u0002\u0151\u0155\u0007\u0003\u0002\u0002\u0152\u0154\u000b\u0002\u0002",
    "\u0002\u0153\u0152\u0003\u0002\u0002\u0002\u0154\u0157\u0003\u0002\u0002",
    "\u0002\u0155\u0156\u0003\u0002\u0002\u0002\u0155\u0153\u0003\u0002\u0002",
    "\u0002\u0156\u015b\u0003\u0002\u0002\u0002\u0157\u0155\u0003\u0002\u0002",
    "\u0002\u0158\u015a\n\u0005\u0002\u0002\u0159\u0158\u0003\u0002\u0002",
    "\u0002\u015a\u015d\u0003\u0002\u0002\u0002\u015b\u015c\u0003\u0002\u0002",
    "\u0002\u015b\u0159\u0003\u0002\u0002\u0002\u015c\u015e\u0003\u0002\u0002",
    "\u0002\u015d\u015b\u0003\u0002\u0002\u0002\u015e\u015f\u0007\u0004\u0002",
    "\u0002\u015f)\u0003\u0002\u0002\u00022.4<AGNT[_dkp{\u0081\u0087\u008d",
    "\u0094\u009b\u00a1\u00a6\u00aa\u00ad\u00b2\u00b9\u00be\u00c5\u00ca\u00d3",
    "\u00d9\u00df\u00e5\u00ec\u00f3\u00f9\u00ff\u0105\u010a\u0112\u011a\u0122",
    "\u012c\u0132\u013c\u0140\u0146\u014e\u0155\u015b"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'{'", "'}'", null, null, null, null, "'=>'", 
                     "'to hit'", "'hit'", "'action'", "'reach'", "'range'", 
                     "'d'", "'/'", "'actions'", "'features'" ];

var symbolicNames = [ null, "OPEN", "CLOSE", "MODIFIER_OP", "STAT_ID", "STAT", 
                      "DAMAGE_TYPE", "ARROW", "TO_HIT", "HIT", "ACTION", 
                      "REACH", "RANGE", "D", "SLASH", "ACTIONS", "FEATURES", 
                      "WORD", "NUMBER", "NEWLINE", "WS", "ANY" ];

var ruleNames =  [ "block", "block_name", "traits", "stat", "ability_block", 
                   "ability", "action_zone", "action_block", "action_block_name", 
                   "action_component", "feature_zone", "feature_block", 
                   "feature_name", "to_hit", "reach", "range", "hit", "dice", 
                   "modifier", "description" ];

function StormParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

StormParser.prototype = Object.create(antlr4.Parser.prototype);
StormParser.prototype.constructor = StormParser;

Object.defineProperty(StormParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

StormParser.EOF = antlr4.Token.EOF;
StormParser.OPEN = 1;
StormParser.CLOSE = 2;
StormParser.MODIFIER_OP = 3;
StormParser.STAT_ID = 4;
StormParser.STAT = 5;
StormParser.DAMAGE_TYPE = 6;
StormParser.ARROW = 7;
StormParser.TO_HIT = 8;
StormParser.HIT = 9;
StormParser.ACTION = 10;
StormParser.REACH = 11;
StormParser.RANGE = 12;
StormParser.D = 13;
StormParser.SLASH = 14;
StormParser.ACTIONS = 15;
StormParser.FEATURES = 16;
StormParser.WORD = 17;
StormParser.NUMBER = 18;
StormParser.NEWLINE = 19;
StormParser.WS = 20;
StormParser.ANY = 21;

StormParser.RULE_block = 0;
StormParser.RULE_block_name = 1;
StormParser.RULE_traits = 2;
StormParser.RULE_stat = 3;
StormParser.RULE_ability_block = 4;
StormParser.RULE_ability = 5;
StormParser.RULE_action_zone = 6;
StormParser.RULE_action_block = 7;
StormParser.RULE_action_block_name = 8;
StormParser.RULE_action_component = 9;
StormParser.RULE_feature_zone = 10;
StormParser.RULE_feature_block = 11;
StormParser.RULE_feature_name = 12;
StormParser.RULE_to_hit = 13;
StormParser.RULE_reach = 14;
StormParser.RULE_range = 15;
StormParser.RULE_hit = 16;
StormParser.RULE_dice = 17;
StormParser.RULE_modifier = 18;
StormParser.RULE_description = 19;

function BlockContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = StormParser.RULE_block;
    return this;
}

BlockContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
BlockContext.prototype.constructor = BlockContext;

BlockContext.prototype.block_name = function() {
    return this.getTypedRuleContext(Block_nameContext,0);
};

BlockContext.prototype.traits = function() {
    return this.getTypedRuleContext(TraitsContext,0);
};

BlockContext.prototype.EOF = function() {
    return this.getToken(StormParser.EOF, 0);
};

BlockContext.prototype.NEWLINE = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(StormParser.NEWLINE);
    } else {
        return this.getToken(StormParser.NEWLINE, i);
    }
};


BlockContext.prototype.enterRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.enterBlock(this);
	}
};

BlockContext.prototype.exitRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.exitBlock(this);
	}
};




StormParser.BlockContext = BlockContext;

StormParser.prototype.block = function() {

    var localctx = new BlockContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, StormParser.RULE_block);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 40;
        this.block_name();
        this.state = 42; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 41;
            this.match(StormParser.NEWLINE);
            this.state = 44; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===StormParser.NEWLINE);
        this.state = 46;
        this.traits();
        this.state = 50;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===StormParser.NEWLINE) {
            this.state = 47;
            this.match(StormParser.NEWLINE);
            this.state = 52;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 53;
        this.match(StormParser.EOF);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function Block_nameContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = StormParser.RULE_block_name;
    return this;
}

Block_nameContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Block_nameContext.prototype.constructor = Block_nameContext;

Block_nameContext.prototype.NEWLINE = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(StormParser.NEWLINE);
    } else {
        return this.getToken(StormParser.NEWLINE, i);
    }
};


Block_nameContext.prototype.enterRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.enterBlock_name(this);
	}
};

Block_nameContext.prototype.exitRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.exitBlock_name(this);
	}
};




StormParser.Block_nameContext = Block_nameContext;

StormParser.prototype.block_name = function() {

    var localctx = new Block_nameContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, StormParser.RULE_block_name);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 56; 
        this._errHandler.sync(this);
        var _alt = 1+1;
        do {
        	switch (_alt) {
        	case 1+1:
        		this.state = 55;
        		this.matchWildcard();
        		break;
        	default:
        		throw new antlr4.error.NoViableAltException(this);
        	}
        	this.state = 58; 
        	this._errHandler.sync(this);
        	_alt = this._interp.adaptivePredict(this._input,2, this._ctx);
        } while ( _alt!=1 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
        this.state = 63;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,3,this._ctx)
        while(_alt!=1 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1+1) {
                this.state = 60;
                _la = this._input.LA(1);
                if(_la<=0 || _la===StormParser.NEWLINE) {
                this._errHandler.recoverInline(this);
                }
                else {
                	this._errHandler.reportMatch(this);
                    this.consume();
                } 
            }
            this.state = 65;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,3,this._ctx);
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function TraitsContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = StormParser.RULE_traits;
    return this;
}

TraitsContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
TraitsContext.prototype.constructor = TraitsContext;

TraitsContext.prototype.ability_block = function() {
    return this.getTypedRuleContext(Ability_blockContext,0);
};

TraitsContext.prototype.stat = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(StatContext);
    } else {
        return this.getTypedRuleContext(StatContext,i);
    }
};

TraitsContext.prototype.action_zone = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(Action_zoneContext);
    } else {
        return this.getTypedRuleContext(Action_zoneContext,i);
    }
};

TraitsContext.prototype.feature_zone = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(Feature_zoneContext);
    } else {
        return this.getTypedRuleContext(Feature_zoneContext,i);
    }
};

TraitsContext.prototype.enterRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.enterTraits(this);
	}
};

TraitsContext.prototype.exitRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.exitTraits(this);
	}
};




StormParser.TraitsContext = TraitsContext;

StormParser.prototype.traits = function() {

    var localctx = new TraitsContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, StormParser.RULE_traits);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 69;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===StormParser.STAT) {
            this.state = 66;
            this.stat();
            this.state = 71;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 72;
        this.ability_block();
        this.state = 76;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===StormParser.ACTIONS) {
            this.state = 73;
            this.action_zone();
            this.state = 78;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 82;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===StormParser.FEATURES) {
            this.state = 79;
            this.feature_zone();
            this.state = 84;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function StatContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = StormParser.RULE_stat;
    return this;
}

StatContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StatContext.prototype.constructor = StatContext;

StatContext.prototype.STAT = function() {
    return this.getToken(StormParser.STAT, 0);
};

StatContext.prototype.NUMBER = function() {
    return this.getToken(StormParser.NUMBER, 0);
};

StatContext.prototype.dice = function() {
    return this.getTypedRuleContext(DiceContext,0);
};

StatContext.prototype.WS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(StormParser.WS);
    } else {
        return this.getToken(StormParser.WS, i);
    }
};


StatContext.prototype.NEWLINE = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(StormParser.NEWLINE);
    } else {
        return this.getToken(StormParser.NEWLINE, i);
    }
};


StatContext.prototype.enterRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.enterStat(this);
	}
};

StatContext.prototype.exitRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.exitStat(this);
	}
};




StormParser.StatContext = StatContext;

StormParser.prototype.stat = function() {

    var localctx = new StatContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, StormParser.RULE_stat);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 85;
        this.match(StormParser.STAT);
        this.state = 87; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 86;
            this.match(StormParser.WS);
            this.state = 89; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===StormParser.WS);
        this.state = 93;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,8,this._ctx);
        switch(la_) {
        case 1:
            this.state = 91;
            this.match(StormParser.NUMBER);
            break;

        case 2:
            this.state = 92;
            this.dice();
            break;

        }
        this.state = 96; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 95;
            this.match(StormParser.NEWLINE);
            this.state = 98; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===StormParser.NEWLINE);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function Ability_blockContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = StormParser.RULE_ability_block;
    return this;
}

Ability_blockContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Ability_blockContext.prototype.constructor = Ability_blockContext;

Ability_blockContext.prototype.ability = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(AbilityContext);
    } else {
        return this.getTypedRuleContext(AbilityContext,i);
    }
};

Ability_blockContext.prototype.NEWLINE = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(StormParser.NEWLINE);
    } else {
        return this.getToken(StormParser.NEWLINE, i);
    }
};


Ability_blockContext.prototype.enterRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.enterAbility_block(this);
	}
};

Ability_blockContext.prototype.exitRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.exitAbility_block(this);
	}
};




StormParser.Ability_blockContext = Ability_blockContext;

StormParser.prototype.ability_block = function() {

    var localctx = new Ability_blockContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, StormParser.RULE_ability_block);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 103; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 100;
            this.ability();
            this.state = 101;
            this.match(StormParser.NEWLINE);
            this.state = 105; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===StormParser.STAT_ID);
        this.state = 110;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,11,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 107;
                this.match(StormParser.NEWLINE); 
            }
            this.state = 112;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,11,this._ctx);
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function AbilityContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = StormParser.RULE_ability;
    return this;
}

AbilityContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AbilityContext.prototype.constructor = AbilityContext;

AbilityContext.prototype.STAT_ID = function() {
    return this.getToken(StormParser.STAT_ID, 0);
};

AbilityContext.prototype.WS = function() {
    return this.getToken(StormParser.WS, 0);
};

AbilityContext.prototype.NUMBER = function() {
    return this.getToken(StormParser.NUMBER, 0);
};

AbilityContext.prototype.enterRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.enterAbility(this);
	}
};

AbilityContext.prototype.exitRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.exitAbility(this);
	}
};




StormParser.AbilityContext = AbilityContext;

StormParser.prototype.ability = function() {

    var localctx = new AbilityContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, StormParser.RULE_ability);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 113;
        this.match(StormParser.STAT_ID);
        this.state = 114;
        this.match(StormParser.WS);
        this.state = 115;
        this.match(StormParser.NUMBER);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function Action_zoneContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = StormParser.RULE_action_zone;
    return this;
}

Action_zoneContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Action_zoneContext.prototype.constructor = Action_zoneContext;

Action_zoneContext.prototype.ACTIONS = function() {
    return this.getToken(StormParser.ACTIONS, 0);
};

Action_zoneContext.prototype.OPEN = function() {
    return this.getToken(StormParser.OPEN, 0);
};

Action_zoneContext.prototype.CLOSE = function() {
    return this.getToken(StormParser.CLOSE, 0);
};

Action_zoneContext.prototype.WS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(StormParser.WS);
    } else {
        return this.getToken(StormParser.WS, i);
    }
};


Action_zoneContext.prototype.NEWLINE = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(StormParser.NEWLINE);
    } else {
        return this.getToken(StormParser.NEWLINE, i);
    }
};


Action_zoneContext.prototype.action_block = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(Action_blockContext);
    } else {
        return this.getTypedRuleContext(Action_blockContext,i);
    }
};

Action_zoneContext.prototype.enterRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.enterAction_zone(this);
	}
};

Action_zoneContext.prototype.exitRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.exitAction_zone(this);
	}
};




StormParser.Action_zoneContext = Action_zoneContext;

StormParser.prototype.action_zone = function() {

    var localctx = new Action_zoneContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, StormParser.RULE_action_zone);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 117;
        this.match(StormParser.ACTIONS);
        this.state = 119; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 118;
            this.match(StormParser.WS);
            this.state = 121; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===StormParser.WS);
        this.state = 123;
        this.match(StormParser.OPEN);
        this.state = 127;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,13,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 124;
                this.match(StormParser.NEWLINE); 
            }
            this.state = 129;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,13,this._ctx);
        }

        this.state = 133;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,14,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 130;
                this.action_block(); 
            }
            this.state = 135;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,14,this._ctx);
        }

        this.state = 139;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===StormParser.NEWLINE) {
            this.state = 136;
            this.match(StormParser.NEWLINE);
            this.state = 141;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 142;
        this.match(StormParser.CLOSE);
        this.state = 146;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,16,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 143;
                this.match(StormParser.NEWLINE); 
            }
            this.state = 148;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,16,this._ctx);
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function Action_blockContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = StormParser.RULE_action_block;
    return this;
}

Action_blockContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Action_blockContext.prototype.constructor = Action_blockContext;

Action_blockContext.prototype.action_block_name = function() {
    return this.getTypedRuleContext(Action_block_nameContext,0);
};

Action_blockContext.prototype.ARROW = function() {
    return this.getToken(StormParser.ARROW, 0);
};

Action_blockContext.prototype.action_component = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(Action_componentContext);
    } else {
        return this.getTypedRuleContext(Action_componentContext,i);
    }
};

Action_blockContext.prototype.NEWLINE = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(StormParser.NEWLINE);
    } else {
        return this.getToken(StormParser.NEWLINE, i);
    }
};


Action_blockContext.prototype.description = function() {
    return this.getTypedRuleContext(DescriptionContext,0);
};

Action_blockContext.prototype.WS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(StormParser.WS);
    } else {
        return this.getToken(StormParser.WS, i);
    }
};


Action_blockContext.prototype.enterRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.enterAction_block(this);
	}
};

Action_blockContext.prototype.exitRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.exitAction_block(this);
	}
};




StormParser.Action_blockContext = Action_blockContext;

StormParser.prototype.action_block = function() {

    var localctx = new Action_blockContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, StormParser.RULE_action_block);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 149;
        this.action_block_name();
        this.state = 151; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 150;
            _la = this._input.LA(1);
            if(!(_la===StormParser.NEWLINE || _la===StormParser.WS)) {
            this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
            this.state = 153; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===StormParser.NEWLINE || _la===StormParser.WS);
        this.state = 155;
        this.match(StormParser.ARROW);
        this.state = 157; 
        this._errHandler.sync(this);
        var _alt = 1;
        do {
        	switch (_alt) {
        	case 1:
        		this.state = 156;
        		_la = this._input.LA(1);
        		if(!(_la===StormParser.NEWLINE || _la===StormParser.WS)) {
        		this._errHandler.recoverInline(this);
        		}
        		else {
        			this._errHandler.reportMatch(this);
        		    this.consume();
        		}
        		break;
        	default:
        		throw new antlr4.error.NoViableAltException(this);
        	}
        	this.state = 159; 
        	this._errHandler.sync(this);
        	_alt = this._interp.adaptivePredict(this._input,18, this._ctx);
        } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
        this.state = 164;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,19,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 161;
                this.action_component(); 
            }
            this.state = 166;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,19,this._ctx);
        }

        this.state = 168;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,20,this._ctx);
        if(la_===1) {
            this.state = 167;
            this.match(StormParser.NEWLINE);

        }
        this.state = 171;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,21,this._ctx);
        if(la_===1) {
            this.state = 170;
            this.description();

        }
        this.state = 176;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,22,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 173;
                this.match(StormParser.NEWLINE); 
            }
            this.state = 178;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,22,this._ctx);
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function Action_block_nameContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = StormParser.RULE_action_block_name;
    return this;
}

Action_block_nameContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Action_block_nameContext.prototype.constructor = Action_block_nameContext;

Action_block_nameContext.prototype.NEWLINE = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(StormParser.NEWLINE);
    } else {
        return this.getToken(StormParser.NEWLINE, i);
    }
};


Action_block_nameContext.prototype.OPEN = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(StormParser.OPEN);
    } else {
        return this.getToken(StormParser.OPEN, i);
    }
};


Action_block_nameContext.prototype.CLOSE = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(StormParser.CLOSE);
    } else {
        return this.getToken(StormParser.CLOSE, i);
    }
};


Action_block_nameContext.prototype.enterRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.enterAction_block_name(this);
	}
};

Action_block_nameContext.prototype.exitRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.exitAction_block_name(this);
	}
};




StormParser.Action_block_nameContext = Action_block_nameContext;

StormParser.prototype.action_block_name = function() {

    var localctx = new Action_block_nameContext(this, this._ctx, this.state);
    this.enterRule(localctx, 16, StormParser.RULE_action_block_name);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 179;
        this.matchWildcard();
        this.state = 181; 
        this._errHandler.sync(this);
        var _alt = 1+1;
        do {
        	switch (_alt) {
        	case 1+1:
        		this.state = 180;
        		_la = this._input.LA(1);
        		if(_la<=0 || (((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << StormParser.OPEN) | (1 << StormParser.CLOSE) | (1 << StormParser.NEWLINE))) !== 0)) {
        		this._errHandler.recoverInline(this);
        		}
        		else {
        			this._errHandler.reportMatch(this);
        		    this.consume();
        		}
        		break;
        	default:
        		throw new antlr4.error.NoViableAltException(this);
        	}
        	this.state = 183; 
        	this._errHandler.sync(this);
        	_alt = this._interp.adaptivePredict(this._input,23, this._ctx);
        } while ( _alt!=1 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function Action_componentContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = StormParser.RULE_action_component;
    return this;
}

Action_componentContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Action_componentContext.prototype.constructor = Action_componentContext;

Action_componentContext.prototype.NEWLINE = function() {
    return this.getToken(StormParser.NEWLINE, 0);
};

Action_componentContext.prototype.to_hit = function() {
    return this.getTypedRuleContext(To_hitContext,0);
};

Action_componentContext.prototype.reach = function() {
    return this.getTypedRuleContext(ReachContext,0);
};

Action_componentContext.prototype.range = function() {
    return this.getTypedRuleContext(RangeContext,0);
};

Action_componentContext.prototype.hit = function() {
    return this.getTypedRuleContext(HitContext,0);
};

Action_componentContext.prototype.WS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(StormParser.WS);
    } else {
        return this.getToken(StormParser.WS, i);
    }
};


Action_componentContext.prototype.enterRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.enterAction_component(this);
	}
};

Action_componentContext.prototype.exitRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.exitAction_component(this);
	}
};




StormParser.Action_componentContext = Action_componentContext;

StormParser.prototype.action_component = function() {

    var localctx = new Action_componentContext(this, this._ctx, this.state);
    this.enterRule(localctx, 18, StormParser.RULE_action_component);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 188;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===StormParser.WS) {
            this.state = 185;
            this.match(StormParser.WS);
            this.state = 190;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 195;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case StormParser.MODIFIER_OP:
            this.state = 191;
            this.to_hit();
            break;
        case StormParser.REACH:
            this.state = 192;
            this.reach();
            break;
        case StormParser.RANGE:
            this.state = 193;
            this.range();
            break;
        case StormParser.HIT:
            this.state = 194;
            this.hit();
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
        this.state = 200;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===StormParser.WS) {
            this.state = 197;
            this.match(StormParser.WS);
            this.state = 202;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 203;
        this.match(StormParser.NEWLINE);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function Feature_zoneContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = StormParser.RULE_feature_zone;
    return this;
}

Feature_zoneContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Feature_zoneContext.prototype.constructor = Feature_zoneContext;

Feature_zoneContext.prototype.FEATURES = function() {
    return this.getToken(StormParser.FEATURES, 0);
};

Feature_zoneContext.prototype.OPEN = function() {
    return this.getToken(StormParser.OPEN, 0);
};

Feature_zoneContext.prototype.CLOSE = function() {
    return this.getToken(StormParser.CLOSE, 0);
};

Feature_zoneContext.prototype.WS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(StormParser.WS);
    } else {
        return this.getToken(StormParser.WS, i);
    }
};


Feature_zoneContext.prototype.NEWLINE = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(StormParser.NEWLINE);
    } else {
        return this.getToken(StormParser.NEWLINE, i);
    }
};


Feature_zoneContext.prototype.feature_block = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(Feature_blockContext);
    } else {
        return this.getTypedRuleContext(Feature_blockContext,i);
    }
};

Feature_zoneContext.prototype.enterRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.enterFeature_zone(this);
	}
};

Feature_zoneContext.prototype.exitRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.exitFeature_zone(this);
	}
};




StormParser.Feature_zoneContext = Feature_zoneContext;

StormParser.prototype.feature_zone = function() {

    var localctx = new Feature_zoneContext(this, this._ctx, this.state);
    this.enterRule(localctx, 20, StormParser.RULE_feature_zone);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 205;
        this.match(StormParser.FEATURES);
        this.state = 207; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 206;
            this.match(StormParser.WS);
            this.state = 209; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===StormParser.WS);
        this.state = 211;
        this.match(StormParser.OPEN);
        this.state = 215;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,28,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 212;
                this.match(StormParser.NEWLINE); 
            }
            this.state = 217;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,28,this._ctx);
        }

        this.state = 221;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,29,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 218;
                this.feature_block(); 
            }
            this.state = 223;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,29,this._ctx);
        }

        this.state = 227;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===StormParser.NEWLINE) {
            this.state = 224;
            this.match(StormParser.NEWLINE);
            this.state = 229;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 230;
        this.match(StormParser.CLOSE);
        this.state = 234;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,31,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 231;
                this.match(StormParser.NEWLINE); 
            }
            this.state = 236;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,31,this._ctx);
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function Feature_blockContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = StormParser.RULE_feature_block;
    return this;
}

Feature_blockContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Feature_blockContext.prototype.constructor = Feature_blockContext;

Feature_blockContext.prototype.feature_name = function() {
    return this.getTypedRuleContext(Feature_nameContext,0);
};

Feature_blockContext.prototype.ARROW = function() {
    return this.getToken(StormParser.ARROW, 0);
};

Feature_blockContext.prototype.description = function() {
    return this.getTypedRuleContext(DescriptionContext,0);
};

Feature_blockContext.prototype.NEWLINE = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(StormParser.NEWLINE);
    } else {
        return this.getToken(StormParser.NEWLINE, i);
    }
};


Feature_blockContext.prototype.WS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(StormParser.WS);
    } else {
        return this.getToken(StormParser.WS, i);
    }
};


Feature_blockContext.prototype.enterRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.enterFeature_block(this);
	}
};

Feature_blockContext.prototype.exitRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.exitFeature_block(this);
	}
};




StormParser.Feature_blockContext = Feature_blockContext;

StormParser.prototype.feature_block = function() {

    var localctx = new Feature_blockContext(this, this._ctx, this.state);
    this.enterRule(localctx, 22, StormParser.RULE_feature_block);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 237;
        this.feature_name();
        this.state = 239; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 238;
            _la = this._input.LA(1);
            if(!(_la===StormParser.NEWLINE || _la===StormParser.WS)) {
            this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
            this.state = 241; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===StormParser.NEWLINE || _la===StormParser.WS);
        this.state = 243;
        this.match(StormParser.ARROW);
        this.state = 245; 
        this._errHandler.sync(this);
        var _alt = 1;
        do {
        	switch (_alt) {
        	case 1:
        		this.state = 244;
        		_la = this._input.LA(1);
        		if(!(_la===StormParser.NEWLINE || _la===StormParser.WS)) {
        		this._errHandler.recoverInline(this);
        		}
        		else {
        			this._errHandler.reportMatch(this);
        		    this.consume();
        		}
        		break;
        	default:
        		throw new antlr4.error.NoViableAltException(this);
        	}
        	this.state = 247; 
        	this._errHandler.sync(this);
        	_alt = this._interp.adaptivePredict(this._input,33, this._ctx);
        } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
        this.state = 249;
        this.description();
        this.state = 253;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,34,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 250;
                this.match(StormParser.NEWLINE); 
            }
            this.state = 255;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,34,this._ctx);
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function Feature_nameContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = StormParser.RULE_feature_name;
    return this;
}

Feature_nameContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Feature_nameContext.prototype.constructor = Feature_nameContext;

Feature_nameContext.prototype.NEWLINE = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(StormParser.NEWLINE);
    } else {
        return this.getToken(StormParser.NEWLINE, i);
    }
};


Feature_nameContext.prototype.OPEN = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(StormParser.OPEN);
    } else {
        return this.getToken(StormParser.OPEN, i);
    }
};


Feature_nameContext.prototype.CLOSE = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(StormParser.CLOSE);
    } else {
        return this.getToken(StormParser.CLOSE, i);
    }
};


Feature_nameContext.prototype.enterRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.enterFeature_name(this);
	}
};

Feature_nameContext.prototype.exitRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.exitFeature_name(this);
	}
};




StormParser.Feature_nameContext = Feature_nameContext;

StormParser.prototype.feature_name = function() {

    var localctx = new Feature_nameContext(this, this._ctx, this.state);
    this.enterRule(localctx, 24, StormParser.RULE_feature_name);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 257; 
        this._errHandler.sync(this);
        var _alt = 1+1;
        do {
        	switch (_alt) {
        	case 1+1:
        		this.state = 256;
        		this.matchWildcard();
        		break;
        	default:
        		throw new antlr4.error.NoViableAltException(this);
        	}
        	this.state = 259; 
        	this._errHandler.sync(this);
        	_alt = this._interp.adaptivePredict(this._input,35, this._ctx);
        } while ( _alt!=1 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
        this.state = 264;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,36,this._ctx)
        while(_alt!=1 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1+1) {
                this.state = 261;
                _la = this._input.LA(1);
                if(_la<=0 || (((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << StormParser.OPEN) | (1 << StormParser.CLOSE) | (1 << StormParser.NEWLINE))) !== 0)) {
                this._errHandler.recoverInline(this);
                }
                else {
                	this._errHandler.reportMatch(this);
                    this.consume();
                } 
            }
            this.state = 266;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,36,this._ctx);
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function To_hitContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = StormParser.RULE_to_hit;
    return this;
}

To_hitContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
To_hitContext.prototype.constructor = To_hitContext;

To_hitContext.prototype.MODIFIER_OP = function() {
    return this.getToken(StormParser.MODIFIER_OP, 0);
};

To_hitContext.prototype.NUMBER = function() {
    return this.getToken(StormParser.NUMBER, 0);
};

To_hitContext.prototype.TO_HIT = function() {
    return this.getToken(StormParser.TO_HIT, 0);
};

To_hitContext.prototype.WS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(StormParser.WS);
    } else {
        return this.getToken(StormParser.WS, i);
    }
};


To_hitContext.prototype.enterRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.enterTo_hit(this);
	}
};

To_hitContext.prototype.exitRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.exitTo_hit(this);
	}
};




StormParser.To_hitContext = To_hitContext;

StormParser.prototype.to_hit = function() {

    var localctx = new To_hitContext(this, this._ctx, this.state);
    this.enterRule(localctx, 26, StormParser.RULE_to_hit);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 267;
        this.match(StormParser.MODIFIER_OP);
        this.state = 268;
        this.match(StormParser.NUMBER);
        this.state = 270; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 269;
            this.match(StormParser.WS);
            this.state = 272; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===StormParser.WS);
        this.state = 274;
        this.match(StormParser.TO_HIT);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ReachContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = StormParser.RULE_reach;
    return this;
}

ReachContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ReachContext.prototype.constructor = ReachContext;

ReachContext.prototype.REACH = function() {
    return this.getToken(StormParser.REACH, 0);
};

ReachContext.prototype.NUMBER = function() {
    return this.getToken(StormParser.NUMBER, 0);
};

ReachContext.prototype.WS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(StormParser.WS);
    } else {
        return this.getToken(StormParser.WS, i);
    }
};


ReachContext.prototype.enterRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.enterReach(this);
	}
};

ReachContext.prototype.exitRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.exitReach(this);
	}
};




StormParser.ReachContext = ReachContext;

StormParser.prototype.reach = function() {

    var localctx = new ReachContext(this, this._ctx, this.state);
    this.enterRule(localctx, 28, StormParser.RULE_reach);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 276;
        this.match(StormParser.REACH);
        this.state = 278; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 277;
            this.match(StormParser.WS);
            this.state = 280; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===StormParser.WS);
        this.state = 282;
        this.match(StormParser.NUMBER);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function RangeContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = StormParser.RULE_range;
    return this;
}

RangeContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
RangeContext.prototype.constructor = RangeContext;

RangeContext.prototype.RANGE = function() {
    return this.getToken(StormParser.RANGE, 0);
};

RangeContext.prototype.NUMBER = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(StormParser.NUMBER);
    } else {
        return this.getToken(StormParser.NUMBER, i);
    }
};


RangeContext.prototype.SLASH = function() {
    return this.getToken(StormParser.SLASH, 0);
};

RangeContext.prototype.WS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(StormParser.WS);
    } else {
        return this.getToken(StormParser.WS, i);
    }
};


RangeContext.prototype.enterRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.enterRange(this);
	}
};

RangeContext.prototype.exitRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.exitRange(this);
	}
};




StormParser.RangeContext = RangeContext;

StormParser.prototype.range = function() {

    var localctx = new RangeContext(this, this._ctx, this.state);
    this.enterRule(localctx, 30, StormParser.RULE_range);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 284;
        this.match(StormParser.RANGE);
        this.state = 286; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 285;
            this.match(StormParser.WS);
            this.state = 288; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===StormParser.WS);
        this.state = 290;
        this.match(StormParser.NUMBER);
        this.state = 291;
        this.match(StormParser.SLASH);
        this.state = 292;
        this.match(StormParser.NUMBER);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function HitContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = StormParser.RULE_hit;
    return this;
}

HitContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HitContext.prototype.constructor = HitContext;

HitContext.prototype.HIT = function() {
    return this.getToken(StormParser.HIT, 0);
};

HitContext.prototype.dice = function() {
    return this.getTypedRuleContext(DiceContext,0);
};

HitContext.prototype.DAMAGE_TYPE = function() {
    return this.getToken(StormParser.DAMAGE_TYPE, 0);
};

HitContext.prototype.WS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(StormParser.WS);
    } else {
        return this.getToken(StormParser.WS, i);
    }
};


HitContext.prototype.enterRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.enterHit(this);
	}
};

HitContext.prototype.exitRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.exitHit(this);
	}
};




StormParser.HitContext = HitContext;

StormParser.prototype.hit = function() {

    var localctx = new HitContext(this, this._ctx, this.state);
    this.enterRule(localctx, 32, StormParser.RULE_hit);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 294;
        this.match(StormParser.HIT);
        this.state = 296; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 295;
            this.match(StormParser.WS);
            this.state = 298; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===StormParser.WS);
        this.state = 300;
        this.dice();
        this.state = 302; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 301;
            this.match(StormParser.WS);
            this.state = 304; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===StormParser.WS);
        this.state = 306;
        this.match(StormParser.DAMAGE_TYPE);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function DiceContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = StormParser.RULE_dice;
    return this;
}

DiceContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
DiceContext.prototype.constructor = DiceContext;

DiceContext.prototype.NUMBER = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(StormParser.NUMBER);
    } else {
        return this.getToken(StormParser.NUMBER, i);
    }
};


DiceContext.prototype.D = function() {
    return this.getToken(StormParser.D, 0);
};

DiceContext.prototype.modifier = function() {
    return this.getTypedRuleContext(ModifierContext,0);
};

DiceContext.prototype.WS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(StormParser.WS);
    } else {
        return this.getToken(StormParser.WS, i);
    }
};


DiceContext.prototype.enterRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.enterDice(this);
	}
};

DiceContext.prototype.exitRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.exitDice(this);
	}
};




StormParser.DiceContext = DiceContext;

StormParser.prototype.dice = function() {

    var localctx = new DiceContext(this, this._ctx, this.state);
    this.enterRule(localctx, 34, StormParser.RULE_dice);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 308;
        this.match(StormParser.NUMBER);
        this.state = 309;
        this.match(StormParser.D);
        this.state = 310;
        this.match(StormParser.NUMBER);
        this.state = 318;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,43,this._ctx);
        if(la_===1) {
            this.state = 314;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===StormParser.WS) {
                this.state = 311;
                this.match(StormParser.WS);
                this.state = 316;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 317;
            this.modifier();

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ModifierContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = StormParser.RULE_modifier;
    return this;
}

ModifierContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ModifierContext.prototype.constructor = ModifierContext;

ModifierContext.prototype.MODIFIER_OP = function() {
    return this.getToken(StormParser.MODIFIER_OP, 0);
};

ModifierContext.prototype.NUMBER = function() {
    return this.getToken(StormParser.NUMBER, 0);
};

ModifierContext.prototype.WS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(StormParser.WS);
    } else {
        return this.getToken(StormParser.WS, i);
    }
};


ModifierContext.prototype.enterRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.enterModifier(this);
	}
};

ModifierContext.prototype.exitRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.exitModifier(this);
	}
};




StormParser.ModifierContext = ModifierContext;

StormParser.prototype.modifier = function() {

    var localctx = new ModifierContext(this, this._ctx, this.state);
    this.enterRule(localctx, 36, StormParser.RULE_modifier);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 320;
        this.match(StormParser.MODIFIER_OP);
        this.state = 324;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===StormParser.WS) {
            this.state = 321;
            this.match(StormParser.WS);
            this.state = 326;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 327;
        this.match(StormParser.NUMBER);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function DescriptionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = StormParser.RULE_description;
    return this;
}

DescriptionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
DescriptionContext.prototype.constructor = DescriptionContext;

DescriptionContext.prototype.OPEN = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(StormParser.OPEN);
    } else {
        return this.getToken(StormParser.OPEN, i);
    }
};


DescriptionContext.prototype.CLOSE = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(StormParser.CLOSE);
    } else {
        return this.getToken(StormParser.CLOSE, i);
    }
};


DescriptionContext.prototype.WS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(StormParser.WS);
    } else {
        return this.getToken(StormParser.WS, i);
    }
};


DescriptionContext.prototype.enterRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.enterDescription(this);
	}
};

DescriptionContext.prototype.exitRule = function(listener) {
    if(listener instanceof StormListener ) {
        listener.exitDescription(this);
	}
};




StormParser.DescriptionContext = DescriptionContext;

StormParser.prototype.description = function() {

    var localctx = new DescriptionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 38, StormParser.RULE_description);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 332;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===StormParser.WS) {
            this.state = 329;
            this.match(StormParser.WS);
            this.state = 334;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 335;
        this.match(StormParser.OPEN);
        this.state = 339;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,46,this._ctx)
        while(_alt!=1 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1+1) {
                this.state = 336;
                this.matchWildcard(); 
            }
            this.state = 341;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,46,this._ctx);
        }

        this.state = 345;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,47,this._ctx)
        while(_alt!=1 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1+1) {
                this.state = 342;
                _la = this._input.LA(1);
                if(_la<=0 || _la===StormParser.OPEN || _la===StormParser.CLOSE) {
                this._errHandler.recoverInline(this);
                }
                else {
                	this._errHandler.reportMatch(this);
                    this.consume();
                } 
            }
            this.state = 347;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,47,this._ctx);
        }

        this.state = 348;
        this.match(StormParser.CLOSE);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


exports.StormParser = StormParser;
