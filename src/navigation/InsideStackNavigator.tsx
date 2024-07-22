import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CodeScannerPage from '@/pages/CodeScannerPage';
import { Camera } from 'react-native-vision-camera';
import PermissionsPage from '@/pages/PermissionsPage';
import HomePage from '@/pages/HomePage';
import StartSurveyPage from '@/pages/StartSurveyPage';
import POSPage from '@/pages/POSPage';
import CreatePOSPage from '@/pages/CreatePOSPage';
import RequestWorkingPage from '@/pages/RequestWorkingPage';
import LeaveShopPage from '@/pages/LeaveShopPage';
import ConfirmWorkingPage from '@/pages/ConfirmWorkingPage';
import CameraPage from '@/pages/CameraPage';
import MediaPage from '@/pages/MediaPage';
import DashboardWorkingPage from '@/pages/DashboardWorkingPage';
import CheckInventoryPage from '@/pages/CheckInventoryPage';
import ConfirmAgePage from '@/pages/ConfirmAgePage';
import ConfirmProvidePhoneNumberPage from '@/pages/ConfirmProvidePhoneNumberPage';
import CustomerAccessStep1Page from '@/pages/CustomerAccessStep1Page';
import CustomerAccessStep2Page from '@/pages/CustomerAccessStep2Page';
import CustomerAccessStep3Page from '@/pages/CustomerAccessStep3Page';
import CustomerAccessStep4Page from '@/pages/CustomerAccessStep4Page';
import VerifyCustomerStep1Page from '@/pages/VerifyCustomerStep1Page';
import VerifyCustomerStep2Page from '@/pages/VerifyCustomerStep2Page';
import VerifyCustomerStep3Page from '@/pages/VerifyCustomerStep3Page';
import VerifyCustomerStep4Page from '@/pages/VerifyCustomerStep4Page';
import useCheckCameraPermission from '@/hooks/useCheckCameraPermission';
import CustomerNotBuyPage from '@/pages/CustomerNotBuyPage';
import StoreStatusPage from '@/pages/StoreStatusPage';
import EndSurveyPage from '@/pages/EndSurveyPape';
import KPIGlobalPage from '@/pages/KPIGlobalPage';
import KPIPage from '@/pages/KPIPage';
import SurveyTopupStep1Page from '@/pages/SurveyTopupStep1Page';
import SurveyTopupStep2Page from '@/pages/SurveyTopupStep2Page';
import NearPOSPage from '@/pages/NearPOSPage';
import ResultSurveyPage from '@/pages/ResultSurveyPage';

const InsideStack = createNativeStackNavigator();

const InsideStackNavigator = () => {
    const { requestCameraPermission, cameraPermission } = useCheckCameraPermission();
    console.log(`Re-rendering Navigator. Camera: ${cameraPermission} `);

    const showPermissionsPage = cameraPermission !== 'granted';
    return (
        <InsideStack.Navigator initialRouteName="" screenOptions={{ headerShown: false }}>
            {/* Survey */}
            <InsideStack.Screen name="StartSurveyPage" component={StartSurveyPage} />
            <InsideStack.Screen name="EndSurveyPage" component={EndSurveyPage} />
            <InsideStack.Screen name="ResultSurveyPage" component={ResultSurveyPage} />

            <InsideStack.Screen name="CodeScannerPage" component={CodeScannerPage} />
            <InsideStack.Screen name="PermissionsPage" component={PermissionsPage} />

            <InsideStack.Screen name="RequestWorkingPage" component={RequestWorkingPage} />
            <InsideStack.Screen name="LeaveShopPage" component={LeaveShopPage} />
            <InsideStack.Screen name="ConfirmWorkingPage" component={ConfirmWorkingPage} />
            <InsideStack.Screen name="CameraPage" component={CameraPage} />
            <InsideStack.Screen name="MediaPage" component={MediaPage} />

            {/* MAIN */}
            <InsideStack.Screen name="HomePage" component={HomePage} />
            <InsideStack.Screen name="POSPage" component={POSPage} />
            <InsideStack.Screen name="CreatePOSPage" component={CreatePOSPage} />
            <InsideStack.Screen name="KPIGlobalPage" component={KPIGlobalPage} />
            <InsideStack.Screen name="NearPOSPage" component={NearPOSPage} />

            {/* WORKING SHOP */}
            <InsideStack.Screen name="DashboardWorkingPage" component={DashboardWorkingPage} />
            <InsideStack.Screen name="CheckInventoryPage" component={CheckInventoryPage} />
            <InsideStack.Screen name="StoreStatusPage" component={StoreStatusPage} />
            <InsideStack.Screen name="KPIPage" component={KPIPage} />
            <InsideStack.Screen name="SurveyTopupStep1Page" component={SurveyTopupStep1Page} />
            <InsideStack.Screen name="SurveyTopupStep2Page" component={SurveyTopupStep2Page} />

            {/* Confirm */}
            <InsideStack.Screen name="ConfirmAgePage" component={ConfirmAgePage} />
            <InsideStack.Screen name="ConfirmProvidePhoneNumberPage" component={ConfirmProvidePhoneNumberPage} />

            {/* Customer Access Flow */}
            <InsideStack.Screen name="CustomerAccessStep1Page" component={CustomerAccessStep1Page} />
            <InsideStack.Screen name="CustomerAccessStep2Page" component={CustomerAccessStep2Page} />
            <InsideStack.Screen name="CustomerAccessStep3Page" component={CustomerAccessStep3Page} />
            <InsideStack.Screen name="CustomerAccessStep4Page" component={CustomerAccessStep4Page} />
            <InsideStack.Screen name="CustomerNotBuyPage" component={CustomerNotBuyPage} />

            {/* Verify customer with phone number */}
            <InsideStack.Screen name="VerifyCustomerStep1Page" component={VerifyCustomerStep1Page} />
            <InsideStack.Screen name="VerifyCustomerStep2Page" component={VerifyCustomerStep2Page} />
            <InsideStack.Screen name="VerifyCustomerStep3Page" component={VerifyCustomerStep3Page} />
            <InsideStack.Screen name="VerifyCustomerStep4Page" component={VerifyCustomerStep4Page} />
        </InsideStack.Navigator>
    );
};

export default InsideStackNavigator;
