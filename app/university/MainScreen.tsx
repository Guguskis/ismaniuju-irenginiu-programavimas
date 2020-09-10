import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";



export default function MainScreen() {
    const navigation = useNavigation();
    const route = useRoute();

    // Pirmam Activity ivedame teksta
    // Paspaudziam mygtuka ir isiunciam teksta i antra Acticity
    // Paspaudziam mygtuka ir naujame Activity parodo zodziu kieki
    // Teksta issiunciame sms zinute (implicit intent)

    return (
        <View>
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("TextInput")}
                >
                    <Text style={styles.buttonText}>Change text</Text>
                </TouchableOpacity>
                <Text
                    style={styles.text}>
                    {route.params?.result}
                </Text>
            </View>
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("CountWords")}
                >
                    <Text style={styles.buttonText}>Count words</Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.wordCountTextField}
                    placeholder="Enter here"
                >
                </TextInput>
            </View>
        </View>
    );
}

const getWordCount = (text: string) => {
    return text.replace(/\W+/, " ").split(" ").length;
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        paddingRight: 15
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    button: {
        width: "50%",
        height: 40,
        backgroundColor: "blue",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        fontSize: 20,
        color: "white"
    },
    wordCountTextField: {
        height: 40,
        width: 150,
        borderColor: "black",
        borderWidth: 1,
        fontSize: 30
    }
})

