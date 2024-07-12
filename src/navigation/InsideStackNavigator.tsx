import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CodeScannerPage from '@/pages/CodeScannerPage';
import { Camera } from 'react-native-vision-camera';
import PermissionsPage from '@/pages/PermissionsPage';
import HomePage from '@/pages/HomePage';

const InsideStack = createNativeStackNavigator();

const InsideStackNavigator = () => {
    const cameraPermission = Camera.getCameraPermissionStatus();

    console.log(`Re-rendering Navigator. Camera: ${cameraPermission} `);

    const showPermissionsPage = cameraPermission !== 'granted';
    return (
        <InsideStack.Navigator initialRouteName={'HomePage'} screenOptions={{ headerShown: false }}>
            <InsideStack.Screen name="CodeScannerPage" component={CodeScannerPage} />
            <InsideStack.Screen name="PermissionsPage" component={PermissionsPage} />
            <InsideStack.Screen name="HomePage" component={HomePage} />
        </InsideStack.Navigator>
    );
};

export default InsideStackNavigator;

const styles = StyleSheet.create({});
