import { useState } from "react";


const useStack = () => {
    const [array, setArray] = useState<Array<String>>([]);

    const push = (element: String) => {
        setArray(array => [...array, element]);
    }

    const pop = () => {
        setArray(array => {
            return [...array.splice(0, array.length - 1)];
        });
    }

    return [array[array.length - 1], push, pop] as const;
}

export default useStack;