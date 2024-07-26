import { Box, Container } from '@/atoms';
import LoadingButton from '@/components/LoadingButton';
import { SCREEN_HEIGHT } from '@/constants';
import { useIsForeground } from '@/hooks/useIsForeground';
import theme from '@/themes/light';
import navigation from '@/utils/navigation';
import { WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import { Header } from '@react-navigation/elements';
import { useIsFocused } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { Path, Svg } from 'react-native-svg';
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
                    <QRFrame />

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
    const animationValue = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: animationValue.value
                }
            ]
        };
    });

    animationValue.value = withRepeat(
        withTiming(0.95, {
            duration: 700,
            easing: Easing.inOut(Easing.ease)
        }),
        -1, // Infinite repeats
        true // No reverse direction, just reset to original scale
    );

    return (
        <Box position={'absolute'} alignSelf={'center'} top={SCREEN_HEIGHT / 2 - 200}>
            <Animated.View style={animatedStyle}>
                <Box width={300} height={300}>
                    <Box position={'absolute'}>
                        <CornerSvg d={topLeftPath} />
                    </Box>
                    <Box position={'absolute'} right={0}>
                        <CornerSvg d={topRightPath} />
                    </Box>
                    <Box position={'absolute'} bottom={0}>
                        <CornerSvg d={bottomLeftPath} />
                    </Box>
                    <Box position={'absolute'} bottom={0} right={0}>
                        <CornerSvg d={bottomRightPath} />
                    </Box>
                </Box>
            </Animated.View>
        </Box>
    );
};

const topLeftPath =
    'M9.877 3H11.5a.5.5 0 0 1 0 1H9.9c-1.128 0-1.945 0-2.586.053-.637.052-1.057.152-1.403.328a3.5 3.5 0 0 0-1.53 1.53c-.176.346-.276.766-.328 1.403C4 7.955 4 8.772 4 9.9v1.6a.5.5 0 0 1-1 0V9.877c0-1.1 0-1.958.056-2.645.057-.698.175-1.265.434-1.775A4.5 4.5 0 0 1 5.457 3.49c.51-.26 1.077-.377 1.775-.434C7.92 3 8.776 3 9.877 3Z';
const topRightPath =
    'M5.123 3H3.5a.5.5 0 0 0 0 1h1.6c1.128 0 1.945 0 2.586.053.637.052 1.057.152 1.403.328a3.5 3.5 0 0 1 1.53 1.53c.176.346.276.766.328 1.403C11 7.955 11 8.772 11 9.9v1.6a.5.5 0 0 0 1 0V9.877c0-1.1 0-1.958-.056-2.645-.057-.698-.175-1.265-.435-1.775A4.5 4.5 0 0 0 9.543 3.49c-.51-.26-1.077-.377-1.775-.434C7.08 3 6.224 3 5.123 3Z';
const bottomLeftPath =
    'M9.877 12H11.5a.5.5 0 0 0 0-1H9.9c-1.128 0-1.945 0-2.586-.053-.637-.052-1.057-.152-1.403-.329a3.5 3.5 0 0 1-1.53-1.529c-.176-.346-.276-.766-.328-1.403C4 7.045 4 6.228 4 5.1V3.5a.5.5 0 0 0-1 0v1.623c0 1.1 0 1.958.056 2.645.057.698.175 1.265.434 1.775a4.5 4.5 0 0 0 1.967 1.966c.51.26 1.077.378 1.775.435C7.92 12 8.776 12 9.877 12Z';
const bottomRightPath =
    'M5.123 12H3.5a.5.5 0 0 1 0-1h1.6c1.128 0 1.945 0 2.586-.053.637-.052 1.057-.152 1.403-.329a3.5 3.5 0 0 0 1.53-1.529c.176-.346.276-.766.328-1.403C11 7.045 11 6.228 11 5.1V3.5a.5.5 0 0 1 1 0v1.623c0 1.1 0 1.958-.056 2.645-.057.698-.175 1.265-.435 1.775a4.5 4.5 0 0 1-1.966 1.966c-.51.26-1.077.378-1.775.435C7.08 12 6.224 12 5.123 12Z';

const CornerSvg = ({ d }) => {
    return (
        <Svg width={48} height={48} fill="none" viewBox="0 0 15 15">
            <Path fill={'gold'} fillRule="evenodd" d={d} clipRule="evenodd" />
        </Svg>
    );
};
