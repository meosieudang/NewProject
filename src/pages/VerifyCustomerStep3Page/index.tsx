import { Box, Container, HStack, Text, TextInput, TouchableOpacity } from '@/atoms';
import Header from '@/components/Header';
import SegmentedInput from '@/components/SegmentedInput';
import useCountDown from '@/hooks/useCountDown';
import navigation from '@/utils/navigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { Dispatch, useEffect, useRef, useState } from 'react';
import { BackHandler, Dimensions, Keyboard, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type ParamList = {
    Data: {
        fullName: string;
        phoneNumber: string;
    };
};
const VerifyCustomerStep3Page = () => {
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
    //         return false;
    //     };

    //     const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    //     return () => backHandler.remove();
    // }, []);
    const [timeLeft, { start, reset }] = useCountDown(30000);
    const onPressLater = () => {
        reset();
        navigation.navigate('VerifyCustomerStep4Page', { ...params });
    };

    const onChangeCode = (code) => {
        if (_.size(code.trim()) === 6) {
            Keyboard.dismiss();
            setTimeout(() => {
                onPressLater();
            }, 1000);
        }
    };
    return (
        <Container px={'space-16'} pb={'space-16'}>
            <Header title="Nhập mã xác minh" useHeaderLeft={false} />
            <Box mt={'space-16'} />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} enableOnAndroid>
                <Box alignItems={'center'} g={'space-16'} flex={1}>
                    <Text variant={'bodySemibold'}>{`Mã xác minh đã được gửi đến số điện thoại`}</Text>
                    <Text color={'primary.default'} variant={'headline'}>
                        {params?.phoneNumber ?? null}
                    </Text>
                    <SegmentedInput onChange={onChangeCode} length={6} />
                    <Text>{`Bạn không nhận được mã xác minh?`}</Text>
                    {Boolean(timeLeft) ? (
                        <Text variant={'subtitle'}>{`Gửi lại sau: ${_.toNumber(timeLeft) / 1000}s`}</Text>
                    ) : (
                        <TouchableOpacity onPress={() => start()}>
                            <Text variant={'subtitle'}>{`Gửi lại mã`}</Text>
                        </TouchableOpacity>
                    )}

                    <Text>{`hoặc`}</Text>
                    <Text
                        onPress={onPressLater}
                        variant={'subtitle'}
                        color={'primary.default'}
                        textDecorationLine={'underline'}
                    >{`Nhập mã sau`}</Text>
                </Box>
            </KeyboardAwareScrollView>
        </Container>
    );
};

export default VerifyCustomerStep3Page;
