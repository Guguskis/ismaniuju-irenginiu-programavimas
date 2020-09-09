import { AnotherPrinter } from "./AnotherPrinter";

export default function LearningScreen() {
    let number: number = 5;

    let stringValue;
    stringValue = "five";
    let result = (stringValue as string).endsWith("e");

    let printer: MoneyPrinter = new MoneyPrinter(5, 10);
    printer.print();

    let anotherPrinter = new AnotherPrinter(5, 5);
    anotherPrinter.amount = 15;

    return "a";
}

enum Color { Red, Green, Blue };

interface Point {
    x: number,
    y: number
}

let drawPoint = (point: Point) => {
    console.log(point.x);
    console.log(point.y);
}

class MoneyPrinter {
    amount: number; // public
    rate: number;
    private uncleJerome: boolean;

    constructor(amount: number, rate: number, uncleJerome?: boolean) {
        this.amount = amount;
        this.rate = rate;
        this.uncleJerome = uncleJerome; // complains here
    }

    print() {
        console.log(`Printing ${this.amount} every ${this.rate} seconds`)
        if (this.uncleJerome) {
            console.log("Yeeeeeeehawwww!");

        }
    }
}

