import { addBatteryLevelListener, Subscription } from 'expo-battery';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Switch } from 'react-native';
import { Notification, Notifications } from 'react-native-notifications';
import { SafeAreaView } from 'react-native-safe-area-context';


const MainScreen = () => {

    const [subscribe, setSubscribe] = useState(false);
    const [batteryLevel, setBatteryLevel] = useState<Number>();
    const [eventSubscription, setEventSubscription] = useState<Subscription>();


    const onPressToggleBattery = async () => {

        const newSubscribe = !subscribe;
        setSubscribe(newSubscribe);

        if (newSubscribe) {
            const eventSubscription = addBatteryLevelListener(({ batteryLevel }) => {
                setBatteryLevel(batteryLevel);
            });

            setEventSubscription(eventSubscription);
        } else {
            eventSubscription?.remove();
        }
    }

    useEffect(() => {
        console.log(`Battery level is ${batteryLevel}`);
    }, [batteryLevel])

    return (
        <SafeAreaView style={styles.body}>
            <Text>Subscribe to battery level</Text>
            <Switch
                onValueChange={onPressToggleBattery}
                value={subscribe}
            />
        </SafeAreaView>
    );
}

export default MainScreen;

const styles = StyleSheet.create({
    body: {
        flexDirection: "row",
        top: 50
    }
})