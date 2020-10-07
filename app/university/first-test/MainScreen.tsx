import React from 'react';
import { View, Text } from 'react-native';
import Button from './Button';
import useNumberGenerator from './useNumberGenerator';
import { SafeAreaView } from 'react-native-safe-area-context';


const MainScreen = () => {
    const [number, start, stop] = useNumberGenerator();

    return (
        <SafeAreaView>
            <Button
                text="Start"
                onPress={() => start(-100, 100)} />
            <Button
                text="Stop"
                onPress={() => stop()} />
            <Text>The number {number}</Text>
        </SafeAreaView>
    );
}

export default MainScreen;