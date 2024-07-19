import { Box, Container, HStack, Pressable, Text, TouchableOpacity } from '@/atoms';
import BottomSheetList from '@/components/BottomSheetList';
import Header from '@/components/Header';
import LoadingButton from '@/components/LoadingButton';
import { SCREEN_WIDTH } from '@/constants';
import theme from '@/themes/light';
import navigation from '@/utils/navigation';
import { ChevronDown } from 'lucide-react-native';
import React, { useCallback, useRef, useState } from 'react';
import { useController, useForm } from 'react-hook-form';

const CustomerAccessStep1Page = () => {
    const { control, handleSubmit, reset, watch, setValue } = useForm({
        defaultValues: {
            product: '',
            age: '18 - 23',
            gender: 'Nam'
        }
    });
    const ref = useRef<BottomSheetList>(null);
    const { field: fieldProduct, formState } = useController({ control, name: 'product' });

    const onPressItem = useCallback((data) => {
        fieldProduct.onChange(data.name);
        ref.current?.hide();
    }, []);
    return (
        <Container px={'space-16'}>
            <Header title="Tiếp cận khách hàng" />
            <Box flex={1} gap={'space-16'} mt={'space-16'}>
                <Select name={fieldProduct.value} onPress={() => ref.current?.show([])} />
                <AgeSelect />
                <GenderSelect />
            </Box>

            <Box gap={'space-8'} pb={'space-16'}>
                <LoadingButton title="Tiếp tục" onPress={() => navigation.navigate('CustomerAccessStep2Page')} />
                <LoadingButton title="Quay lại" onPress={navigation.back} outline />
            </Box>
            <BottomSheetList ref={ref} onPressItem={onPressItem} />
        </Container>
    );
};

export default CustomerAccessStep1Page;

const Select = ({ onPress, title = 'Sản phẩm đang sử dụng', name = 'Saigon 555' }) => {
    return (
        <Box gap={'space-8'}>
            <Text variant={'subtitle'}>{title}</Text>
            <TouchableOpacity
                onPress={onPress}
                borderRadius={'border-radius-4'}
                px={'space-8'}
                bg={'background.alternativeHover'}
                height={50}
                flexDirection={'row'}
                alignItems={'center'}
            >
                <Box flex={1}>
                    <Text>{name}</Text>
                </Box>
                <ChevronDown color={theme.colors['primary.default']} />
            </TouchableOpacity>
        </Box>
    );
};

const genders = [
    { id: 1, name: 'Nam' },
    { id: 2, name: 'Nữ' },
    { id: 3, name: '' }
];
const GenderSelect = ({}) => {
    const [state, setState] = useState({});

    const handlePressGender = useCallback((t, idx) => {
        setState({ [idx]: t });
    }, []);
    return (
        <Box gap={'space-8'}>
            <Text variant={'subtitle'}>{'Giới tính'}</Text>
            <HStack flexWrap={'wrap'} gap={'space-16'} justifyContent={'center'}>
                {_.map(genders, (t, idx) =>
                    t.id === 3 ? (
                        <Box key={t.id} width={SCREEN_WIDTH / 3 - 32} />
                    ) : (
                        <Pressable
                            key={t.id}
                            alignItems={'center'}
                            width={SCREEN_WIDTH / 3 - 32}
                            borderRadius={'border-radius-8'}
                            backgroundColor={state[idx] === t.name ? 'primary.default' : 'error.alternative'}
                            p={'space-16'}
                            onPress={() => handlePressGender(t.name, idx)}
                        >
                            <Text color={state[idx] === t.name ? 'background.default' : 'text.default'}>{t.name}</Text>
                        </Pressable>
                    )
                )}
            </HStack>
        </Box>
    );
};

const ages = ['18 - 23', '24 - 29', '30 -34', '35 - 39', '40 - 44', 'Trên 45'];
const AgeSelect = ({}) => {
    const [state, setState] = useState({});
    const handlePressAge = useCallback((t, idx) => {
        setState({ [idx]: t });
    }, []);
    return (
        <Box gap={'space-8'}>
            <Text variant={'subtitle'}>{'Độ tuổi'}</Text>
            <HStack flexWrap={'wrap'} gap={'space-16'} justifyContent={'center'}>
                {_.map(ages, (t, idx) => (
                    <Pressable
                        key={idx}
                        alignItems={'center'}
                        width={SCREEN_WIDTH / 3 - 32}
                        borderRadius={'border-radius-8'}
                        backgroundColor={state[idx] === t ? 'primary.default' : 'error.alternative'}
                        p={'space-16'}
                        onPress={() => handlePressAge(t, idx)}
                    >
                        <Text color={state[idx] === t ? 'background.default' : 'text.default'}>{t}</Text>
                    </Pressable>
                ))}
            </HStack>
        </Box>
    );
};
