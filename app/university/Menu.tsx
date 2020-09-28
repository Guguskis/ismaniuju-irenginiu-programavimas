import React from 'react';
import PropTypes from 'prop-types';
import {
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
} from 'react-native';

const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        width: window.width,
        height: window.height,
        backgroundColor: 'gray',
        padding: 20,
    },
    name: {
        position: 'absolute',
        left: 70,
        top: 20,
    },
    item: {
        fontSize: 24,
        fontWeight: '300',
        paddingTop: 5,
    },
});

interface Props {
    onItemSelected: (label: string) => void
}

export default function Menu(props: Props) {
    return (
        <ScrollView scrollsToTop={false} style={styles.menu}>
            <Text
                onPress={() => props.onItemSelected('Hour difference')}
                style={styles.item}>
                Hour difference
            </Text>
            <Text
                onPress={() => props.onItemSelected('Exit')}
                style={styles.item}>
                Exit
      </Text>
        </ScrollView>
    );
}

Menu.propTypes = {
    onItemSelected: PropTypes.func.isRequired,
};