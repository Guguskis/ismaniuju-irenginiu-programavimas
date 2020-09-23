import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LearningScreen from '../screens/LearningScreen';
import TabOneScreen from '../screens/TabOneScreen';

import Button from './Button';

interface Item {
    text: string,
    id: string
}

const ItemComponent = () => (
    <Button
        style={styles.button}
        text="Hello" />
)

const MainScreen = () => {

    const data = [
        { text: "One is enough", id: "1" },
        { text: "Two is no more", id: "2" },
        { text: "LTT store dot com", id: "3" },
        { text: "No text with letter ei", id: "4" },
        { text: "One more", id: "5" },
        { text: "ASDADSDASD", id: "6" }
    ];

    const [selectedItemId, setSelectedItemId] = useState<String>();

    const displayFragment = () => {
        if (selectedItemId) {
            return true;
        }
        return false;
    }

    const getTextStatistics = () => {
        const selectedItem = data.find((item) => item.id === selectedItemId);

        if (selectedItem) {
            const text = selectedItem.text;
            let message = "";

            const letterACount = text.match(/a|A/g)?.length;

            if (letterACount && letterACount != 0) {
                message += `There are ${letterACount} of letter A`;
            } else {
                const textLength = text.length;
                const vowelCount = text.match(/a|e|o|i|u/ig)?.length;
                let lowerCaseCount = text.match(/[a-z]/g)?.length;
                let upperCaseCount = text.match(/[A-Z]/g)?.length;

                if (!lowerCaseCount) lowerCaseCount = 0;
                if (!upperCaseCount) upperCaseCount = 0;

                message += `Text length ${textLength}\n`;
                message += `Vowel count ${vowelCount}\n`;
                message += `Letter count by case: lower ${lowerCaseCount} and upper ${upperCaseCount}`;
            }

            return message;
        }

    }

    const renderItem = (data: any) => {
        const item = (data.item as Item);
        const onPressItem = () => {
            // deselect if pressed on same?
            setSelectedItemId(item.id);
        }

        return (
            <Button
                text={item.text}
                style={styles.button}
                onPress={onPressItem} />
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                style={styles.container}
                contentContainerStyle={styles.containerItems}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id} />
            {displayFragment() &&
                <View style={styles.fragment}>
                    <Text style={styles.fragmentTitle}>Text statistics fragment</Text>
                    <Text>{getTextStatistics()}</Text>
                </View>}
        </SafeAreaView>
    );
}

export default MainScreen;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        borderWidth: 1
    },
    containerItems: {
        alignItems: "center",
    },
    button: {
        width: 300,
        height: 40,
        marginBottom: 3,
        backgroundColor: "#ccc",
        borderRadius: 10
    },
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