import { Box, Container, HStack, Text } from '@/atoms';
import Header from '@/components/Header';
import LoadingButton from '@/components/LoadingButton';
import { refModal } from '@/components/Modal';
import TextField from '@/components/TextField';
import { FONTS } from '@/constants';
import useCheckCameraPermission from '@/hooks/useCheckCameraPermission';
import eventEmitter from '@/utils/event-emitter';
import navigation from '@/utils/navigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useGlobalCustomerAccessStep3 } from '../CustomerAccessStep3Page';

type ParamList = {
    Data: {
        mode: 'scanner' | 'manual';
    };
};
const CustomerAccessStep4Page = () => {
    const { params } = useRoute<RouteProp<ParamList, 'Data'>>();
    const { requestCameraPermission, cameraPermission } = useCheckCameraPermission();
    const [v, setVal] = useGlobalCustomerAccessStep3();

    const { control, handleSubmit, getValues } = useForm({
        defaultValues: {
            serialCode: '123456789',
            batchCode: 'AA/2020'
        }
    });

    const onSuccess = (d) => {
        refModal.current?.setToggle({
            type: 'success',
            title: 'Thành công',
            message: 'Mã sản phẩm hợp lệ.\nVui lòng chụp hình gói bán.',
            onPress: () => handleSuccess(d)
        });
    };

    const handleSuccess = (d) => {
        if (cameraPermission !== 'granted') {
            return requestCameraPermission();
        }
        navigation.navigate('CameraPage');
    };

    const onError = () => {
        refModal.current?.setToggle({
            type: 'error',
            title: 'Không thành công',
            message: 'Serial code không hợp lệ.\nVui lòng kiểm tra lại.'
        });
    };
    const onPressComplete = (d) => {
        onSuccess(d);
    };

    const handleTakePhotoSuccess = (image) => {
        setVal({ ...v, ...getValues(), image, ...params });
        navigation.pop(2);
    };

    useEffect(() => {
        eventEmitter.addListener('TAKE_PHOTO', (d) => {
            refModal.current?.setToggle({
                type: 'success',
                title: 'Thành công',
                message: `Chụp hình gói bán thành công.`,
                onPress: () => {
                    handleTakePhotoSuccess(d?.uri);
                }
            });
        });
        return () => {
            eventEmitter.removeAllListeners('TAKE_PHOTO');
        };
    }, []);

    return (
        <Container px={'space-16'} pb={'space-16'}>
            <Header title="Nhập mã sản phẩm" />
            <Text variant={'subtitle'} my={'space-16'}>{`Nhập thủ công:`}</Text>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} enableOnAndroid>
                <Box gap={'space-16'} mt={'space-16'} flex={1}>
                    <InputProduct keyboardType="numeric" title={'Serial code'} control={control} name={'serialCode'} />
                    <InputProduct title={'Batch code'} control={control} name={'batchCode'} />
                </Box>
            </KeyboardAwareScrollView>
            <LoadingButton title="Hoàn thành" onPress={handleSubmit(onPressComplete)} />
        </Container>
    );
};

export default CustomerAccessStep4Page;

const InputProduct = ({ title, control, name, keyboardType = 'default' }) => {
    const { field } = useController({ name, control });

    return (
        <HStack gap={'space-16'}>
            <Box>
                <Text variant={'bodySemibold'}>{title}</Text>
            </Box>
            <Box flex={2}>
                <TextField
                    //@ts-ignore
                    keyboardType={keyboardType}
                    value={name === 'serialCode' ? String(field.value).replace(/[^0-9]/g, '') : field.value}
                    onChangeText={field.onChange}
                    multiline
                    textAlign="center"
                />
            </Box>
        </HStack>
    );
};
