import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Switch, TextInput, processColor, PushNotificationIOS } from 'react-native';
import useAxios from 'axios-hooks';
import Button from './Button';
import { BarChart, Grid, LineChart, YAxis } from 'react-native-svg-charts';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    })
});

const MainScreen = () => {

    const [graphType, setGraphType] = useState("");

    const [text, setText] = useState("");

    const [vowels, setVowels] = useState(0);
    const [consonants, setConsonants] = useState(0);
    const [digits, setDigits] = useState(0);

    const getCount = (regexPattern: string, text: string) => {
        const regex = new RegExp(regexPattern, 'ig')
        const match = text.match(regex);
        if (match) {
            return match.length;
        } else {
            return 0;
        }
    }

    useEffect(() => {
        setVowels(getCount("a|o|e|i|u", text))
        setConsonants(getCount("[b-z^eiou]", text))
        setDigits(getCount("\\d", text))
    }, [text])

    const fill = 'rgb(134, 65, 244)'

    const scheduleNotification = () => {
        Notifications.scheduleNotificationAsync({
            content: {
                title: text,
                body: `vowels=${vowels}  consonants=${consonants}  digits=${digits}`,
            },
            trigger: null,
        });
    }

    return (
        <View style={styles.body}>
            <View style={styles.fragment}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={setText} />
                <Button
                    style={styles.button}
                    text="Bar chart"
                    onPress={() => graphType == "BAR" ? setGraphType("") : setGraphType("BAR")} />
                <Button
                    style={styles.button}
                    text="Line chart"
                    onPress={() => graphType == "LINE" ? setGraphType("") : setGraphType("LINE")} />
                <Button
                    style={styles.button}
                    text="Notification"
                    onPress={scheduleNotification} />
            </View>
            {
                graphType == "BAR" ?
                    <View style={{ height: 400, flexDirection: 'row' }}>
                        <YAxis
                            data={[vowels, consonants, digits]}
                            contentInset={{ top: 30, bottom: 30 }}
                            svg={{
                                fill: 'grey',
                                fontSize: 10,
                            }}
                            numberOfTicks={10}
                            formatLabel={(value) => `${value}`}
                        />
                        <BarChart
                            style={{ flex: 1 }}
                            data={[vowels, consonants, digits]}
                            svg={{ fill }}
                            contentInset={{ top: 30, bottom: 30 }}
                        >
                            <Grid />
                        </BarChart>
                    </View>
                    : null
            }
            {
                graphType == "LINE" ?
                    <View style={{ height: 400, flexDirection: 'row' }}>
                        <YAxis
                            data={[vowels, consonants, digits]}
                            contentInset={{ top: 30, bottom: 30 }}
                            svg={{
                                fill: 'grey',
                                fontSize: 10,
                            }}
                            numberOfTicks={10}
                            formatLabel={(value) => `${value}`}
                        />
                        <LineChart
                            style={{ flex: 1 }}
                            data={[vowels, consonants, digits]}
                            svg={{ stroke: 'rgb(134, 65, 244)' }}
                            contentInset={{ top: 30, bottom: 30 }}
                        >
                            <Grid />
                        </LineChart>
                    </View>

                    :
                    null
            }
        </View>
    );
}

export default MainScreen;

const styles = StyleSheet.create({
    body: {
        height: 650
    },
    button: {
        backgroundColor: '#336',
        color: 'white',
        padding: 2,
        fontSize: 20,
        width: 150,
        margin: 2
    },
    text: {
        fontSize: 15
    },
    textInput: {
        height: 40,
        borderBottomWidth: 1,
        margin: 5,
        width: '100%'
    },
    fragment: {
        // borderWidth: 1,
        flex: 1,
        margin: 10,
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: "center",
    }
})