import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SideMenu from 'react-native-side-menu-updated';
import DateTimePicker from '@react-native-community/datetimepicker';

import Button from './Button';
import SideMenuContainer from './SideMenuContainer';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

const getTimeDifferenceMessage = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(date.getTime() - now.getTime());
    const diffMinutes = Math.ceil(diffTime / (1000 * 60));
    return `Time difference is ${diffMinutes} minute${diffMinutes == 1 ? "" : "s"}`;
}

const getSymbolCountMessage = (text: string) => {
    return `Text contains ${text.length} symbols`;
}

const MainScreen = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showTimeWheel, setShowTimeWheel] = useState(false);
    const [timeDifferenceMessage, setTimeDifferenceMessage] = useState("You haven't selected time yet");
    const [symbolCountMessage, setSymbolCountMessage] = useState("You haven't selected text yet");
    const [singleLetterMessage, setSingleLetterMessage] = useState("");

    const onItemSelected = (label: string) => {

        if (label.toLowerCase() == "hour difference") {
            setShowTimeWheel(true);
        } else if (label.toLowerCase() == "exit") {
            BackHandler.exitApp();
        }

        setIsMenuOpen(false);
    }

    const onChangeSetDate = (date: Date | undefined) => {
        setShowTimeWheel(false);
        if (date) {
            const message = getTimeDifferenceMessage(date);
            setTimeDifferenceMessage(message);
            Alert.alert(message);
        }
    }

    const startSingleLetterIteration = async (text: string) => {
        function sleep(ms: number) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        for (let i = 0; i < text.length; i++) {
            setSingleLetterMessage(text[i]);
            await sleep(1000);
        }
    }

    const toggleMenu = () => setIsMenuOpen(isOpen => !isOpen);
    const sideMenu = <SideMenuContainer onItemSelected={onItemSelected} />

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <SideMenu
                menu={sideMenu}
                isOpen={isMenuOpen}
                onChange={(isOpen) => setIsMenuOpen(isOpen)}>
                <View style={styles.container}>
                    <Menu>
                        <MenuTrigger >
                            <Text
                                style={styles.text}>
                                {timeDifferenceMessage}
                            </Text>
                        </MenuTrigger>
                        <MenuOptions>
                            <MenuOption text='Count symbols' onSelect={() => setSymbolCountMessage(getSymbolCountMessage(timeDifferenceMessage))} />
                            <MenuOption text="Display each letter" onSelect={() => startSingleLetterIteration(timeDifferenceMessage)} />
                        </MenuOptions>
                    </Menu>
                    <Menu>
                        <MenuTrigger >
                            <Text
                                style={styles.text}>
                                {symbolCountMessage}
                            </Text>
                        </MenuTrigger>
                        <MenuOptions>
                            <MenuOption text='Count symbols' onSelect={() => setSymbolCountMessage(getSymbolCountMessage(symbolCountMessage))} />
                            <MenuOption text="Display each letter" onSelect={() => startSingleLetterIteration(symbolCountMessage)} />
                        </MenuOptions>
                    </Menu>
                    <Text style={styles.text}>{singleLetterMessage}</Text>
                </View>
                <Button
                    style={styles.menuButton}
                    onPress={toggleMenu}
                    text={isMenuOpen ? "<" : ">"} />
            </SideMenu>
            {showTimeWheel &&
                <DateTimePicker
                    value={new Date()}
                    mode="time"
                    is24Hour={true}
                    display="spinner"
                    onChange={(event, date) => onChangeSetDate(date)} />
            }

        </SafeAreaView>
    );
}

export default MainScreen;

const styles = StyleSheet.create({
    menuButton: {
        width: 50,
        height: 50,
        alignContent: "center",
        justifyContent: "center",
        position: "absolute",
        fontSize: 40
    },
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#F5FCFF',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
})