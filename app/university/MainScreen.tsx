import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

    // Android fragment
    const data = [
        { text: "One is enough", id: "1" },
        { text: "Two is no more", id: "2" },
        { text: "Three is perfectly balanced", id: "3" }
    ];

    const [selectedItemId, setSelectedItemId] = useState("1");

    const renderItem = ({ item }) => {
        return (
            <Button
                text={item.text}
                style={styles.button} />
        );
    }

    return (
        <SafeAreaView>
            <FlatList
                style={styles.fragmentContainer}
                contentContainerStyle={styles.fragmentContainerItems}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id} />
        </SafeAreaView>
    );
}

export default MainScreen;

const styles = StyleSheet.create({
    fragmentContainer: {
        display: "flex",
        borderWidth: 1
    },
    fragmentContainerItems: {
        alignItems: "center",
    },
    button: {
        width: 300,
        height: 40,
        marginBottom: 3,
        backgroundColor: "#ccc",
        borderRadius: 10
    }
})