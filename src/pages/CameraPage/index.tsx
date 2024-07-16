import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Reanimated, { Extrapolate, interpolate, useAnimatedGestureHandler, useAnimatedProps, useSharedValue } from 'react-native-reanimated';
import { Camera, CameraRuntimeError, PhotoFile, Templates, useCameraDevice, useCameraFormat, VideoFile } from 'react-native-vision-camera';
import { Box, Container, TouchableOpacity } from '@/atoms';
import { useIsFocused } from '@react-navigation/native';
import { useIsForeground } from '@/hooks/useIsForeground';
import useCheckCameraPermission from '@/hooks/useCheckCameraPermission';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants';
import { ArrowLeft, Camera as CameraLucide } from 'lucide-react-native';
import navigation from '@/utils/navigation';
import { Header } from '@react-navigation/elements';
import theme from '@/themes/light';

const CameraPage = () => {
    const camera = useRef<Camera>(null);
    const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>('back');
    const [isCameraInitialized, setIsCameraInitialized] = useState(false);
    // camera device settings
    let device = useCameraDevice(cameraPosition);

    const [targetFps, setTargetFps] = useState(60);

    // check if camera page is active
    const isFocussed = useIsFocused();
    const isForeground = useIsForeground();
    const isActive = isFocussed && isForeground;

    const {} = useCheckCameraPermission();
    const screenAspectRatio = SCREEN_HEIGHT / SCREEN_WIDTH;
    const format = useCameraFormat(device, [
        { fps: targetFps },
        { videoAspectRatio: screenAspectRatio },
        { videoResolution: 'max' },
        { photoAspectRatio: screenAspectRatio },
        { photoResolution: 'max' }
    ]);
    const fps = Math.min(format?.maxFps ?? 1, targetFps);

    const onInitialized = useCallback(() => {
        console.log('Camera initialized!');
        setIsCameraInitialized(true);
    }, []);
    useEffect(() => {
        const f =
            format != null
                ? `(${format.photoWidth}x${format.photoHeight} photo / ${format.videoWidth}x${format.videoHeight}@${format.maxFps} video @ ${fps}fps)`
                : undefined;
        console.log(`Camera: ${device?.name} | Format: ${f}`);
    }, [device?.name, format, fps]);

    const onError = useCallback((error: CameraRuntimeError) => {
        console.error(error);
    }, []);

    const onMediaCaptured = useCallback(
        (media: PhotoFile | VideoFile, type: 'photo' | 'video') => {
            console.log(`Media captured! ${JSON.stringify(media)}`);
            navigation.navigate('MediaPage', {
                path: media.path,
                type: type
            });
        },
        [navigation]
    );
    if (device == null) return <NoCameraErrorView />;
    return (
        <Container>
            <Camera
                ref={camera}
                format={format}
                photoQualityBalance="quality"
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={isActive}
                onStarted={() => console.log('Camera started!')}
                onStopped={() => console.log('Camera stopped!')}
                onPreviewStarted={() => console.log('Preview started!')}
                onPreviewStopped={() => console.log('Preview stopped!')}
                onInitialized={onInitialized}
                onError={onError}
                // enableFpsGraph={true}
                exposure={0}
                outputOrientation="device"
                photo
                fps={fps}
            />
            <Header
                title="Chụp ảnh"
                headerTitleAlign="center"
                headerTintColor="white"
                headerTransparent
                headerLeft={() => (
                    <Box px={'space-16'}>
                        <ArrowLeft color={theme.colors['background.default']} onPress={navigation.back} size={24} />
                    </Box>
                )}
            />

            <CaptureButton camera={camera} onMediaCaptured={onMediaCaptured} />
        </Container>
    );
};

export default CameraPage;

const NoCameraErrorView = () => {
    return (
        <Container>
            <Text>no device</Text>
        </Container>
    );
};

const CaptureButton = ({ camera, onMediaCaptured }) => {
    //#region Camera Capture
    const takePhoto = useCallback(async () => {
        try {
            if (camera.current == null) throw new Error('Camera ref is null!');

            console.log('Taking photo...');
            const photo = await camera.current.takePhoto({
                // flash: flash,
                enableShutterSound: false
            });
            onMediaCaptured(photo, 'photo');
        } catch (e) {
            console.error('Failed to take photo!', e);
        }
    }, [camera, onMediaCaptured]);

    return (
        <TouchableOpacity onPress={takePhoto} position={'absolute'} alignSelf={'center'} bottom={34}>
            <CameraLucide color={'white'} size={64} />
        </TouchableOpacity>
    );
};
