import { Box, Container, Text } from '@/atoms';
import Header from '@/components/Header';
import LoadingButton from '@/components/LoadingButton';
import navigation from '@/utils/navigation';
import React from 'react';

const ConfirmAgePage = () => {
    return (
        <Container px={'space-16'}>
            <Header title="Xác nhận độ tuổi" />
            <Box flex={1} />
            <Box flex={1} justifyContent={'center'} gap={'space-8'}>
                <Text variant={'subtitle'} textAlign={'center'}>{`Vui lòng xác nhận độ tuổi khách hàng tham gia`}</Text>
                <Box flex={1} />
                <LoadingButton title="Xác nhận đủ 18 tuổi" onPress={() => navigation.navigate('ConfirmProvidePhoneNumberPage')} />
                <LoadingButton outline title="Chưa đủ 18 tuổi" onPress={navigation.back} />
            </Box>
            <Box flex={1} />
        </Container>
    );
};

export default ConfirmAgePage;
