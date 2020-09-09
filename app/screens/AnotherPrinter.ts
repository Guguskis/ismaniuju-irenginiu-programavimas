export class AnotherPrinter {
    constructor(private _amount?: number, private _rate?: number) {
    }

    set amount(value: number) {
        this._amount = value;
    }

    get amount() {
        return this._amount;
    }
}
