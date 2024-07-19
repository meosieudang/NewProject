import { Box, Container } from '@/atoms';
import Header from '@/components/Header';
import LoadingButton from '@/components/LoadingButton';
import { refModal } from '@/components/Modal';
import SurveyList from '@/components/SurveyList';
import navigation from '@/utils/navigation';
import React from 'react';
import { StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const StartSurveyPage = () => {
    const onSubmit = () => {
        refModal.current?.setToggle({
            onPress() {
                navigation.reset('HomePage');
            },
            type: 'success',
            title: 'thành công',
            message: 'Bạn đã làm khảo sát đầu ca thành công'
        });
    };
    return (
        <Container p={'space-16'} pt={'space-0'}>
            <Header useHeaderLeft={false} title="Khảo sát đầu ca" />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} enableOnAndroid>
                <Box flex={1} mt={'space-16'}>
                    <SurveyList data={DD} />
                </Box>
            </KeyboardAwareScrollView>
            <LoadingButton title="gửi kết quả khảo sát" onPress={onSubmit} />
        </Container>
    );
};

export default StartSurveyPage;

const DD = _.times(10).map((t, i) => ({
    q: `${i + 1}. ${faker.lorem.paragraph(2)}`,
    a: _.times(4).map((t) => ({ id: faker.string.alpha(10), name: faker.lorem.sentence(2) })),
    t: i % 2 === 0 ? 'radio' : 'checkbox'
}));
