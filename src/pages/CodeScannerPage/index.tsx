import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { Camera, Code, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';
import { useIsForeground } from '@/hooks/useIsForeground';

const CodeScannerPage = () => {
    // 1. Use a simple default back camera
    const device = useCameraDevice('back');

    // 2. Only activate Camera when the app is focused and this screen is currently opened
    const isFocused = useIsFocused();
    const isForeground = useIsForeground();
    const isActive = isFocused && isForeground;

    // 3. (Optional) enable a torch setting
    const [torch, setTorch] = useState(false);

    // 4. On code scanned, we show an aler to the user
    const isShowingAlert = useRef(false);
    const onCodeScanned = useCallback((codes: Code[]) => {
        console.log(`Scanned ${codes.length} codes:`, codes);
        const value = codes[0]?.value;
        if (value == null) return;
        // if (isShowingAlert.current) return;
        // showCodeAlert(value, () => {
        //     isShowingAlert.current = false;
        // });
        // isShowingAlert.current = true;
    }, []);

    // 5. Initialize the Code Scanner to scan QR codes and Barcodes
    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: onCodeScanned
    });

    return (
        <View style={styles.container}>
            {device != null && (
                <Camera
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={isActive}
                    codeScanner={codeScanner}
                    torch={torch ? 'on' : 'off'}
                    enableZoomGesture={true}
                />
            )}
        </View>
    );
};

export default CodeScannerPage;

const styles = StyleSheet.create({
    container: {
        flex: 1
        // backgroundColor: 'black'
    }
});
