import React, { useEffect, useState } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';

import Autocomplete from "react-native-autocomplete-input";

const MainScreen = () => {
    const [name, setName] = useState("");
    const [faculty, setQuery, suggestions] = useAutocomplete(["FMF", "AGAI", "TI"]);

    return (
        <View style={{ top: 30 }}>
            {/* Name field */}
            <View style={styles.row}>
                <Text style={styles.label}>Name:</Text>
                <TextInput style={{ borderBottomWidth: 1, minWidth: 200 }}
                    onChangeText={setName} />
            </View>
            {/* Faculty field */}
            <View style={styles.row}>
                <Text style={styles.label}>Faculty:</Text>
                <View style={styles.autocompleteContainer}>
                    <Autocomplete
                        placeholder="Enter faculty"
                        data={suggestions}
                        value={faculty}
                        onChangeText={setQuery}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={() => setQuery(item)}>
                                <Text>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />

                </View>
            </View>
        </View>
    );
}

export default MainScreen;

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        minHeight: 25,
        alignItems: "center",
        marginBottom: 10
    },
    label: {
        width: 100
    },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 25,
        zIndex: 1
    }
})

class AutocompleteHelper {

    static filterItems(query: string, items: string[]) {
        if (query === "") return [];
        const regex = new RegExp(`${query.trim()}`, 'i'); // i - flag for case insensitive
        const filteredItems = items.filter(item => item.search(regex) >= 0);

        const queryMatchesLastItem = AutocompleteHelper.queryMatchesLastItem(query, filteredItems);

        if (queryMatchesLastItem) {
            return [];
        } else {
            return filteredItems;
        }
    }

    static queryMatchesLastItem(query: string, filteredItems: string[]) {
        if (filteredItems.length === 1) {
            return query.toLowerCase().trim() === filteredItems[0].toLowerCase().trim();
        } else {
            return false;
        }
    }
}

function useAutocomplete(items: string[]): [string, (a: string) => void, string[]] {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([""]);

    useEffect(() => {
        setSuggestions(AutocompleteHelper.filterItems(query, items));
    }, [query])

    return [query, setQuery, suggestions];
}