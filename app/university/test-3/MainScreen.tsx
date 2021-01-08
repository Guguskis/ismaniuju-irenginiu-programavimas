import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Switch, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAxios from 'axios-hooks';
import Button from './Button';

const MainScreen = () => {

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

    return (
        <SafeAreaView style={styles.body}>
            <View style={styles.fragment}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={setText} />
                <Button
                    style={styles.button}
                    text="Bar chart" />
                <Button
                    style={styles.button}
                    text="Line chart" />
                <Button
                    style={styles.button}
                    text="Notification" />
            </View>
            <View style={styles.fragment}>
                <Text>{`${vowels} ${consonants} ${digits}`}</Text>
            </View>


        </SafeAreaView>
    );
}

export default MainScreen;

const styles = StyleSheet.create({
    body: {
        // flexDirection: "column",
        // justifyContent: "center",
        // alignItems: "center",
        flex: 1
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
        borderWidth: 1,
        flex: 1,
        margin: 10,
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: "center",
    }
})