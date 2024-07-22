import { Box, Container, HStack, Text } from '@/atoms';
import Header from '@/components/Header';
import LoadingButton from '@/components/LoadingButton';
import { refModal } from '@/components/Modal';
import { FONTS } from '@/constants';
import theme from '@/themes/light';
import navigation from '@/utils/navigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { BadgeCheck, BadgeMinus, Check } from 'lucide-react-native';
import React from 'react';

type ParamList = {
    Data: {
        data: any[];
    };
};
const ResultSurveyPage = () => {
    const { params } = useRoute<RouteProp<ParamList, 'Data'>>();
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
    const renderItem = ({ item }) => <Item {...item} />;
    return (
        <Container p={'space-16'} pt={'space-0'}>
            <Header title="Xem kết quả khảo sát" />
            <Box flex={1}>
                <FlashList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: 8 }}
                    ItemSeparatorComponent={() => <Box my={'space-8'} />}
                    data={params?.data ?? []}
                    renderItem={renderItem}
                    estimatedItemSize={100}
                />
            </Box>
            <LoadingButton title="gửi kết quả khảo sát" onPress={onSubmit} />
        </Container>
    );
};

export default ResultSurveyPage;

const Item = (p) => {
    return (
        <Box gap={'space-8'}>
            <Text variant={'subtitle'} fontFamily={FONTS.QUICKSAND_BOLD}>{`${p.q}*`}</Text>
            {_.map(p.a, (t) => (
                <AnswerItem key={t.id} name={t.name} id={t.id} results={p.results} resultsClient={p.resultsClient} />
            ))}
        </Box>
    );
};

const AnswerItem = (p) => {
    const { id, name, resultsClient, results } = p;

    const hasMatchClientResults = _.includes(resultsClient, id);
    const isCorrect = _.includes(results, id);

    const badgeColor = hasMatchClientResults ? (isCorrect ? theme.colors['success.default'] : theme.colors['error.default']) : null;
    const Icon = isCorrect ? BadgeCheck : BadgeMinus;
    return (
        <HStack
            borderWidth={1}
            borderColor={'border.default'}
            p={'space-8'}
            borderRadius={'border-radius-16'}
            bg={'background.default'}
            justifyContent={'space-between'}
            alignItems={'center'}
        >
            <Text>{name}</Text>
            {badgeColor && <Icon color={badgeColor} />}
        </HStack>
    );
};
