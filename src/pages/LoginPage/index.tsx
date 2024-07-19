import { useGlobalAppContainer } from '@/AppContainer';
import { bgApp } from '@/assets';
import { Box, Container, HStack, Text } from '@/atoms';
import LoadingButton from '@/components/LoadingButton';
import { refModal } from '@/components/Modal';
import RadioItem from '@/components/RadioItem';
import TextField from '@/components/TextField';
import navigation from '@/utils/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';
import { ImageBackground, StatusBar, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Animated, { FadeInRight, FadeOutLeft, FadeOutRight, SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import { createGlobalState, useToggle } from 'react-use';
import * as yup from 'yup';

const LoginPage = () => {
    useEffect(() => {
        // toast.success('Hello', { duration: 2000 });
        // toast.success('Hello', { duration: 4000 });
    }, []);
    const [{ token, firstChangePassword }, setValue] = useGlobalAppContainer();

    return (
        <Container>
            <ImageBackground source={bgApp} style={StyleSheet.absoluteFill} />
            <StatusBar backgroundColor="transparent" translucent={true} />
            <Box flex={1} />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} enableOnAndroid>
                <Box flex={1} justifyContent={'center'} g={'space-16'}>
                    <Text textAlign={'center'} variant="headline" color={'background.default'}>{`BAT Application`}</Text>

                    {token && !firstChangePassword ? <ChangePasswordForm /> : <LoginForm />}
                    <Footer />
                </Box>
            </KeyboardAwareScrollView>
        </Container>
    );
};

export default LoginPage;

const loginSchema = yup.object({
    phone: yup.string().required(),
    password: yup.string().required()
});
const LoginForm = () => {
    const [value, setValue] = useGlobalAppContainer();

    const onLogin = (d) => {
        setValue({ ...d, token: faker.finance.ethereumAddress(), firstChangePassword: false });
        // refModal.current?.setToggle({ type: 'error', title: 'Thất bại', message: 'Bạn không thuộc Campaign nào!' });
    };
    const [toggle, setToggle] = useToggle(false);

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            phone: '0987654321',
            password: 'qwq12121'
        },
        resolver: yupResolver(loginSchema)
    });
    const { field: fieldPhone } = useController({ control, name: 'phone' });
    const { field: fieldPass } = useController({ control, name: 'password' });
    return (
        <Animated.View exiting={FadeOutLeft}>
            <Box gap={'space-16'} mx={'space-16'} bg={'background.default'} p={'space-16'} py={'space-32'} borderRadius={'border-radius-8'}>
                <Text variant={'headline'} textAlign={'center'}>{`Xin chào!`}</Text>
                <TextField
                    keyboardType="phone-pad"
                    value={fieldPhone.value}
                    onChangeText={fieldPhone.onChange}
                    title="Số điện thoại"
                    placeholder="Số điện thoại"
                    error={errors['phone']?.message}
                />
                <TextField
                    error={errors['password']?.message}
                    value={fieldPass.value}
                    onChangeText={fieldPass.onChange}
                    title="Mật khẩu"
                    placeholder="Mật khẩu"
                />
                <HStack justifyContent={'space-between'}>
                    <RadioItem onPress={setToggle} active={toggle} name="Ghi nhớ mật khẩu" size={16} />
                    <Text>{`Quên mật khẩu?`}</Text>
                </HStack>
                <LoadingButton title={`đăng nhập`} onPress={handleSubmit(onLogin)} />
            </Box>
        </Animated.View>
    );
};

const changePassSchema = yup.object({
    password: yup.string().required(),
    confirmPassword: yup.string().required()
});
const ChangePasswordForm = () => {
    const [v, setValue] = useGlobalAppContainer();

    const onPress = (d: { password: string | null; confirmPassword: string }) => {
        setValue({ ...v, password: d.password, firstChangePassword: true });
    };

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            password: 'qqqqqq',
            confirmPassword: 'qqqqqq'
        },
        resolver: yupResolver(changePassSchema)
    });
    const { field: fieldPass } = useController({ control, name: 'password' });
    const { field: fieldConfirm } = useController({ control, name: 'confirmPassword' });
    return (
        <Animated.View entering={FadeInRight}>
            <Box gap={'space-16'} mx={'space-16'} bg={'background.default'} p={'space-16'} py={'space-32'} borderRadius={'border-radius-8'}>
                <Text variant={'headline'} textAlign={'center'}>{`Đổi mật khẩu`}</Text>
                <Text textAlign={'center'}>{`Vui lòng đổi mật khẩu cho lần\n đăng nhập đầu tiên`}</Text>
                <TextField value={fieldPass.value} onChangeText={fieldPass.onChange} placeholder="Mật khẩu mới" />
                <TextField value={fieldConfirm.value} onChangeText={fieldConfirm.onChange} placeholder="Xác nhận mật khẩu mới" />
                <LoadingButton title={`xác nhận`} onPress={handleSubmit(onPress)} />
            </Box>
        </Animated.View>
    );
};

const Footer = () => {
    return (
        <Box alignItems={'center'} gap={'space-8'}>
            <Text textTransform={'uppercase'} color={'background.default'} variant={'body'}>{`hotline`}</Text>
            <Text variant={'title'} color={'background.default'}>{`180055504`}</Text>
            <Text color={'background.default'}>{`Version: 1.0.0`}</Text>
        </Box>
    );
};
