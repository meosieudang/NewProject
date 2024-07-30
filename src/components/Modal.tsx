import { Box, Text, Image, HStack } from '@/atoms';
import React, { useImperativeHandle, useState } from 'react';
import RNModal from 'react-native-modal';
import { useToggle } from 'react-use';
import LoadingButton from './LoadingButton';
import { close, warning, check } from '@/assets';
import { FONTS } from '@/constants';
import { InteractionManager } from 'react-native';
type P = {
    title?: string;
    message?: string;
    type: 'error' | 'success' | 'warning';
    onPress?: () => void;
    isConfirm?: boolean;
    confirmText?: string;
};
export const refModal = React.createRef<{
    setVisible: () => void;
    setToggle: ({ type, title, message, onPress, confirmText, isConfirm }: P) => void;
}>();
const Modal = () => {
    const [toggle, setToggle] = useToggle(false);
    const [options, setOptions] = useState<P>({
        confirmText: '',
        isConfirm: false,
        title: 'Title',
        message: 'message',
        type: 'success',
        onPress: undefined
    });
    const icon = options.type === 'error' ? close : options.type === 'warning' ? warning : check;
    useImperativeHandle(refModal, () => ({
        setToggle: ({ type = 'success', title = 'Thông báo', message = '', onPress, confirmText = 'OK', isConfirm = false }: P) => {
            InteractionManager.runAfterInteractions(() => {
                setToggle();
                setOptions({ type, title, message, onPress, isConfirm, confirmText });
            });
        },
        setVisible: setToggle
    }));

    const _onPress = () => {
        setToggle(false);
        setTimeout(() => {
            if (options.onPress) {
                options.onPress();
            }
        }, 400);
    };
    return (
        <RNModal backdropTransitionOutTiming={0} hideModalContentWhileAnimating useNativeDriver isVisible={toggle}>
            <Box gap={'space-16'} bg={'background.default'} p={'space-16'} py={'space-24'} borderRadius={'border-radius-30'}>
                <Box alignItems={'center'} gap={'space-16'}>
                    <Image width={100} height={100} resizeMode="contain" source={icon} />
                    <Text textTransform={'capitalize'} variant={'title'}>
                        {options.title}
                    </Text>
                    <Text variant={'subtitle'} fontFamily={FONTS.QUICKSAND_MEDIUM} textAlign={'center'}>
                        {options.message}
                    </Text>
                </Box>
                <HStack gap={'space-8'}>
                    <Box flex={1}>
                        <LoadingButton
                            title={Boolean(options.confirmText) ? options.confirmText : 'Ok'}
                            onPress={Boolean(options.onPress) ? _onPress : setToggle}
                        />
                    </Box>
                    {options.isConfirm && (
                        <Box flex={1}>
                            <LoadingButton outline title="Hủy" onPress={setToggle} />
                        </Box>
                    )}
                </HStack>
            </Box>
        </RNModal>
    );
};

export default Modal;
