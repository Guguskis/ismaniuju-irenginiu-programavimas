import { useEffect, useState } from "react";

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const useNumberGenerator = () => {
    const [isLooping, setIsLooping] = useState(false);
    const [number, setNumber] = useState<number>(0);

    const [lowerBound, setLowerBound] = useState<number>(0);
    const [upperBound, setUpperBound] = useState<number>(0);

    function start(lowerBound: number, upperBound: number) {

        if (isLooping) return;

        setLowerBound(lowerBound);
        setUpperBound(upperBound);
        setIsLooping(true);
    }

    const stop = () => {
        setIsLooping(false);
    }

    const generateNumber = () => {
        // between 0 and 1
        let number = Math.random();
        // between 0 and bound difference
        number *= upperBound - lowerBound;
        // between lowerbound and upperBound
        number += lowerBound;
        setNumber(Math.round(number));
    }

    useEffect(() => {
        if (isLooping) {
            generateNumber();
            const id = setInterval(generateNumber, 500);
            return () => clearInterval(id);
        }
    }, [isLooping])

    return [number, start, stop] as const;
}

export default useNumberGenerator;