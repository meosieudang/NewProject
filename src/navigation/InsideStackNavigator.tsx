import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CodeScannerPage from '@/pages/CodeScannerPage';
import { Camera } from 'react-native-vision-camera';
import PermissionsPage from '@/pages/PermissionsPage';
import HomePage from '@/pages/HomePage';
import StartSurveyPage from '@/pages/StartSurveyPage';
import POSPage from '@/pages/POSPage';
import CreatePOSPage from '@/pages/CreatePOSPage';
import RequestPage from '@/pages/RequestPage';
import LeaveShopPage from '@/pages/LeaveShopPage';
import ConfirmWorkingPage from '@/pages/ConfirmWorkingPage';
import CameraPage from '@/pages/CameraPage';
import MediaPage from '@/pages/MediaPage';
import DashboardWorkingPage from '@/pages/DashboardWorkingPage';
import CheckInventoryPage from '@/pages/CheckInventoryPage';

const InsideStack = createNativeStackNavigator();

const InsideStackNavigator = () => {
    const cameraPermission = Camera.getCameraPermissionStatus();

    console.log(`Re-rendering Navigator. Camera: ${cameraPermission} `);

    const showPermissionsPage = cameraPermission !== 'granted';
    return (
        <InsideStack.Navigator screenOptions={{ headerShown: false }}>
            <InsideStack.Screen name="StartSurveyPage" component={StartSurveyPage} />
            <InsideStack.Screen name="CodeScannerPage" component={CodeScannerPage} />
            <InsideStack.Screen name="PermissionsPage" component={PermissionsPage} />
            <InsideStack.Screen name="HomePage" component={HomePage} />
            <InsideStack.Screen name="POSPage" component={POSPage} />
            <InsideStack.Screen name="CreatePOSPage" component={CreatePOSPage} />
            <InsideStack.Screen name="RequestPage" component={RequestPage} />
            <InsideStack.Screen name="LeaveShopPage" component={LeaveShopPage} />
            <InsideStack.Screen name="ConfirmWorkingPage" component={ConfirmWorkingPage} />
            <InsideStack.Screen name="CameraPage" component={CameraPage} />
            <InsideStack.Screen name="MediaPage" component={MediaPage} />
            <InsideStack.Screen name="DashboardWorkingPage" component={DashboardWorkingPage} />
            <InsideStack.Screen name="CheckInventoryPage" component={CheckInventoryPage} />
        </InsideStack.Navigator>
    );
};

export default InsideStackNavigator;
