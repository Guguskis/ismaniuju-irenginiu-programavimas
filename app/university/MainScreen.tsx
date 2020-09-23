import { useBackHandler } from '@react-native-community/hooks';
import React from 'react';
import { StyleSheet, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from './Button';
import FragmentLetterA from './FragmentLetterA';
import FragmentTextStatistics from './FragmentTextStatistics';
import useStack from './useStack';

interface Item {
    text: string,
    id: string
}

const MainScreen = () => {

    const data = [
        { text: "One is enough", id: "1" },
        { text: "Two is no more", id: "2" },
        { text: "LTT store dot com", id: "3" },
        { text: "No text with letter ei", id: "4" },
        { text: "One more", id: "5" },
        { text: "ASDADSDASD", id: "6" }
    ];

    const [selectedItemId, setSelectedItemId, popStack] = useStack();
    useBackHandler(() => {
        popStack();
        return true;
    });

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

    const getFragment = () => {
        if (selectedItemId) {
            const selectedItem = data.filter(item => item.id === selectedItemId)[0];
            const text = selectedItem.text;
            const letterACount = text.match(/a|A/g)?.length;

            if (letterACount || letterACount === 0) {
                return (
                    <FragmentLetterA
                        getText={() => text} />
                );
            } else {
                return (
                    <FragmentTextStatistics
                        getText={() => text} />
                );
            }
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text>{selectedItemId}</Text>
            <FlatList
                style={styles.container}
                contentContainerStyle={styles.containerItems}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id} />
            {getFragment()}
        </SafeAreaView>
    );
}

export default MainScreen;

const styles = StyleSheet.create({
    container: {
        display: "flex"
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