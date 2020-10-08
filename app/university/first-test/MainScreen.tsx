import React from 'react';
import { View, Text, Linking } from 'react-native';
import Button from './Button';
import useNumberGenerator from './useNumberGenerator';
import { SafeAreaView } from 'react-native-safe-area-context';


const MainScreen = () => {
    const [number, startGenerator, stopGenerator] = useNumberGenerator();

    const stop = () => {
        stopGenerator();

        const action = "android.intent.action.WEB_SEARCH";
        const extras = [
            { "query": "dddddd" },
            { "flag": "FLAG_ACTIVITY_NEW_TASK" }
        ];

        Linking.sendIntent(action, extras);
    }

    return (
        <SafeAreaView>
            <Button
                text="Start -100 to 0"
                onPress={() => startGenerator(-100, 0)} />
            <Button
                text="Stop"
                onPress={stop} />
            <Button
                text="Start 0 to 100"
                onPress={() => startGenerator(0, 100)} />
            <Button
                text="Stop"
                onPress={stop} />
            <Text>The number {number}</Text>
        </SafeAreaView>
    );
}

export default MainScreen;