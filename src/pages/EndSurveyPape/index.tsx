import { Box, Container } from '@/atoms';
import Header from '@/components/Header';
import LoadingButton from '@/components/LoadingButton';
import { refModal } from '@/components/Modal';
import SurveyList from '@/components/SurveyList';
import navigation from '@/utils/navigation';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const EndSurveyPage = () => {
    const onSubmit = () => {
        refModal.current?.setToggle({
            onPress() {
                navigation.pop(2);
            },
            type: 'success',
            title: 'thành công',
            message: 'Bạn đã làm khảo sát thành công'
        });
    };
    return (
        <Container p={'space-16'} pt={'space-0'}>
            <Header title="Khảo sát cuối ca" />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} enableOnAndroid>
                <Box flex={1} mt={'space-16'}>
                    <SurveyList data={DD} />
                </Box>
            </KeyboardAwareScrollView>
            <LoadingButton title="Hoàn thành" onPress={onSubmit} />
        </Container>
    );
};

export default EndSurveyPage;

const DD = _.times(1).map((t, i) => ({
    q: `${i + 1}. ${faker.lorem.sentence(5)}`,
    a: _.times(4).map((t) => ({ id: faker.string.alpha(10), name: faker.lorem.sentence(2) })),
    t: i % 2 === 0 ? 'radio' : 'checkbox'
}));
