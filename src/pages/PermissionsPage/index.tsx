import { Linking, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';
import navigation from '@/utils/navigation';

const PermissionsPage = () => {
    const [cameraPermissionStatus, setCameraPermissionStatus] = useState<CameraPermissionStatus>('not-determined');
    // const [microphonePermissionStatus, setMicrophonePermissionStatus] = useState<CameraPermissionStatus>('not-determined')

    // const requestMicrophonePermission = useCallback(async () => {
    //   console.log('Requesting microphone permission...')
    //   const permission = await Camera.requestMicrophonePermission()
    //   console.log(`Microphone permission status: ${permission}`)

    //   if (permission === 'denied') await Linking.openSettings()
    //   setMicrophonePermissionStatus(permission)
    // }, [])

    const requestCameraPermission = useCallback(async () => {
        console.log('Requesting camera permission...');
        const permission = await Camera.requestCameraPermission();
        console.log(`Camera permission status: ${permission}`);

        if (permission === 'denied') await Linking.openSettings();
        setCameraPermissionStatus(permission);
    }, []);

    useEffect(() => {
        if (cameraPermissionStatus === 'granted') navigation.replace('CodeScannerPage');
    }, [cameraPermissionStatus]);

    return (
        <View>
            {cameraPermissionStatus !== 'granted' && (
                <Text style={styles.permissionText}>
                    Vision Camera needs <Text style={styles.bold}>Camera permission</Text>.{' '}
                    <Text style={styles.hyperlink} onPress={requestCameraPermission}>
                        Grant
                    </Text>
                </Text>
            )}
        </View>
    );
};

export default PermissionsPage;

const styles = StyleSheet.create({});
