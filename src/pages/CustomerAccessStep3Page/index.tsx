import React, { useEffect, useRef } from 'react';
import { Box, Container, HStack, Text } from '@/atoms';
import Header from '@/components/Header';
import { ScanQrCode, Square, SquareCheck, SquareCheckBig } from 'lucide-react-native';
import theme from '@/themes/light';
import navigation from '@/utils/navigation';
import LoadingButton from '@/components/LoadingButton';
import eventEmitter from '@/utils/event-emitter';
import { useController, useFieldArray, useForm } from 'react-hook-form';
import { useFocusEffect } from '@react-navigation/native';
import { refModal } from '@/components/Modal';
import useCheckCameraPermission from '@/hooks/useCheckCameraPermission';
import { createGlobalState, useUpdateEffect } from 'react-use';

interface IGlobalStep3 {
    index: null;
    serialCode: string | null;
    batchCode: string | null;
    image: null;
    mode: 'scanner' | 'manual';
}

const defaultVal: IGlobalStep3 = {
    index: null,
    serialCode: null,
    batchCode: null,
    image: null,
    mode: 'scanner'
};
export const useGlobalCustomerAccessStep3 = createGlobalState<IGlobalStep3>(defaultVal);
const CustomerAccessStep3Page = () => {
    const { requestCameraPermission, cameraPermission } = useCheckCameraPermission();
    const { control, handleSubmit, reset, watch, setValue, getValues } = useForm({
        defaultValues: {
            fields: [],
            isValid: true
        }
    });

    const [v, setValGlobalStep3] = useGlobalCustomerAccessStep3();

    useEffect(() => {
        setValGlobalStep3(defaultVal);
        setTimeout(() => {
            reset({ fields: dd as any, isValid: true });
        }, 400);
    }, []);

    useUpdateEffect(() => {
        console.log(v, 'hihh');

        if (v.serialCode) {
            //@ts-ignore
            setValue(`fields[${v.index}]`, { ...getValues(`fields[${v.index}]`), ..._.omit(v, 'index') });
        }
    }, [v]);

    const { fields } = useFieldArray({ control, name: 'fields' });

    const onSubmit = (d) => {
        console.log(d);
        refModal.current?.setToggle({
            type: 'success',
            title: 'Thành công',
            message: 'Bán hàng thành công.',
            onPress: () => {
                navigation.navigate('VerifyCustomerStep1Page');
            }
        });
    };

    return (
        <Container px={'space-16'} pb={'space-16'}>
            <Header title="Thông tin sản phẩm bán" />
            <Text variant={'subtitle'} mt={'space-16'}>{`Hình thức bán: 1 Gift box 555`}</Text>
            <ProductList data={fields} control={control} />
            <LoadingButton disabled={!watch('isValid')} title="Bán hàng" onPress={handleSubmit(onSubmit)} />
        </Container>
    );
};

export default CustomerAccessStep3Page;

const d = ['Sản phẩm', 'Serial code', 'Back-up'];
const dd = [
    { id: 2, product: '888 Signature', serialCode: null, backup: false, image: null, batchCode: null, mode: null },
    { id: 1, product: '555 Signature', serialCode: null, backup: false, image: null, batchCode: null, mode: null }
];
const ProductList = ({ data, control }) => {
    return (
        <Box flex={1}>
            <HStack py={'space-16'} borderBottomWidth={1} borderBottomColor={'border.default'}>
                {_.map(d, (t, idx) => (
                    <Box key={idx} flex={1} alignItems={'center'}>
                        <Text variant={'subtitle'}>{t}</Text>
                    </Box>
                ))}
            </HStack>

            <Box>
                {_.map(data, (t, idx) => (
                    <ProductItem key={idx} index={idx} name={t.product} control={control} />
                ))}
            </Box>
        </Box>
    );
};

const ProductItem = ({ index, name, control }) => {
    const { field: fieldQr } = useController({ control, name: `fields[${index}].serialCode` });
    const { field: fieldCheck, formState } = useController({ control, name: `fields[${index}].backup` });
    const IconBackup = fieldCheck.value ? SquareCheckBig : Square;
    const { requestCameraPermission, cameraPermission } = useCheckCameraPermission();
    const [_, setVal] = useGlobalCustomerAccessStep3();
    return (
        <HStack py={'space-16'}>
            <Box flex={1} alignItems={'center'}>
                <Text variant={'bodySemibold'}>{name}</Text>
            </Box>
            <Box flex={1} alignItems={'center'}>
                {Boolean(fieldQr.value) ? (
                    <Text variant={'bodySemibold'}>{fieldQr.value}</Text>
                ) : (
                    <ScanQrCode
                        onPress={() => {
                            if (cameraPermission !== 'granted') {
                                return requestCameraPermission();
                            }
                            navigation.navigate('CodeScannerPage');
                            //set index product
                            setVal({ ...defaultVal, index });
                        }}
                        color={theme.colors['warning.default']}
                    />
                )}
            </Box>
            <Box flex={1} alignItems={'center'}>
                <IconBackup color={theme.colors['primary.default']} onPress={() => fieldCheck.onChange(!fieldCheck.value)} />
            </Box>
        </HStack>
    );
};
