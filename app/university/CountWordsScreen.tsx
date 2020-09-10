import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const CountWordsScreen = () => {

    const route = useRoute();

    const text = route.params?.text;

    return (
        <>
            <Text style={styles.text}>
                Word count is {getWordCount(text)}
            </Text>
        </>
    );
}
export default CountWordsScreen;

const getWordCount = (text: string) => {
    if (!text) {
        return 0;
    } else {
        return text.replace(/\W+/g, " ").split(" ").length;
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    }
})