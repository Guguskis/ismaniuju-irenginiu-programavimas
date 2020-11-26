import * as Notifications from 'expo-notifications';
import { addBatteryLevelListener, Subscription } from 'expo-battery';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAxios from 'axios-hooks';
import Button from './Button';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    })
});

const MainScreen = () => {
    let oldMd5 = "asdasd";

    const [{ data: getData }, executeGet] = useAxios("http://md5.jsontest.com/?text=example_text");
    const [expired, setExpired] = useState(false);

    useEffect(() => {
        if (getData) {

            let dataExpired = oldMd5 !== getData.md5;
            setExpired(dataExpired);
        }
    }, [getData]);



    useEffect(() => {
        if (expired) {
            Notifications.scheduleNotificationAsync({
                content: {
                    title: "Your data has expired",
                    body: "Update data",
                },
                trigger: null,
            });
        }
    }, [expired])

    return (
        <SafeAreaView style={styles.body}>
            {expired ?
                <View>
                    <Text style={styles.text}>Expired</Text>
                    <Button
                        text="Update data"
                        style={styles.button}
                    />
                </View>
                :
                null}
        </SafeAreaView>
    );
}

export default MainScreen;

const styles = StyleSheet.create({
    body: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 1

    },
    button: {
        backgroundColor: '#336',
        color: 'white',
        padding: 2,
        fontSize: 30
    },
    text: {
        fontSize: 30
    }
})