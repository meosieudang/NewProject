import { Box, Container, Text } from '@/atoms';
import Header from '@/components/Header';
import LoadingButton from '@/components/LoadingButton';
import { refModal } from '@/components/Modal';
import eventEmitter from '@/utils/event-emitter';
import navigation from '@/utils/navigation';
import React, { useEffect } from 'react';

const SurveyTopupStep1Page = () => {
    useEffect(() => {
        eventEmitter.addListener('TAKE_PHOTO', (d) => {
            console.log(d, 'data');
            refModal.current?.setToggle({
                type: 'success',
                title: 'Thành công',
                message: 'Upload khảo sát thành công',
                onPress() {
                    navigation.navigate('SurveyTopupStep2Page');
                }
            });
        });
        return () => {
            eventEmitter.removeAllListeners('TAKE_PHOTO');
        };
    }, []);
    return (
        <Container px={'space-16'}>
            <Header title="Khảo sát top-up" />
            <Box flex={1} justifyContent={'center'} g={'space-32'}>
                <Text variant={'title'} textAlign={'center'}>{`Chúc mừng bạn nhận được khảo sát\ncó trị giá ${_.random(10, 50)}.000`}</Text>
                <Box g={'space-8'}>
                    <LoadingButton title="Thực hiện khảo sát" onPress={() => navigation.navigate('CameraPage')} />
                    <LoadingButton title="Quay lại" outline />
                </Box>
            </Box>
        </Container>
    );
};

export default SurveyTopupStep1Page;
