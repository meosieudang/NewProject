import { Box, Container } from '@/atoms';
import LoadingButton from '@/components/LoadingButton';
import { SCREEN_HEIGHT } from '@/constants';
import { useIsForeground } from '@/hooks/useIsForeground';
import theme from '@/themes/light';
import navigation from '@/utils/navigation';
import { WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import { Header } from '@react-navigation/elements';
import { RouteProp, useIsFocused, useRoute } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { Camera, Code, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';

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
        navigation.navigate('CustomerAccessStep4Page', { mode: 'scanner' });
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
        <Container bg={'text.default'}>
            {device != null && (
                <>
                    <Camera
                        style={StyleSheet.absoluteFill}
                        device={device}
                        isActive={isActive}
                        codeScanner={codeScanner}
                        torch={torch ? 'on' : 'off'}
                        enableZoomGesture={true}
                    />
                    <QRFrame />
                    <Header
                        title="Quét mã"
                        headerTitleAlign="center"
                        headerTintColor="white"
                        headerTransparent
                        headerLeft={() => (
                            <Box px={'space-16'}>
                                <ArrowLeft color={theme.colors['background.default']} onPress={navigation.back} size={24} />
                            </Box>
                        )}
                    />
                    <Box position={'absolute'} bottom={16} width={WINDOW_WIDTH - 32} alignSelf={'center'}>
                        <LoadingButton
                            title="Nhập thủ công"
                            onPress={() => navigation.navigate('CustomerAccessStep4Page', { mode: 'manual' })}
                        />
                    </Box>
                </>
            )}
        </Container>
    );
};

export default CodeScannerPage;

const QRFrame = () => {
    const animationValue = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: withRepeat(
                        withTiming(animationValue.value === 1 ? 0.9 : 1, {
                            duration: 800,
                            easing: Easing.ease
                        }),
                        -1,
                        true
                    )
                }
            ]
        };
    });

    useEffect(() => {
        // animationValue.value = 1;
    }, []);
    return (
        <Animated.View style={animatedStyle}>
            <View style={styles.qrFrame}>
                {Array.from({ length: 8 }).map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.qrFrameCorner,
                            index % 2 === 0 ? styles.qrFrameCornerWidth : styles.qrFrameCornerHeight,
                            index < 2
                                ? styles.qrFrameCornerTopLeft
                                : index < 4
                                ? styles.qrFrameCornerTopRight
                                : index < 6
                                ? styles.qrFrameCornerBottomLeft
                                : styles.qrFrameCornerBottomRight
                        ]}
                    />
                ))}
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    qrFrame: {
        width: 300,
        height: 300,
        position: 'absolute',
        alignSelf: 'center',
        top: SCREEN_HEIGHT / 2 - 150
    },
    qrFrameCorner: {
        position: 'absolute',
        borderWidth: 2,
        borderColor: theme.colors['warning.default'],
        borderRadius: 32
    },
    qrFrameCornerWidth: {
        width: 30
    },
    qrFrameCornerHeight: {
        height: 30
    },
    qrFrameCornerTopLeft: {
        top: 0,
        left: 0
    },
    qrFrameCornerTopRight: {
        top: 0,
        right: 0
    },
    qrFrameCornerBottomLeft: {
        bottom: 0,
        left: 0
    },
    qrFrameCornerBottomRight: {
        bottom: 0,
        right: 0
    }
});
