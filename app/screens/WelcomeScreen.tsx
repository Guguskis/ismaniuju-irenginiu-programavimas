import React from 'react';
import { StyleSheet, View, Image, ImageBackground, Text } from 'react-native';

function WelcomeScreen() {
    return (
        <ImageBackground style={styles.background} source={require("../assets/images/background.jpg")} >
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../assets/images/logo-red.png")} />
                <Text>Sell What You Don't Need</Text>
            </View>
            <View style={styles.loginButton}></View>
            <View style={styles.registerButton}></View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "flex-end",
        width: '100%',
        height: '100%'
    },
    logoContainer: {
        position: "absolute",
        alignItems: "center",
        top: 70
    },
    logo: {
        width: 100,
        height: 100
    },
    loginButton: {
        width: "100%",
        height: 70,
        backgroundColor: "orange"
    },
    registerButton: {
        width: "100%",
        height: 70,
        backgroundColor: "cyan"
    }
})


export default WelcomeScreen;
