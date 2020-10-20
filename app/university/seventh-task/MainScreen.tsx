import * as Notifications from 'expo-notifications';
import { addBatteryLevelListener, Subscription } from 'expo-battery';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    })
});

const MainScreen = () => {

    const [subscribe, setSubscribe] = useState(false);
    const [batteryLevel, setBatteryLevel] = useState<Number>(1);
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
        if (batteryLevel < 0.2)
            Notifications.scheduleNotificationAsync({
                content: {
                    title: "Battery is low",
                    body: "Aaaaaargh!",
                },
                trigger: null,
            });
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