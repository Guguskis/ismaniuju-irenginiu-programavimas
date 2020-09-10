import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TextInputScreen = () => {

    const navigation = useNavigation();
    const [text, setText] = useState("");

    const onPressGoBack = () => {
        navigation.navigate("Main", {
            result: text
        });
    }

    return (
        <View>
            <TextInput
                style={styles.inputField}
                placeholder="Enter here"
                onChangeText={setText}
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