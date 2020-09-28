import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SideMenu from 'react-native-side-menu-updated';
import DateTimePicker from '@react-native-community/datetimepicker';

import Button from './Button';
import Menu from './Menu';

const MainScreen = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showTimeWheel, setShowTimeWheel] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const onItemSelected = (label: string) => {

        if (label.toLowerCase() == "hour difference") {
            setShowTimeWheel(true);
        } else if (label.toLowerCase() == "exit") {
            BackHandler.exitApp();
        }

        setIsMenuOpen(false);
    }

    const getTimeDifferenceMessage = (date: Date) => {
        if (date) {
            const now = new Date();
            const diffTime = Math.abs(date.getTime() - now.getTime());
            const diffMinutes = Math.ceil(diffTime / (1000 * 60));
            return `Time difference is ${diffMinutes} minute${diffMinutes > 0 ? "s" : ""}`;
        } else {
            return "You haven't selected time yet"
        }
    }

    const onChangeSetDate = (date: Date | undefined) => {
        setShowTimeWheel(false);
        if (date) {
            setSelectedDate(date);
            Alert.alert(getTimeDifferenceMessage(date));
        }
    }

    const toggleMenu = () => setIsMenuOpen(isOpen => !isOpen);
    const menu = <Menu onItemSelected={onItemSelected} />

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <SideMenu
                menu={menu}
                isOpen={isMenuOpen}
                onChange={(isOpen) => setIsMenuOpen(isOpen)}>
                <View style={styles.container}>
                    <Text
                        style={styles.text}>
                        {getTimeDifferenceMessage(selectedDate)}
                    </Text>
                </View>
                <Button
                    style={styles.menuButton}
                    onPress={toggleMenu}
                    text={isMenuOpen ? "<" : ">"} />
            </SideMenu>
            {showTimeWheel &&
                <DateTimePicker
                    value={selectedDate}
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