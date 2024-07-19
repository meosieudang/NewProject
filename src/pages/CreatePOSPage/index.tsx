import { Box, Container, HStack, Text } from '@/atoms';
import Header from '@/components/Header';
import LoadingButton from '@/components/LoadingButton';
import { refModal } from '@/components/Modal';
import Select from '@/components/Select';
import SurveyList from '@/components/SurveyList';
import TextField from '@/components/TextField';
import eventEmitter from '@/utils/event-emitter';
import navigation from '@/utils/navigation';
import React, { useEffect } from 'react';
import { useController, useFieldArray, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const CreatePOSPage = () => {
    const { control, handleSubmit, reset, watch, setValue } = useForm({
        defaultValues: {
            stores: dd,
            surveys: ddd,
            image: null
        }
    });
    const onSubmit = (d) => {
        console.log(d, 'data');
        navigation.navigate('CameraPage');
    };

    useEffect(() => {
        eventEmitter.addListener('TAKE_PHOTO', (d) => {
            refModal.current?.setToggle({
                type: 'success',
                title: 'Thành công',
                message: `Tạo điểm bán thành công.`,
                onPress: () => {
                    navigation.pop(2);
                    // handleTakePhotoSuccess(d?.uri);
                }
            });
        });
        return () => {
            eventEmitter.removeAllListeners('TAKE_PHOTO');
        };
    }, []);

    const { fields } = useFieldArray({ control, name: 'surveys' });

    return (
        <Container px={'space-16'} pb="space-16">
            <Header title="Tạo điểm bán mới" />
            <KeyboardAwareScrollView enableAutomaticScroll={false} showsVerticalScrollIndicator={false} enableOnAndroid>
                <Box flex={1} my={'space-16'} g={'space-16'}>
                    <StoreList control={control} />
                    <SurveyList data={fields} />
                </Box>
            </KeyboardAwareScrollView>
            <LoadingButton title="Tiếp tục" onPress={handleSubmit(onSubmit)} />
        </Container>
    );
};

export default CreatePOSPage;

const dd = [
    { shopName: null, type: 'text', display: 'Tên điểm bán', key: 'shopName' },
    { ownerShop: null, type: 'text', display: 'Tên chủ điểm bán', key: 'ownerShop' },
    { phoneShop: null, type: 'text', display: 'số điện thoại', key: 'phoneShop' },
    { typeShop: null, type: 'select', display: 'loại hình', key: 'typeShop' },
    { numberOfHome: null, type: 'text', display: 'số nhà', key: 'numberOfHome' },
    { street: null, type: 'text', display: 'tên đường', key: 'street' },
    { ward: null, type: 'text', display: 'phường/xã', key: 'ward' },
    { district: null, type: 'select', display: 'quận/huyện', key: 'district' },
    { city: null, type: 'select', display: 'tỉnh/TP', key: 'city' }
];

const StoreList = ({ control }) => {
    const { fields } = useFieldArray({ control, name: 'stores' });

    return (
        <>
            <Text variant={'subtitle'}>{`Thông tin cơ bản`}</Text>
            <Box g={'space-16'}>
                {_.map(fields, (t: any, idx) => {
                    return <StoreItem type={t.type} title={t.display} key={idx} index={idx} control={control} />;
                })}
            </Box>
        </>
    );
};
const StoreItem = ({ type, title, index, control }) => {
    const { field } = useController({ name: `stores[${index}].data`, control });
    return (
        <Box flex={1}>
            {type === 'text' && (
                <TextField placeholder={`Nhập ${title}`} title={_.capitalize(title)} value={field.value} onChangeText={field.onChange} />
            )}
            {type === 'select' && <Select onPress={() => {}} title={_.capitalize(title)} />}
        </Box>
    );
};
const ddd = _.times(8).map((t, i) => ({
    q: `${i + 1}. ${faker.lorem.sentence(5)}`,
    a: _.times(4).map((t) => ({ id: faker.string.alpha(10), name: faker.lorem.sentence(2) })),
    t: i % 2 === 0 ? 'radio' : 'checkbox'
}));
