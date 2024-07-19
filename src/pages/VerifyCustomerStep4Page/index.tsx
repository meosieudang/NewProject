import { check } from '@/assets';
import { Box, Container, Image, Text } from '@/atoms';
import Header from '@/components/Header';
import LoadingButton from '@/components/LoadingButton';
import navigation from '@/utils/navigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';

type ParamList = {
    Data: {
        fullName: string;
        phoneNumber: string;
    };
};
const VerifyCustomerStep4Page = () => {
    const { params } = useRoute<RouteProp<ParamList, 'Data'>>();

    return (
        <Container px={'space-16'} pb={'space-16'}>
            <Header title="Hoàn thành" useHeaderLeft={false} />

            <Box flex={1} justifyContent={'center'} alignItems={'center'} g={'space-16'}>
                <Image source={check} width={135} height={135} />
                <Text variant={'title'}>{`Lưu thông tin thành công`}</Text>
                <Text textAlign={'center'} variant={'bodySemibold'}>
                    {`Thông tin đã lưu thành công. Khách hàng ${
                        params?.phoneNumber ?? null
                    } đã tham gia chương trình. Chú ý nhắc khách hàng trước khi rời quán.`}
                </Text>
            </Box>
            <LoadingButton title="Trở về màn hình chính" onPress={() => navigation.pop(7)} />
        </Container>
    );
};

export default VerifyCustomerStep4Page;
