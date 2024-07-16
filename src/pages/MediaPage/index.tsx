import { Container, HStack, Image, TouchableOpacity } from '@/atoms';
import theme from '@/themes/light';
import eventEmitter from '@/utils/event-emitter';
import navigation from '@/utils/navigation';
import { Check, X } from 'lucide-react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { ImageLoadEventData, NativeSyntheticEvent, StyleSheet } from 'react-native';
type OnLoadImage = NativeSyntheticEvent<ImageLoadEventData>;
const MediaPage = ({ route }) => {
    const { path, type } = route.params;
    const [hasMediaLoaded, setHasMediaLoaded] = useState(false);
    const source = useMemo(() => ({ uri: `file://${path}` }), [path]);
    const onMediaLoad = useCallback((event: OnLoadImage) => {
        const source = event.nativeEvent.source;
        console.log(`Image loaded. Size: ${source.width}x${source.height}`);
    }, []);
    const onMediaLoadEnd = useCallback(() => {
        console.log('media has loaded.');
        setHasMediaLoaded(true);
    }, []);

    const onOk = () => {
        eventEmitter.emit('TAKE_PHOTO', source);
        navigation.pop(2);
    };

    const screenStyle = useMemo(() => ({ opacity: hasMediaLoaded ? 1 : 0 }), [hasMediaLoaded]);
    return (
        <Container style={screenStyle}>
            {type === 'photo' && (
                <Image source={source} style={StyleSheet.absoluteFill} resizeMode="cover" onLoadEnd={onMediaLoadEnd} onLoad={onMediaLoad} />
            )}
            <HStack justifyContent={'space-between'}>
                <TouchableOpacity m={'space-16'} onPress={navigation.back}>
                    <X color={theme.colors['background.default']} size={32} />
                </TouchableOpacity>
                <TouchableOpacity m={'space-16'} onPress={onOk}>
                    <Check color={theme.colors['background.default']} size={32} />
                </TouchableOpacity>
            </HStack>
        </Container>
    );
};

export default MediaPage;
