import InsideStackNavigator from '@/navigation/InsideStackNavigator';
import OutsideStackNavigator from '@/navigation/OutsideStackNavigator';
import navigation from '@/utils/navigation';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

const AppContainer = () => {
    return (
        <NavigationContainer ref={navigation.navigationRef}>
            {true ? <InsideStackNavigator /> : <OutsideStackNavigator />}
        </NavigationContainer>
    );
};

export default AppContainer;
