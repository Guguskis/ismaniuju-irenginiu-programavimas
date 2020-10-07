import React from "react";
import { TouchableOpacity, Text, StyleProp, StyleSheet } from "react-native";

interface Props {
    style?: StyleProp<any>,
    onPress?: () => void,
    text?: string
}

const Button = (props: Props,) => {
    return (
        <TouchableOpacity
            style={[styles.button, props.style]}
            onPress={props.onPress}>
            <Text style={[props.style, styles.text]}>
                {props.text}
            </Text>
        </TouchableOpacity >
    );
}

export default Button;


const styles = StyleSheet.create({
    text: {
        flex: 1,
        textAlignVertical: "center",
        textAlign: "center"
    },
    button: {
        width: 200,
        height: 30,
        backgroundColor: "#ccc",
        padding: 1
    },
})