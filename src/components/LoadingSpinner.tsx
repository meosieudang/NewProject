import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import Animated, { cancelAnimation, Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { loading } from '@/assets';
const LoadingSpinner = () => {
    const rotation = useSharedValue(0);
    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotateZ: `${rotation.value * 360}deg`
                }
            ]
        };
    }, [rotation.value]);

    useEffect(() => {
        rotation.value = withRepeat(
            withTiming(1, {
                duration: 2500,
                easing: Easing.bezier(0.25, -0.5, 0.25, 1)
            }),
            -1
        );
        return () => cancelAnimation(rotation);
    }, []);
    return <Animated.Image source={loading} style={[styles.img, animatedStyles]} />;
};

export default LoadingSpinner;

const styles = StyleSheet.create({
    img: {
        width: 100,
        height: 100
    }
});
