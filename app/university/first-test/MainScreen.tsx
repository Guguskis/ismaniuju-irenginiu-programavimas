import React from 'react';
import { View, Text } from 'react-native';
import Button from './Button';
import useNumberGenerator from './useNumberGenerator';
import { SafeAreaView } from 'react-native-safe-area-context';


const MainScreen = () => {
    const [number, start, stop, isUpdating] = useNumberGenerator();

    return (
        <SafeAreaView>
            <Button
                text="Start"
                onPress={() => start(-100, 100)} />
            <Button
                text="Stop"
                onPress={() => stop()} />
            <Text>The number {number}</Text>
            <Text>Is updating {isUpdating ? "yes" : "no"}</Text>
        </SafeAreaView>
    );
}

export default MainScreen;