import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Switch } from 'react-native';
import { Notifications, Notification, Registered } from 'react-native-notifications';
import { SafeAreaView } from 'react-native-safe-area-context';

const MainScreen = () => {
    // Notifications.registerRemoteNotifications();

    // Notifications.events().registerNotificationReceivedForeground((notification: Notification, completion) => {
    //     console.log(`Notification received in foreground: ${notification.title} : ${notification.body}`);
    //     completion({ alert: false, sound: false, badge: false });
    // });

    // Notifications.events().registerNotificationOpened((notification: Notification, completion) => {
    //     console.log(`Notification opened: ${notification.payload}`);
    //     completion();
    // });

    return (
        <SafeAreaView style={styles.body}>
            <Text>Subscribe to battery levelssssss</Text>
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