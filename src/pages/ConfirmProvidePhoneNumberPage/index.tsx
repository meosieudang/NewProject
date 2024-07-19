import { Box, Container, Text } from '@/atoms';
import Header from '@/components/Header';
import LoadingButton from '@/components/LoadingButton';
import navigation from '@/utils/navigation';
import React from 'react';

const ConfirmProvidePhoneNumberPage = () => {
    const handleConfirm = () => {
        navigation.pop(2);
        navigation.navigate('CustomerAccessStep1Page');
    };
    return (
        <Container px={'space-16'}>
            <Header title="Xác nhận cung cấp SĐT" />
            <Box flex={1} />
            <Box flex={1} justifyContent={'center'} gap={'space-8'}>
                <Text
                    variant={'subtitle'}
                    textAlign={'center'}
                >{`Em đang thực hiện khảo sát về hành vi của người tiêu dùng. Những thông tin anh/chị cung cấp để hoàn tất bảng câu hỏi này sẽ được bảo mật và không được chuyển nhượng hay bán lại cho bất kì một bên khác khi chưa có sự cho phép của anh/chị. Rất mong anh/chị dành chút thời gian hỗ trợ em làm khảo sát ạ.`}</Text>
                <Box flex={1} />
                <LoadingButton title="Xác nhận" onPress={handleConfirm} />
                <LoadingButton outline title="Quay lại" onPress={navigation.back} />
            </Box>
            <Box flex={1} />
        </Container>
    );
};

export default ConfirmProvidePhoneNumberPage;
