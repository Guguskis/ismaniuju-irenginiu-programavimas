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
        { id: "1", text: "One is enough" },
        { id: "2", text: "Two is no more" },
        { id: "3", text: "LTT store dot com" },
        { id: "4", text: "No text with letter ei" },
        { id: "5", text: "Thanos did nothing wrong" },
        { id: "6", text: "This has a couple of A letters" },
        { id: "7", text: "Perfectly balanced" },
        { id: "8", text: "Loream ipsuam doloar sita ameat, consecteatur aadipiscing" }
    ];

    const [selectedItemId, setSelectedItemId, popStack] = useStack();
    useBackHandler(() => {
        popStack();
        return true;
    });

    const renderItem = (data: any) => {
        const item = (data.item as Item);
        const onPressItem = () => {
            if (item.id !== selectedItemId) {
                setSelectedItemId(item.id);
            }
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
            const containsSymbolA = text.match(/a|A/g)?.length;

            let fragment;

            const getText = () => text;
            if (containsSymbolA) {
                fragment = <FragmentLetterA getText={getText} />;
            } else {
                fragment = <FragmentTextStatistics getText={getText} />;
            }

            return fragment;
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
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
        borderRadius: 10,
        padding: 1
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