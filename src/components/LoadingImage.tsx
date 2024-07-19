import React, { useCallback, useMemo, useState } from 'react';
import { Box, Image } from '@/atoms';
import { ImageLoadEventData, NativeSyntheticEvent, StyleSheet } from 'react-native';
import { WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import theme from '@/themes/light';
import { ResponsiveValue } from '@shopify/restyle';
import { Theme } from '@/themes';

type OnLoadImage = NativeSyntheticEvent<ImageLoadEventData>;

const LoadingImage = ({ path = '', width = WINDOW_WIDTH - 32, height = 200 }) => {
    const uri = path.startsWith('http') ? path : `file://${path}`;
    const [hasMediaLoaded, setHasMediaLoaded] = useState(false);
    const source = useMemo(() => ({ uri }), [path]);

    const onMediaLoad = useCallback((event: OnLoadImage) => {
        const source = event.nativeEvent.source;
        // console.log(`Image loaded. Size: ${source.width}x${source.height}`);
    }, []);
    const onMediaLoadEnd = useCallback(() => {
        // console.log('media has loaded.');
        setHasMediaLoaded(true);
    }, []);
    const screenStyle = useMemo(() => ({ opacity: hasMediaLoaded ? 1 : 0 }), [hasMediaLoaded]);

    return (
        <Box
            borderWidth={1}
            borderColor={'border.default'}
            bg={'background.hover'}
            style={screenStyle}
            borderRadius={'border-radius-8'}
            width={width}
            height={height}
        >
            <Image
                borderRadius={'border-radius-8' as any}
                source={source}
                style={StyleSheet.absoluteFill}
                resizeMode="cover"
                onLoadEnd={onMediaLoadEnd}
                onLoad={onMediaLoad}
            />
        </Box>
    );
};

export default LoadingImage;
