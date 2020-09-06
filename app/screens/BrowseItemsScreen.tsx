import React from "react";
import { View, StyleSheet, Image, SafeAreaView, Text } from "react-native";
import colors from "../config/colors";

function BrowseItemsScreen() {
    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.previousButton} />
            <View style={styles.nextButton} />
            <Image
                style={styles.image}
                source={require("../assets/images/chair.jpg")}
                resizeMode="contain" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: colors.black,
        flex: 1 // Make sure it fills entire screen
    },
    previousButton: {
        position: "absolute",
        backgroundColor: colors.primary,
        width: 50,
        height: 50,
        top: 30,
        left: 20
    },
    nextButton: {
        position: "absolute",
        backgroundColor: colors.secondary,
        width: 50,
        height: 50,
        top: 30,
        right: 20
    },
    image: {
        width: "100%",
        height: "100%"
    }
})

export default BrowseItemsScreen;