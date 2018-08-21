import {ANTLRErrorListener} from "antlr4ts/ANTLRErrorListener";
import {RecognitionException, Token} from "antlr4ts";

export class MyErrorListener implements ANTLRErrorListener<Token> {
    syntaxError<T extends Token>(recognizer: any, offendingSymbol: (T | undefined), line: number, charPositionInLine: number, msg: string, e: (RecognitionException | undefined)) {
        throw new Error("error line :" + line);
    }

}