import { check, close } from '@/assets';
import { Box, Container, Image, Text } from '@/atoms';
import Header from '@/components/Header';
import LoadingButton from '@/components/LoadingButton';
import LoadingSpinner from '@/components/LoadingSpinner';
import { refModal } from '@/components/Modal';
import navigation from '@/utils/navigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import Animated, { FadeInUp } from 'react-native-reanimated';

type ParamList = {
    Data: {
        shopName: string;
        address: string;
    };
};
const RequestWorkingPage = () => {
    const { params } = useRoute<RouteProp<ParamList, 'Data'>>();
    const [status, setStatus] = useState<'loading' | 'approved' | 'rejected'>('loading');
    useEffect(() => {
        setTimeout(() => {
            const newStatus = Math.random() > 0.5 ? 'approved' : 'rejected';
            setStatus(newStatus);
        }, 1500);
    }, []);

    return (
        <Container px={'space-16'}>
            <Header title="Xác nhận làm việc" />
            {status === 'loading' && <Waiting params={params} />}
            {status === 'approved' && <Approved params={params} onPressLeave={() => navigation.navigate('LeaveShopPage', { ...params })} />}
            {status === 'rejected' && <Rejected params={params} />}
        </Container>
    );
};

export default RequestWorkingPage;

const Waiting = ({ params }) => {
    return (
        <Animated.View style={{ flex: 1 }} entering={FadeInUp}>
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
        </Animated.View>
    );
};

const Approved = ({ params, onPressLeave }) => {
    const onPressStart = () => {
        refModal.current?.setToggle({
            type: 'success',
            title: 'Thành công',
            message: 'Bắt đầu ca làm việc thành công!',
            onPress: () => {
                navigation.replace('DashboardWorkingPage');
            },
            confirmText: 'đến màn hình làm việc'
        });
    };
    return (
        <Animated.View style={{ flex: 1 }} entering={FadeInUp}>
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
        </Animated.View>
    );
};

const Rejected = ({ params }) => {
    return (
        <Animated.View style={{ flex: 1 }} entering={FadeInUp}>
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
        </Animated.View>
    );
};
