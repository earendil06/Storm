
export default class AutocompleteParameter {
    public readonly callback: () => string[] | Promise<string[]>;
    public readonly entryPoint: RegExp;

    constructor(entryPoint: RegExp, callback: () => string[] | Promise<string[]>){
        this.callback = callback;
        this.entryPoint = entryPoint;
    }
}