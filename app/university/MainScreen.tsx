import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';

import Autocomplete from "react-native-autocomplete-input";





const MainScreen = () => {
    const faculties = ["FMF", "AGAI", "TI"];
    const autocompleteHelper = new AutocompleteHelper(faculties);

    const [name, setName] = useState("");
    const [suggestions, setSuggestions] = useState([""])

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
                        defaultValue={autocompleteHelper.getQuery()}
                        onChangeText={text => {
                            autocompleteHelper.setQuery(text);
                            setSuggestions(autocompleteHelper.getSuggestions());
                        }}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={() => {
                                autocompleteHelper.setQuery(item);
                                setSuggestions(autocompleteHelper.getSuggestions());
                            }}>
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
    private items: Array<string>;
    private query: string;

    constructor(items: Array<string>) {
        this.items = items;
        this.query = "t";
    }

    public setQuery(value: string) {
        this.query = value;
    }

    public getQuery() {
        return this.query;
    }

    public getSuggestions() {
        const filteredItems = this.getFilteredItems(this.query);
        if (filteredItems.length === 1 && this.itemsEqual(this.query, filteredItems[0])) {
            return [];
        } else {
            return filteredItems;
        }
    }

    private getFilteredItems(query: string) {
        if (query === "") return [];
        const regex = new RegExp(`${query.trim()}`, 'i'); // i - flag for case insensitive
        return this.items.filter(item => item.search(regex) >= 0);
    }

    private itemsEqual(a: string, b: string) {
        return a.toLowerCase().trim() === b.toLowerCase().trim();
    }

}
