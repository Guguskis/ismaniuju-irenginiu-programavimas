import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SideMenu from 'react-native-side-menu-updated';


import Button from './Button';
import Menu from './Menu';

const MainScreen = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const onItemSelected = (label: string) => {
        console.log(label);
    }

    const toggleMenu = () => {
        setIsMenuOpen(isOpen => !isOpen);
    }

    const menu = <Menu onItemSelected={onItemSelected} />

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <SideMenu
                menu={menu}
                isOpen={isMenuOpen}
                onChange={(isOpen) => setIsMenuOpen(isOpen)}>
                <View style={styles.container}>
                    <Text style={styles.welcome}>Hello</Text>
                </View>
                <Button
                    style={styles.menuButton}
                    onPress={toggleMenu}
                    text={isMenuOpen ? "<" : ">"} />
            </SideMenu>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
})