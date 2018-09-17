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

    public computeProposalsIndexWithArrow(currentPosition: number, proposals: string[], direction: ArrowDirection, columnSize: number = 4): number {
        if (proposals.length > 0) {
            switch (direction) {
                case ArrowDirection.Left:
                    return Math.max(currentPosition - 1, 0);
                case ArrowDirection.Right:
                    return Math.min(currentPosition + 1, proposals.length - 1);
                case ArrowDirection.Up:
                    return currentPosition - columnSize >= 0 ? Math.max(currentPosition - columnSize, 0) : currentPosition;
                case ArrowDirection.Down:
                    return currentPosition + columnSize <= proposals.length - 1 ? Math.min(currentPosition + columnSize, proposals.length - 1) : currentPosition;
            }
        }
        return 0;

    }
}