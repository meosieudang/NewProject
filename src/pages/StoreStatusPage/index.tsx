import { Box, Container, HStack, Text } from '@/atoms';
import Header from '@/components/Header';
import LoadingImage from '@/components/LoadingImage';
import LoadingButton from '@/components/LoadingButton';
import { refModal } from '@/components/Modal';
import SurveyList from '@/components/SurveyList';
import { FONTS } from '@/constants';
import navigation from '@/utils/navigation';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm } from 'react-hook-form';

const StoreStatusPage = () => {
    const onSubmit = () => {
        refModal.current?.setToggle({
            onPress() {
                navigation.back();
            },
            type: 'success',
            title: 'thành công',
            message: 'Bạn đã làm khảo sát thành công'
        });
    };
    const { control } = useForm({});

    return (
        <Container px={'space-16'} pb={'space-16'}>
            <Header title="Tình trạng cửa hàng" />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} enableOnAndroid>
                <Box flex={1} mt={'space-16'}>
                    <StoreInfo />
                    <Box borderWidth={1} borderColor={'border.default'} my={'space-16'} />
                    <SurveyList data={DD} control={control} />
                </Box>
            </KeyboardAwareScrollView>
            <LoadingButton title="Hoàn thành" onPress={onSubmit} />
        </Container>
    );
};

export default StoreStatusPage;

const StoreInfo = () => {
    return (
        <Box g={'space-4'}>
            <Text variant={'subtitle'} mb={'space-4'}>{`Thông tin cửa hàng`}</Text>
            <LoadingImage path={faker.image.urlLoremFlickr({ category: 'business' })} />
            <HStack g={'space-4'}>
                <Text>{`Tên cửa hàng:`}</Text>
                <Text variant={'bodySemibold'} fontFamily={FONTS.QUICKSAND_BOLD}>
                    {faker.location.city()}
                </Text>
            </HStack>
            <HStack g={'space-4'}>
                <Text>{`Địa chỉ:`}</Text>
                <Text variant={'bodySemibold'} fontFamily={FONTS.QUICKSAND_BOLD}>
                    {faker.location.streetAddress(true)}
                </Text>
            </HStack>
        </Box>
    );
};

const DD = _.times(12).map((t, i) => ({
    q: `${i + 1}. ${faker.lorem.sentence(5)}`,
    a: _.times(_.random(4, 9)).map((t) => ({ id: faker.string.alpha(10), name: faker.lorem.sentence(2) })),
    t: _.includes([0, 1, 2], i) ? 'text' : _.includes([9], i) ? 'text_array' : i % 2 === 0 ? 'radio' : 'checkbox'
}));
