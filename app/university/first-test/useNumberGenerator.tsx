import { useEffect, useState } from "react";

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const useNumberGenerator = () => {
    const [isLooping, setIsLooping] = useState(false);
    const [generatedNumber, setGeneratedNumber] = useState<number>(0);

    const [lowerBound, setLowerBound] = useState<number>(0);
    const [upperBound, setUpperBound] = useState<number>(0);

    function start(lowerBound: number, upperBound: number) {

        if (isLooping) return;

        setLowerBound(lowerBound);
        setUpperBound(upperBound);
        setIsLooping(true);
    }

    const generateNumber = () => {
        // between 0 and 1
        let number = Math.random();
        // between 0 and bound difference
        number *= upperBound - lowerBound;
        // between lowerbound and upperBound
        number += lowerBound;
        setGeneratedNumber(Math.round(number));
    }

    const stop = () => {
        setIsLooping(false);
    }

    useEffect(() => {
        const startLoop = async () => {
            while (isLooping) {
                generateNumber();
                console.log(`inside while ${isLooping}`)
                await sleep(500);
            }
        }

        if (isLooping) {
            startLoop();
        }

        console.log(`end useEffect ${isLooping}`);


    }, [isLooping])

    return [generatedNumber, start, stop, isLooping] as const;
}

export default useNumberGenerator;