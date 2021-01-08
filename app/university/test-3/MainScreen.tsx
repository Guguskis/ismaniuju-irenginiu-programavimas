import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAxios from 'axios-hooks';
import Button from './Button';

const MainScreen = () => {

    return (
        <SafeAreaView style={styles.body}>
            <View>
                <Text style={styles.text}>{`Data is expired: ${true}`}</Text>
            </View>

            <Button
                text="Clear storage"
                style={styles.button} />
        </SafeAreaView>
    );
}

export default MainScreen;

const styles = StyleSheet.create({
    body: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flex: 1

    },
    button: {
        backgroundColor: '#336',
        color: 'white',
        padding: 2,
        fontSize: 30,
        width: 200,
        marginBottom: 10
    },
    text: {
        fontSize: 15
    }
})