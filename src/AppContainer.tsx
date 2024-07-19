import InsideStackNavigator from '@/navigation/InsideStackNavigator';
import OutsideStackNavigator from '@/navigation/OutsideStackNavigator';
import navigation from '@/utils/navigation';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { createGlobalState } from 'react-use';

export const useGlobalAppContainer = createGlobalState({ firstChangePassword: false, phone: null, password: null, token: null });

const AppContainer = () => {
    const [{ token, firstChangePassword }, setValue] = useGlobalAppContainer();
    console.log(token);

    return (
        <NavigationContainer ref={navigation.navigationRef}>
            <StatusBar translucent={!Boolean(token)} />
            {Boolean(token) && Boolean(firstChangePassword) ? <InsideStackNavigator /> : <OutsideStackNavigator />}
        </NavigationContainer>
    );
};

export default AppContainer;
