import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./MainScreen";
import TextInputScreen from "./TextInputScreen";
import CountWordsScreen from "./CountWordsScreen";

const Stack = createStackNavigator();

const Index = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Main" component={MainScreen} />
                <Stack.Screen name="TextInput" component={TextInputScreen} />
                <Stack.Screen name="CountWords" component={CountWordsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Index;