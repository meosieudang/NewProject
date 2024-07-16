import React, { useEffect } from 'react';
import navigation from '@/utils/navigation';
import { Box, Container, HStack, Image, Pressable, Text } from '@/atoms';
import { Header } from '@react-navigation/elements';
import LoadingButton from '@/components/LoadingButton';
import { idea, kpi, smartCity } from '@/assets';

const HomePage = () => {
    return (
        <Container p={'space-16'} pt={'space-0'}>
            <Header headerTitleAlign="center" title="Trang chủ" />
            <Box gap={'space-16'} alignItems={'center'} mt={'space-16'}>
                <BoxFunc onPress={() => navigation.navigate('POSPage')} title={`danh sách điểm bán`} icon={smartCity} />
                <BoxFunc onPress={() => navigation.navigate('createPOSPage')} title={`mở điểm bán`} icon={idea} />
                <BoxFunc onPress={() => navigation.navigate('POSPage')} title={`KPI`} icon={kpi} />
            </Box>
            <Box flex={1} />
            <LoadingButton outline title="đăng xuất" />
        </Container>
    );
};

export default HomePage;

const BoxFunc = ({ title, icon, onPress }) => {
    return (
        <Box gap={'space-8'} alignItems={'center'}>
            <Pressable
                onPress={onPress}
                justifyContent={'center'}
                borderRadius={'border-radius-12'}
                alignItems={'center'}
                width={100}
                height={100}
                bg={'primary.default'}
            >
                <Image source={icon} width={48} height={48} />
            </Pressable>
            <Text textTransform={'capitalize'} variant={'bodySemibold'} fontWeight={'700'}>
                {title}
            </Text>
        </Box>
    );
};
