import { check } from '@/assets';
import { Box, Container, Image, Text } from '@/atoms';
import Header from '@/components/Header';
import LoadingButton from '@/components/LoadingButton';
import navigation from '@/utils/navigation';
import React from 'react';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const SurveyTopupStep2Page = () => {
    return (
        <Container px={'space-16'} pb={'space-16'}>
            <Header useHeaderLeft={false} title="Hoàn thành" />
            <Box flex={1} justifyContent={'center'} alignItems={'center'} g={'space-16'}>
                <Animated.View entering={FadeInUp}>
                    <Image source={check} width={135} height={135} />
                </Animated.View>
                <Animated.View entering={FadeInDown}>
                    <Text variant={'title'}>{`Topup thành công`}</Text>
                </Animated.View>
            </Box>
            <LoadingButton title="Trở về màn hình chính" onPress={() => navigation.pop(2)} />
        </Container>
    );
};

export default SurveyTopupStep2Page;
