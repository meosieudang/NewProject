import { Box, Container, Text } from '@/atoms';
import Header from '@/components/Header';
import LoadingButton from '@/components/LoadingButton';
import { refModal } from '@/components/Modal';
import eventEmitter from '@/utils/event-emitter';
import navigation from '@/utils/navigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
type ParamList = {
    Data: {
        shopName: string;
        address: string;
    };
};
const ConfirmWorkingPage = () => {
    const { params } = useRoute<RouteProp<ParamList, 'Data'>>();
    const onStartWorking = () =>
        refModal.current?.setToggle({
            type: 'warning',
            title: 'Vị trí không chính xác',
            message: 'Vị trí hiện tại của bạn không đúng\nvới vị trí cửa hàng. Hãy chụp ảnh cửa\nhàng',
            onPress: () => {
                navigation.navigate('CameraPage');
            }
        });

    const handleCheckin = (d) => {
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

    useEffect(() => {
        eventEmitter.addListener('TAKE_PHOTO', (d) => {
            console.log(d, 'data');
            handleCheckin(d);
        });
        return () => {
            eventEmitter.removeAllListeners('TAKE_PHOTO');
        };
    }, []);
    return (
        <Container px={'space-16'}>
            <Header title="Xác nhận làm việc" />
            <ConfirmWork
                params={params}
                onPressStart={handleCheckin}
                onPressLeave={() => navigation.navigate('LeaveShopPage', { ...params })}
            />
        </Container>
    );
};

export default ConfirmWorkingPage;

const ConfirmWork = ({ params, onPressStart, onPressLeave }) => {
    return (
        <Box flex={1} justifyContent={'center'} gap={'space-16'}>
            <Box flex={2} />
            <Box alignItems={'center'} gap={'space-16'}>
                <Text variant={'subtitle'}>{`Vui lòng xác nhận bạn sẽ làm việc tại quán`}</Text>
                <Text variant={'headline'}>{params.shopName}</Text>
                <Text>{`Địa chỉ: ${params.address}`}</Text>
                {/* <Image source={check} width={100} height={100} /> */}
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
