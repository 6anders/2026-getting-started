
export class GuessResult {
    readonly isError: boolean = false;
    readonly message: string = "";

    constructor(isError: boolean, message: string) {
        this.isError = isError;
        this.message = message;
        
    }
}