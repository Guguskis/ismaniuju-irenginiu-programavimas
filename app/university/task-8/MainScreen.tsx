import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MainScreen = () => {



    return (
        <SafeAreaView style={styles.body}>
            <Text>Subscribe to battery level</Text>
        </SafeAreaView>
    );
}

export default MainScreen;

const styles = StyleSheet.create({
    body: {
        flexDirection: "row",
        top: 50
    }
})