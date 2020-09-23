import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
    getText: () => string;
}

const FragmentLetterA = (props: Props) => {
    const text = props.getText();
    const letterACount = text.match(/a|A/g)?.length;
    let message = `There are ${letterACount} of letter A`;
    return (
        <View style={styles.fragment}>
            <Text style={styles.fragmentTitle}>Letter A fragment</Text>
            <Text>{message}</Text>
        </View>
    );
}

export default FragmentLetterA;

const styles = StyleSheet.create({
    fragment: {
        position: "absolute",
        width: "100%",
        bottom: 0,
        height: 100,
        backgroundColor: "#aaf",
        padding: 5
    },
    fragmentTitle: {
        fontSize: 20,
        fontWeight: "bold"
    }
})