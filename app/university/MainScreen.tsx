import React, { useEffect, useState } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';

import Autocomplete from "react-native-autocomplete-input";
import StarRating from "react-native-star-rating";
import DatePicker from "react-native-date-picker";

const MainScreen = () => {
    const [name, setName] = useState("");
    const [faculty, setQuery, facultySuggestions] = useAutocomplete([
        "AI - Aplinkos Inžinerijos fakultetas",
        "AF - Architektūros fakultetas",
        "EF - Elektronikos fakultetas",
        "FMF - Fundamentinių mokslų fakultetas",
        "KI - Kurybinių industrijų fakultetas",
        "MF - Mechanikos fakultetas",
        "SF - Statybos fakultetas",
        "TI - Transporto Inžinerijos fakultetas",
        "VV - Verslo Vadybos fakultetas"
    ]);
    const [rating, setRating] = useState(0);
    const [date, setDate] = useState(new Date());

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
                        data={facultySuggestions}
                        value={faculty}
                        onChangeText={setQuery}
                        keyExtractor={(item) => item.key.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => setQuery(item.value)}>
                                <Text>{item.value}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
            {/* Star rating */}
            <View style={styles.row}>
                <Text style={styles.label}>Rating:</Text>
                <StarRating
                    rating={rating}
                    selectedStar={setRating}
                />
            </View>
            {/* Time picker */}
            {/* <View style={styles.row}>
                <Text style={styles.label}>Time:</Text>
                <DatePicker
                    date={date}
                    onDateChange={setDate} />
            </View> */}
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
        // position: 'absolute',
        right: 0,
        top: 25,
        zIndex: 1,
        height: 100
    }
})

class AutocompleteHelper {

    static filterItems(query: string, items: KeyedItem[]) {
        if (query === "") return [];
        const regex = new RegExp(`${query.trim()}`, 'i'); // i - flag for case insensitive
        const filteredItems = items.filter(item => item.value.search(regex) >= 0);

        const queryMatchesLastItem = AutocompleteHelper.queryMatchesLastItem(query, filteredItems);

        if (queryMatchesLastItem) {
            return [];
        } else {
            return filteredItems;
        }
    }

    static queryMatchesLastItem(query: string, filteredItems: KeyedItem[]) {
        if (filteredItems.length === 1) {
            const trimmedQuery = query.toLowerCase().trim();
            const trimmedValue = filteredItems[0].value.toLowerCase().trim();
            return trimmedQuery === trimmedValue;
        } else {
            return false;
        }
    }
}

function useAutocomplete(items: string[]) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<KeyedItem[]>([]);

    const keyedItems = items.map((item, index) => {
        return { key: index, value: item };
    });

    useEffect(() => {
        setSuggestions(AutocompleteHelper.filterItems(query, keyedItems));
    }, [query])

    return [query, setQuery, suggestions] as const;
}

interface KeyedItem {
    key: number,
    value: string
}