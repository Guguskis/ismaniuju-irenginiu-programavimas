import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const TextInputScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [text, setText] = useState(route.params?.text);

    const onPressGoBack = () => {
        navigation.navigate("Main", {
            text: text
        });
    }

    return (
        <View>
            <TextInput
                style={styles.inputField}
                placeholder="Enter here"
                onChangeText={setText}
                value={text}
            />
            <Button title="Done"
                onPress={onPressGoBack}
            />
        </View>
    );
}

export default TextInputScreen;

const styles = StyleSheet.create({
    inputField: {
        height: 80,
        borderColor: "black",
        borderWidth: 1,
        fontSize: 30
    }
})