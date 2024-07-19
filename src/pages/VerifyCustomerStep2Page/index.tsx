import { Box, Container, Text } from '@/atoms';
import Header from '@/components/Header';
import LoadingButton from '@/components/LoadingButton';
import theme from '@/themes/light';
import navigation from '@/utils/navigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Smartphone } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';

type ParamList = {
    Data: {
        fullName: string;
        phoneNumber: string;
    };
};
const VerifyCustomerStep2Page = () => {
    const { params } = useRoute<RouteProp<ParamList, 'Data'>>();
    // useEffect(() => {
    //     const backAction = () => {
    //         //   Alert.alert('Hold on!', 'Are you sure you want to go back?', [
    //         //     {
    //         //       text: 'Cancel',
    //         //       onPress: () => null,
    //         //       style: 'cancel',
    //         //     },
    //         //     {text: 'YES', onPress: () => BackHandler.exitApp()},
    //         //   ]);
    //         return true;
    //     };

    //     const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    //     return () => backHandler.remove();
    // }, []);
    return (
        <Container px={'space-16'} pb={'space-16'}>
            <Header title="Thông tin chi tiết khách hàng" useHeaderLeft={false} />
            <Box flex={1} justifyContent={'center'} alignItems={'center'} g={'space-16'}>
                <Box
                    bg={'error.alternative'}
                    width={150}
                    height={150}
                    borderRadius={'border-radius-9999'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <Smartphone size={100} color={theme.colors['primary.default']} />
                </Box>
                <Text variant={'bodySemibold'}>{`Bạn đã nhập số điện thoại:`}</Text>
                <Text variant={'headline'} color={'primary.default'}>
                    {params.phoneNumber ?? null}
                </Text>
                <Text
                    variant={'bodySemibold'}
                    textAlign={'center'}
                >{`Sau bước này bạn sẽ không thể chỉnh sửa số điện thoại được nữa. Chỉ số điện thoại có thực mới nhận được mã xác minh.`}</Text>
            </Box>
            <Box g={'space-8'}>
                <LoadingButton title="Tiếp tục" onPress={() => navigation.navigate('VerifyCustomerStep3Page', params)} />
                <LoadingButton title="Quay lại" outline onPress={navigation.back} />
            </Box>
        </Container>
    );
};

export default VerifyCustomerStep2Page;
