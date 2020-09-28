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

const MainScreen = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showTimeWheel, setShowTimeWheel] = useState(false);
    const [timeDifferenceMessage, setTimeDifferenceMessage] = useState("You haven't selected time yet");

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
                            <MenuOption onSelect={() => alert(`Save`)} text='Save' />
                            <MenuOption onSelect={() => alert(`Delete`)} >
                                <Text style={{ color: 'red' }}>Delete</Text>
                            </MenuOption>
                            <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
                        </MenuOptions>
                    </Menu>
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