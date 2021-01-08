import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Switch, TextInput, processColor, PushNotificationIOS } from 'react-native';
import useAxios from 'axios-hooks';
import Button from './Button';
import { BarChart, Grid, LineChart } from 'react-native-svg-charts';

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
                    text="Notification" />
            </View>
            {
                graphType == "BAR" ?
                    <BarChart
                        style={{ height: 400 }}
                        data={[vowels, consonants, digits]}
                        svg={{ fill }}
                        contentInset={{ top: 30, bottom: 30 }}
                    >
                        <Grid />
                    </BarChart> : null
            }
            {
                graphType == "LINE" ?
                    <LineChart
                        style={{ height: 400 }}
                        data={[vowels, consonants, digits]}
                        svg={{ stroke: 'rgb(134, 65, 244)' }}
                        contentInset={{ top: 30, bottom: 30 }}
                    >
                        <Grid />
                    </LineChart>
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