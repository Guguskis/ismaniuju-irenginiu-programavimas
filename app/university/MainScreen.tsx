import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import Button from "./Button";



export default function MainScreen() {
    const navigation = useNavigation();
    const route = useRoute();

    const [text, setText] = useState("");

    // Update text field value from another Screen
    useEffect(() => {
        setText(route.params?.text);
    }, [route.params?.text]);

    // Pirmam Activity ivedame teksta CHECK
    // Paspaudziam mygtuka ir isiunciam teksta i antra Acticity CHECK
    // Paspaudziam mygtuka ir naujame Activity parodo zodziu kieki CHECK
    // Teksta issiunciame sms zinute (implicit intent)

    return (
        <View style={styles.body}>
            <TextInput
                style={styles.inputField}
                placeholder="Enter here"
                onChangeText={setText}
                value={text}
            />
            <Button
                style={styles.button}
                onPress={() => navigation.navigate("TextInput", { text: text })}
                text="Change text" />
            <Button
                style={styles.button}
                onPress={() => navigation.navigate("CountWords", { text: text })}
                text="Count words" />
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        width: "50%",
        height: 40,
        backgroundColor: "blue",
        borderRadius: 15,
        fontSize: 20,
        color: "white"
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
        alignItems: "center"
    }
})

