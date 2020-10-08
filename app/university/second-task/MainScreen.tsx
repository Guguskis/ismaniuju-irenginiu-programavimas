import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking, Platform } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import Button from "./Button";



export default function MainScreen() {
    const navigation = useNavigation();
    const route = useRoute();

    const [text, setText] = useState("");

    useEffect(() => {
        const changedText = route.params?.text;
        if (changedText) {
            setText(changedText);
        }
    }, [route.params?.text]);

    const onPressSendSms = async () => {
        const smsText = text ? text : "";
        const divider = Platform.OS === "ios" ? "&" : "?";
        const url = `sms:LTT store dot com${divider}body=${smsText}`;

        Linking.openURL(url);
    }

    return (
        <View style={styles.body}>
            <TextInput
                style={styles.inputField}
                placeholder="Enter here"
                onChangeText={setText}
                value={text} />
            <Button
                style={styles.button}
                onPress={() => navigation.navigate("TextInput", { text: text })}
                text="Change text" />
            <Button
                style={styles.button}
                onPress={() => navigation.navigate("CountWords", { text: text })}
                text="Count words" />
            <Button
                style={styles.button}
                onPress={onPressSendSms}
                text="Send message" />
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 200,
        height: 40,
        backgroundColor: "blue",
        borderRadius: 15,
        fontSize: 20,
        color: "white",
        marginTop: 5,
        marginBottom: 5
    },
    buttonText: {
        fontSize: 20,
        color: "white"
    },
    inputField: {
        height: 40,
        width: "100%",
        borderColor: "black",
        borderWidth: 1,
        fontSize: 30
    },
    body: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

    }
})

