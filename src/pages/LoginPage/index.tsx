import { bg_red } from '@/assets';
import { Box, HStack, Text } from '@/atoms';
import LoadingButton from '@/components/LoadingButton';
import { refModal } from '@/components/Modal';
import TextField from '@/components/TextField';
import navigation from '@/utils/navigation';
import React, { useEffect } from 'react';
import { ImageBackground, StatusBar } from 'react-native';

const LoginPage = () => {
    useEffect(() => {
        // toast.success('Hello', { duration: 2000 });
        // toast.success('Hello', { duration: 4000 });
    }, []);
    return (
        <ImageBackground source={bg_red} style={{ gap: 16, flex: 1, justifyContent: 'center' }}>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <Text textAlign={'center'} variant="headline" color={'background.default'}>{`BAT Application`}</Text>
            {/* <LoginForm /> */}
            <ChangePasswordForm />
            <Footer />
        </ImageBackground>
    );
};

export default LoginPage;

const LoginForm = () => {
    const onLogin = () => {
        refModal.current?.setToggle({ type: 'error', title: 'Thất bại', message: 'Bạn không thuộc Campaign nào!' });
    };
    return (
        <Box gap={'space-16'} mx={'space-16'} bg={'background.default'} p={'space-16'} py={'space-32'} borderRadius={'border-radius-8'}>
            <Text variant={'headline'} fontWeight={'bold'} textAlign={'center'}>{`Xin chào!`}</Text>
            <TextField placeholder="Số điện thoại" />
            <TextField placeholder="Mật khẩu" />
            <HStack justifyContent={'space-between'}>
                <Text color={'text.error'}>{`Ghi nhớ mật khẩu`}</Text>
                <Text>{`Quên mật khẩu?`}</Text>
            </HStack>
            <LoadingButton title={`đăng nhập`} onPress={onLogin} />
        </Box>
    );
};

const ChangePasswordForm = () => {
    const onPress = () => {
        navigation.navigate('StartSurveyPage');
    };
    return (
        <Box gap={'space-16'} mx={'space-16'} bg={'background.default'} p={'space-16'} py={'space-32'} borderRadius={'border-radius-8'}>
            <Text variant={'headline'} fontWeight={'bold'} textAlign={'center'}>{`Đổi mật khẩu`}</Text>
            <Text textAlign={'center'}>{`Vui lòng đổi mật khẩu cho lần\n đăng nhập đầu tiên`}</Text>
            <TextField placeholder="Mật khẩu mới" />
            <TextField placeholder="Xác nhận mật khẩu mới" />
            <LoadingButton title={`xác nhận`} onPress={onPress} />
        </Box>
    );
};

const Footer = () => {
    return (
        <Box alignItems={'center'} gap={'space-8'}>
            <Text textTransform={'uppercase'} color={'background.default'} variant={'body'}>{`hotline`}</Text>
            <Text variant={'title'} color={'background.default'} fontWeight={'bold'}>{`180055504`}</Text>
            <Text color={'background.default'}>{`Version: 1.0.0`}</Text>
        </Box>
    );
};
