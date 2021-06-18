import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
    createStackNavigator,
    StackNavigationOptions,
    TransitionPresets,
} from "@react-navigation/stack";

import MainNavigation from "./Main.navigation";

function Routes() {
    const Stack = createStackNavigator();

    const TransitionScreenOptions = {
        ...TransitionPresets.SlideFromRightIOS,
    };

    const screenOption: StackNavigationOptions = {
        headerShown: false,
    };

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator screenOptions={TransitionScreenOptions}>
                    <Stack.Screen
                        name="main"
                        component={MainNavigation}
                        options={screenOption}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

export default React.memo(Routes);
