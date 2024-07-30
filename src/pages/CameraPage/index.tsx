import { Box, Container, TouchableOpacity } from '@/atoms';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants';
import useCheckCameraPermission from '@/hooks/useCheckCameraPermission';
import { useIsForeground } from '@/hooks/useIsForeground';
import theme from '@/themes/light';
import navigation from '@/utils/navigation';
import { Header } from '@react-navigation/elements';
import { useIsFocused } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import { Camera, CameraRuntimeError, PhotoFile, useCameraDevice, useCameraFormat, VideoFile } from 'react-native-vision-camera';

const CameraPage = () => {
    const camera = useRef<Camera>(null);
    const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>('back');
    const [isCameraInitialized, setIsCameraInitialized] = useState(false);
    // camera device settings
    let device = useCameraDevice(cameraPosition);

    const [targetFps, setTargetFps] = useState(60);
    const [isLoading, setIsLoading] = useState(false);

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
            setIsLoading(false); // Stop loading after capture
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

            {isLoading ? (
                <Box position="absolute" alignSelf="center" bottom={34} justifyContent="center" alignItems="center">
                    <ActivityIndicator size="large" color={theme.colors['background.default']} />
                </Box>
            ) : (
                <CaptureButton camera={camera} onMediaCaptured={onMediaCaptured} setIsLoading={setIsLoading} />
            )}
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

const CaptureButton = ({ camera, onMediaCaptured, setIsLoading }) => {
    //#region Camera Capture
    const takePhoto = useCallback(async () => {
        try {
            setIsLoading(true);
            if (camera.current == null) throw new Error('Camera ref is null!');

            console.log('Taking photo...');
            const photo = await camera.current.takePhoto({
                // flash: flash,
                enableShutterSound: false
            });
            onMediaCaptured(photo, 'photo');
        } catch (e) {
            console.error('Failed to take photo!', e);
            setIsLoading(false);
        }
    }, [camera, onMediaCaptured, setIsLoading]);

    const d = _.debounce(takePhoto, 500);

    return (
        <TouchableOpacity onPress={d} position={'absolute'} alignSelf={'center'} bottom={34}>
            <Box
                borderRadius={'border-radius-9999'}
                width={74}
                height={74}
                borderColor={'background.default'}
                borderWidth={2}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Box width={64} height={64} bg={'background.default'} borderRadius={'border-radius-9999'} />
            </Box>
        </TouchableOpacity>
    );
};
