import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';

const OutsideStack = createNativeStackNavigator();

const OutsideStackNavigator = () => {
    return (
        <OutsideStack.Navigator initialRouteName={'LoginPage'} screenOptions={{ headerShown: false }}>
            <OutsideStack.Screen name="LoginPage" component={LoginPage} />
            <OutsideStack.Screen name="RegisterPage" component={RegisterPage} />
        </OutsideStack.Navigator>
    );
};

export default OutsideStackNavigator;
