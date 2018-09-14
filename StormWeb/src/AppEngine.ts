import {ArrowDirection} from "./ArrowDirection";

export class AppEngine {
    constructor() {
    }

    public computeHistoryPosition(history: string[], currentPosition: number, direction: ArrowDirection): number {

        if (direction == ArrowDirection.Up && currentPosition < history.length) {
            return currentPosition + 1;
        } else if (direction == ArrowDirection.Down && currentPosition > 0) {
            return currentPosition - 1;
        }
        return currentPosition;
    }
}