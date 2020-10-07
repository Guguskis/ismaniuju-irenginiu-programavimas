import { useEffect, useState } from "react";

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const useNumberGenerator = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [generatedNumber, setGeneratedNumber] = useState<number>(0);

    const [lowerBound, setLowerBound] = useState<number>(0);
    const [upperBound, setUpperBound] = useState<number>(0);

    function start(lowerBound: number, upperBound: number) {

        if (isUpdating) return;

        setLowerBound(lowerBound);
        setUpperBound(upperBound);
        setIsUpdating(true);
    }

    const startLoop = async () => {
        while (isUpdating) {
            // between 0 and 1
            let number = Math.random();
            // between 0 and bound difference
            number *= upperBound - lowerBound;
            // between lowerbound and upperBound
            number += lowerBound;
            setGeneratedNumber(Math.round(number));

            await sleep(500);
            console.log(`State ${isUpdating}`);

        }
    }

    function stop() {
        setIsUpdating(false);
    }

    useEffect(() => {

        if (isUpdating) {
            startLoop();
        }

    }, [isUpdating])

    return [generatedNumber, start, stop] as const;
}

export default useNumberGenerator;