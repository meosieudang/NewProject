import React, { useEffect, useState } from 'react';
import { Box, Container, HStack, Text, TouchableOpacity } from '@/atoms';
import Header from '@/components/Header';
import LoadingButton from '@/components/LoadingButton';
import navigation from '@/utils/navigation';
import TextField from '@/components/TextField';
import RadioItem from '@/components/RadioItem';
import { Controller, useController, useFieldArray, useForm } from 'react-hook-form';
import useInput from '@/hooks/useInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { refModal } from '@/components/Modal';

const CheckInventoryPage = () => {
    const { control, handleSubmit, reset, watch, setValue } = useForm({
        defaultValues: {
            fields: [{}],
            checks: [{}]
        }
    });
    useEffect(() => {
        setTimeout(() => {
            reset({ fields: dd, checks: d2 });
        }, 400);
    }, []);

    const { fields } = useFieldArray({ control, name: 'fields' });
    const { fields: checksFields, update } = useFieldArray({ control, name: 'checks' });

    const onSubmit = (data) => {
        console.log(data);
        refModal.current?.setToggle({ type: 'success', title: 'Thành công', message: 'Xác nhận tồn kho thành công', onPress: handlePress });
    };

    const handlePress = () => {
        refModal.current?.setVisible();
        setTimeout(() => {
            navigation.back();
        }, 500);
    };
    return (
        <Container px={'space-16'}>
            <Header title="Kiểm tra tồn kho" />
            <Text>{`Vui lòng kiểm tra hàng tồn kho.`}</Text>
            <Text>{`Nhập 0 nếu không xác định được số lượng.`}</Text>

            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} enableOnAndroid>
                <Box flex={1} my={'space-8'}>
                    <HStack>
                        {_.map(['Tên sản phẩm', 'Số lượng', 'Giá tiền'], (t, idx) => (
                            <Box key={idx} flex={1}>
                                <Text variant={'subtitle'} textAlign={'center'}>
                                    {t}
                                </Text>
                            </Box>
                        ))}
                    </HStack>
                    <Box gap={'space-8'} mt={'space-8'}>
                        {_.map(fields, (t, index) => (
                            <ProductItem key={t.id} item={t} index={index} control={control} />
                        ))}
                    </Box>
                    <Box mt={'space-8'}>
                        <Text color={'text.error'} variant={'caption'}>{`Dữ liệu sẽ được đối chiếu với DSR`}</Text>
                        <Text mb={'space-8'} mt={'space-16'} variant={'subtitle'}>{`Cách thức kiểm tra tồn kho`}</Text>
                        <Box gap={'space-8'}>
                            {_.map(checksFields, (t: any, index) => (
                                <CheckerItem
                                    setValue={setValue}
                                    selected={t.selected}
                                    name={t.name}
                                    watch={watch}
                                    key={t.id}
                                    index={index}
                                />
                            ))}
                        </Box>
                    </Box>
                </Box>
            </KeyboardAwareScrollView>
            <Box gap={'space-8'} pb={'space-16'}>
                <LoadingButton title="xác nhận tồn kho" onPress={handleSubmit(onSubmit)} />
                <LoadingButton outline title="quay lại" onPress={navigation.back} />
            </Box>
        </Container>
    );
};

export default CheckInventoryPage;

const CheckerItem = ({ index, watch, name, setValue, selected }) => {
    const selectedRadio = watch('checks');

    const handleRadioChange = (index) => {
        const newItems = selectedRadio.map((item, idx) => ({
            ...item,
            selected: idx === index
        }));
        setValue('checks', newItems);
    };
    return <RadioItem active={selected} name={name} onPress={() => handleRadioChange(index)} />;
};

const ProductItem = ({ item, index, control }) => {
    const { field: fieldQuantity } = useController({ control, name: `fields[${index}].quantity` });
    const { field: fieldPrice } = useController({ control, name: `fields[${index}].price` });
    const removeLeadingZeros = (str) => {
        if (str === '') {
            return '0';
        }
        const num = parseInt(str, 10);
        return isNaN(num) ? '' : String(num);
    };
    return (
        <Box>
            <HStack gap={'space-8'}>
                <Box flex={1}>
                    <Text>{item.name}</Text>
                </Box>
                <Box flex={1}>
                    <TextField
                        maxLength={4}
                        numberOfLines={1}
                        multiline
                        textAlign="center"
                        value={String(fieldQuantity.value).replace(/[^0-9]/g, '')}
                        onChangeText={(text) => fieldQuantity.onChange(removeLeadingZeros(text))}
                        keyboardType="numeric"
                        placeholder="SL"
                    />
                </Box>
                <Box flex={1}>
                    <TextField
                        maxLength={10}
                        multiline
                        textAlign="center"
                        value={String(fieldPrice.value)}
                        onChangeText={(text) => fieldPrice.onChange(removeLeadingZeros(text))}
                        keyboardType="numeric"
                        placeholder="GT"
                    />
                </Box>
            </HStack>
        </Box>
    );
};

const d2 = [
    { id: 1, name: 'PST kiểm tra thực tế', selected: true },
    { id: 2, name: 'Quán thông báo', selected: false }
];

const dd = _.times(5).map((t) => ({
    id: faker.string.alpha(5),
    name: faker.commerce.productName(),
    quantity: 0,
    price: 0
}));
