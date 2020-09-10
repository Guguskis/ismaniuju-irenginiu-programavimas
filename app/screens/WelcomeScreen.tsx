import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, ImageBackground, Text } from 'react-native';
import useAxios from 'axios-hooks'

import colors from "../config/colors"
import { TouchableOpacity } from 'react-native-gesture-handler';

function WelcomeScreen() {
    const [stock, setStock] = useState("");
    const [{ data, loading, error }] = useAxios("http://192.168.43.170:8080/api/stock");

    // setStock(data.code); // infinite loop

    return (
        <ImageBackground style={styles.background} source={require("../assets/images/background.jpg")} >
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../assets/images/logo-red.png")} />
                <Text>Sell What You Don't Need</Text>
            </View>
            <TouchableOpacity>
                <View style={styles.loginButton}></View>
            </TouchableOpacity>
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
        height: '100%',
        paddingBottom: 50
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
        backgroundColor: colors.primary
    },
    registerButton: {
        width: "100%",
        height: 70,
        backgroundColor: colors.secondary
    }
})


export default WelcomeScreen;
