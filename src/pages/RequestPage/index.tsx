import React from 'react';
import { Box, Container, Image, Text } from '@/atoms';
import Header from '@/components/Header';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import LoadingButton from '@/components/LoadingButton';
import { check, close } from '@/assets';
import LoadingSpinner from '@/components/LoadingSpinner';
import navigation from '@/utils/navigation';

type ParamList = {
    Data: {
        shopName: string;
        address: string;
    };
};
const RequestPage = () => {
    const { params } = useRoute<RouteProp<ParamList, 'Data'>>();

    return (
        <Container px={'space-16'}>
            <Header title="Xác nhận làm việc" />
            {/* <Waiting params={params} /> */}
            <Approved params={params} onPressStart={() => {}} onPressLeave={() => navigation.navigate('LeaveShopPage', { ...params })} />
            {/* <Rejected params={params} /> */}
        </Container>
    );
};

export default RequestPage;

const Waiting = ({ params }) => {
    return (
        <Box flex={1} justifyContent={'center'} gap={'space-16'}>
            <Box flex={2} />
            <Box alignItems={'center'} gap={'space-16'}>
                <Box alignItems={'center'}>
                    <Text variant={'subtitle'}>{`Ca làm đang được xác thực.`}</Text>
                    <Text variant={'subtitle'}>{`Vui lòng liên hệ SUP để đươc giải quyết`}</Text>
                </Box>
                <LoadingSpinner />
                <Text variant={'title'}>{params.shopName}</Text>
                <Text>{`Địa chỉ: ${params.address}`}</Text>
            </Box>
            <Box flex={1} />
            <LoadingButton outline title="hủy" />
            <Box flex={2} />
        </Box>
    );
};

const Approved = ({ params, onPressStart, onPressLeave }) => {
    return (
        <Box flex={1} justifyContent={'center'} gap={'space-16'}>
            <Box flex={2} />
            <Box alignItems={'center'} gap={'space-16'}>
                <Text variant={'subtitle'}>{`Ca làm đã được xác thực bởi SUP`}</Text>
                <Image source={check} width={100} height={100} />
                <Text variant={'title'}>{params.shopName}</Text>
                <Text>{`Địa chỉ: ${params.address}`}</Text>
            </Box>
            <Box flex={1} />
            <Box gap={'space-16'}>
                <LoadingButton title="bắt đầu làm việc" onPress={onPressStart} />
                <LoadingButton outline title="rời khỏi quán" onPress={onPressLeave} />
            </Box>
            <Box flex={2} />
        </Box>
    );
};

const Rejected = ({ params }) => {
    return (
        <Box flex={1} justifyContent={'center'} gap={'space-16'}>
            <Box flex={2} />
            <Box alignItems={'center'} gap={'space-16'}>
                <Box alignItems={'center'}>
                    <Text variant={'subtitle'}>{`Yêu cầu làm việc bị từ chối`}</Text>
                    <Text variant={'subtitle'}>{`Lí do: abc`}</Text>
                </Box>
                <Image source={close} width={100} height={100} />
                <Text variant={'title'}>{params.shopName}</Text>
                <Text>{`Địa chỉ: ${params.address}`}</Text>
            </Box>
            <Box flex={1} />
            <LoadingButton title="OK" onPress={navigation.back} />
            <Box flex={2} />
        </Box>
    );
};
