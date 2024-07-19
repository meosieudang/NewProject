import { Box, Container, Text } from '@/atoms';
import Header from '@/components/Header';
import LoadingButton from '@/components/LoadingButton';
import { refModal } from '@/components/Modal';
import TextField from '@/components/TextField';
import navigation from '@/utils/navigation';
import React from 'react';
import { useController, useForm } from 'react-hook-form';

const VerifyCustomerStep1Page = () => {
    const { control, handleSubmit, reset, watch, setValue } = useForm({
        defaultValues: {
            fullName: 'Nguyen Van A',
            phoneNumber: '0987654321'
        }
    });
    const onBack = () => {
        refModal.current?.setToggle({
            type: 'warning',
            title: 'Xác nhận',
            message: 'Xác nhận quay về sẽ không hoàn thành việc bán hàng',
            isConfirm: true,
            onPress: navigation.back
        });
    };

    const { field: fieldFullName } = useController({ control, name: 'fullName' });
    const { field: fieldPhoneNumber } = useController({ control, name: 'phoneNumber' });
    const onSubmit = (d) => {
        navigation.navigate('VerifyCustomerStep2Page', d);
    };
    return (
        <Container px={'space-16'} pb={'space-16'}>
            <Header title="Nhập thông tin khách hàng" onBack={onBack} />
            <Box flex={1} g={'space-16'} mt={'space-16'}>
                <TextField value={fieldFullName.value} onChangeText={fieldFullName.onChange} title={'Tên khách hàng'} />
                <TextField
                    value={fieldPhoneNumber.value}
                    onChangeText={fieldPhoneNumber.onChange}
                    title={'Số điện thoại'}
                    keyboardType="numeric"
                />
            </Box>
            <LoadingButton title="Nhập" onPress={handleSubmit(onSubmit)} />
        </Container>
    );
};

export default VerifyCustomerStep1Page;
