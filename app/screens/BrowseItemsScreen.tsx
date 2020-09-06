import React from "react";
import { View, StyleSheet, Image, SafeAreaView, Text } from "react-native";


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
        backgroundColor: "black",
        flex: 1 // Make sure it fills entire screen
    },
    previousButton: {
        position: "absolute",
        backgroundColor: "orange",
        width: 50,
        height: 50,
        top: 30,
        left: 20
    },
    nextButton: {
        position: "absolute",
        backgroundColor: "cyan",
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