import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from './Button';

const MainScreen = () => {

    return (
        <SafeAreaView>
            <View>
                <Text>I'm safe</Text>
            </View>
        </SafeAreaView>
    );
}

export default MainScreen;

const styles = StyleSheet.create({

})