import * as Notifications from 'expo-notifications';
import { addBatteryLevelListener, Subscription } from 'expo-battery';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAxios from 'axios-hooks';
import Button from './Button';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
// import AsyncStorage from '@react-native-community/async-storage';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    })
});

const MainScreen = () => {

    const storage = new Storage({
        storageBackend: AsyncStorage,
        sync: () => {
            console.log("data not found. defaulting");
        }
    });

    const [{ data: getData }, executeGet] = useAxios("http://md5.jsontest.com/?text=example_text");
    const [expired, setExpired] = useState(false);
    const [md5, setMd5] = useState("");
    const [storageMd5, setStorageMd5] = useState("");

    // load once on start
    useEffect(() => {
        storage.load({
            key: "md5",
            autoSync: true
        }).then(data => {
            setStorageMd5(data);
            console.log(`Data found ${data}.`)
        }).catch(err => {
            console.log(`Failed to load. Data not found`);
        });

    }, []);


    const onPressUpdateStorage = () => {
        setMd5(getData.md5); // nezianu ar reikia abu
        setStorageMd5(getData.md5);
        storage.save({
            key: "md5",
            data: md5,
            expires: 1000 * 3600
        })
    }

    useEffect(() => {
        if (getData) {
            setMd5(getData.md5);
        }
    }, [getData]);

    useEffect(() => {
        let dataExpired = storageMd5 !== md5;
        setExpired(dataExpired);
    }, [md5])

    useEffect(() => {
        if (expired) {
            console.log("notification");

            Notifications.scheduleNotificationAsync({
                content: {
                    title: "Your data has expired",
                    body: "Update data",
                },
                trigger: null,
            });
        }
    }, [expired]);

    const onPressClearStorage = () => {
        storage.remove({
            key: "md5"
        })
    }

    return (
        <SafeAreaView style={styles.body}>
            <Text style={styles.text}>{`Data is expired: ${expired}`}</Text>
            <Text style={styles.text}>{`Md5: ${md5}`}</Text>
            <Text style={styles.text}>{`LocalMd5: ${storageMd5}`}</Text>
            {expired ?
                <View>

                    <Button
                        text="Update data"
                        style={styles.button}
                        onPress={onPressUpdateStorage} />

                </View>
                :
                null}
            <Button
                text="Clear storage"
                style={styles.button}
                onPress={onPressClearStorage} />
        </SafeAreaView>
    );
}

export default MainScreen;

const styles = StyleSheet.create({
    body: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flex: 1

    },
    button: {
        backgroundColor: '#336',
        color: 'white',
        padding: 2,
        fontSize: 30,
        width: 200,
        marginBottom: 10
    },
    text: {
        fontSize: 10
    }
})