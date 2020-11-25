import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
    getText: () => string;
}

const FragmentTextStatistics = (props: Props) => {
    const text = props.getText();
    const textLength = text.length;
    const vowelCount = text.match(/a|e|o|i|u/ig)?.length;
    let lowerCaseCount = text.match(/[a-z]/g)?.length;
    let upperCaseCount = text.match(/[A-Z]/g)?.length;

    if (!lowerCaseCount) lowerCaseCount = 0;
    if (!upperCaseCount) upperCaseCount = 0;

    let message = "";
    message += `Text length ${textLength}\n`;
    message += `Vowel count ${vowelCount}\n`;
    message += `Letter count by case: lower ${lowerCaseCount} and upper ${upperCaseCount}`;

    return (
        <View style={styles.fragment}>
            <Text style={styles.fragmentTitle}>Text statistics fragment</Text>
            <Text>{message}</Text>
        </View>
    );
}

export default FragmentTextStatistics;

const styles = StyleSheet.create({
    fragment: {
        position: "absolute",
        width: "100%",
        bottom: 0,
        minHeight: 100,
        backgroundColor: "#aaf",
        padding: 5
    },
    fragmentTitle: {
        fontSize: 20,
        fontWeight: "bold"
    }
})