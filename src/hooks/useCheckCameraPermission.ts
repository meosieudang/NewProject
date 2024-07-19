import React, { useCallback, useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';

const useCheckCameraPermission = () => {
    const [cameraPermissionStatus, setCameraPermissionStatus] = useState<CameraPermissionStatus>('not-determined');
    const cameraPermission = Camera.getCameraPermissionStatus();
    const requestCameraPermission = useCallback(async () => {
        console.log('Requesting camera permission...');
        const permission = await Camera.requestCameraPermission();
        console.log(`Camera permission status: ${permission}`);

        if (permission === 'denied') await Linking.openSettings();
        setCameraPermissionStatus(permission);
    }, []);

    useEffect(() => {
        if (cameraPermission !== 'granted') requestCameraPermission();
    }, [cameraPermission]);

    return { requestCameraPermission, cameraPermission };
};

export default useCheckCameraPermission;
