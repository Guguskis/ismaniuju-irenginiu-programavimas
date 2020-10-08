import React, { useRef, useState } from 'react';
import { View, StyleSheet, TextInput, Keyboard } from 'react-native';
// import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

import Button from './Button';

const MainScreen = () => {

    const [uri, setUri] = useState("");
    const [source, setSource] = useState("");
    const webviewRef = useRef<WebView>(null);

    const onPressLoadPage = () => {
        // page is not reloaded if url doesn't change
        if (!uri.startsWith("https://")) {
            setSource("https://" + uri);
        } else {
            setSource(uri);
        }

        Keyboard.dismiss();
    }

    return (
        // flex: 1 is mandatory
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={setUri} />
                <Button
                    style={styles.button}
                    onPress={onPressLoadPage}
                    text="Load" />
            </View>
            <WebView
                ref={webviewRef}
                source={{ uri: source }} />
        </SafeAreaView>
    );
}

export default MainScreen;

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "baseline"
    },
    textInput: {
        borderBottomWidth: 1,
        flexGrow: 6,
        height: 40,
        marginLeft: 10,
        marginRight: 10
    },
    button: {
        width: 80,
        height: 30,
        backgroundColor: "#ccc"
    }
})