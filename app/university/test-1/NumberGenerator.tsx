export class NumberGenerator {
    private isUpdating = false;
    private number = 0;

    private lowerBound = 0;
    private upperBound = 0;

    async sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async start(lowerBound: number, upperBound: number) {

        if (this.isUpdating) return;

        this.isUpdating = true;

        while (this.isUpdating) {
            console.log("START");
            // between 0 and 1
            let number = Math.random();
            // between 0 and bound difference
            number *= upperBound - lowerBound;
            // between lowerbound and upperBound
            number += lowerBound;
            this.number = Math.round(number);

            await this.sleep(500);
        }
    }

    stop() {
        this.isUpdating = false;
    }

    getNumber() {
        return this.number;
    }
}