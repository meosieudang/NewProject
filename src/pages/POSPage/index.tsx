import { leftArrow } from '@/assets';
import { Box, Container, HStack, Image, Pressable, Text, TouchableOpacity } from '@/atoms';
import TextField from '@/components/TextField';
import useTabView from '@/hooks/useTabView';
import theme from '@/themes/light';
import navigation from '@/utils/navigation';
import React from 'react';
import { Dimensions, Animated as AnimatedRN, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { TabView } from 'react-native-tab-view';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Header from '@/components/Header';

const POSPage = () => {
    const { index, setIndex, layout, routes } = useTabView({
        dataRoutes: [
            { key: 'a', title: 'ĐB trong ngày' },
            { key: 'b', title: 'Tất cả ĐB' }
        ]
    });
    const renderScene = ({ route }: { route: { key: string } }) => {
        switch (route.key) {
            case 'a':
                return <Tab1 />;
            case 'b':
                return <Tab2 />;
            default:
                return null;
        }
    };

    const translateX = useSharedValue<number>(0);

    const handlePress = (i: number) => {
        if (i === 0) {
            translateX.value = 0;
        } else {
            translateX.value = Dimensions.get('window').width * 0.5 - 16;
        }
    };

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: withTiming(translateX.value) }]
    }));

    const handlePressX = (i: number) => {
        setIndex(i);
        handlePress(i);
    };

    return (
        <Container px={'space-16'}>
            <Header title="Danh sách điểm bán" />
            <TabView
                lazy
                style={{ marginTop: 16 }}
                swipeEnabled={false}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width, height: 0 }}
                renderTabBar={(props) => {
                    const inputRange = props.navigationState.routes.map((x, i) => i);
                    return (
                        <HStack
                            style={{
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 1
                                },
                                shadowOpacity: 0.9,
                                shadowRadius: 1,
                                elevation: 3
                            }}
                            borderRadius={'border-radius-8'}
                            width={layout.width - 32}
                            height={40}
                            bg={'background.default'}
                        >
                            <Animated.View style={[styles.box, animatedStyles]} />
                            {props.navigationState.routes.map((route, i) => {
                                const color = props.position.interpolate({
                                    inputRange,
                                    outputRange: inputRange.map((inputIndex) =>
                                        index === i ? theme.colors['background.default'] : theme.colors['text.default']
                                    )
                                });
                                return (
                                    <Pressable height={40} justifyContent={'center'} flex={1} key={i} onPress={() => handlePressX(i)}>
                                        <AnimatedRN.Text style={{ color, fontSize: 16, textAlign: 'center' }}>
                                            {route.title}
                                        </AnimatedRN.Text>
                                    </Pressable>
                                );
                            })}
                        </HStack>
                    );
                }}
            />
        </Container>
    );
};

export default POSPage;

const styles = StyleSheet.create({
    box: {
        height: 40,
        width: '50%',
        borderRadius: 8,
        position: 'absolute',
        left: 0,
        backgroundColor: theme.colors['primary.default']
    }
});
