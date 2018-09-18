
export default class AutocompleteParameter {
    public readonly callback: () => Promise<string[]>;
    public readonly entryPoint: RegExp;

    constructor(entryPoint: RegExp, callback: () => Promise<string[]>){
        this.callback = callback;
        this.entryPoint = entryPoint;
    }
}