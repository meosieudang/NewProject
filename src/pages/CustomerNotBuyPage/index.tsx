import { Box, Container, Text, TouchableOpacity } from '@/atoms';
import Header from '@/components/Header';
import LoadingButton from '@/components/LoadingButton';
import theme from '@/themes/light';
import navigation from '@/utils/navigation';
import { FlashList } from '@shopify/flash-list';
import { Square, SquareCheckBig } from 'lucide-react-native';
import React from 'react';
import { useList } from 'react-use';

const CustomerNotBuyPage = () => {
    return (
        <Container px={'space-16'} pb={'space-16'}>
            <Header title="Lý do khách không mua hàng" />
            <Box flex={1} mt={'space-16'}>
                <Text variant={'subtitle'} mb={'space-16'}>{`Câu hỏi khảo sát`}</Text>
                <QuestionList />
            </Box>
            <LoadingButton title="Xác nhận" onPress={() => navigation.pop(3)} />
        </Container>
    );
};

export default CustomerNotBuyPage;

const dd = [
    {
        id: 1,
        q: 'Lý do khách không mua',
        a: [
            { id: 1, name: 'Mức giá không hợp lí' },
            { id: 2, name: 'Tôi quen với sản phẩm hiện tại và không có nhu cầu thay đổi' },
            { id: 3, name: 'Lí do khác' }
        ]
    }
];
const QuestionList = () => {
    const renderItem = ({ item, index }) => <QuestionItem {...item} index={index} />;
    return <FlashList renderItem={renderItem} data={dd} estimatedItemSize={100} />;
};

const QuestionItem = ({ a, q, index }) => {
    const [list, { set, filter, push }] = useList<any>([]);
    const handlePress = (item: any) => {
        const find = _.find(list, (t) => t.id === item.id);

        if (!find) {
            push(item);
        } else {
            filter((t) => t.id !== item.id);
        }
    };
    console.log(list);

    return (
        <Box g={'space-8'}>
            <Text variant={'bodySemibold'}>{`${index + 1}.${q}`}</Text>
            <Box g={'space-12'}>
                {_.map(a, (t) => (
                    <AnswerItem active={_.find(list, (_t) => _t.id === t.id)} key={t.id} {...t} onPress={() => handlePress(t)} />
                ))}
            </Box>
        </Box>
    );
};

const AnswerItem = ({ name, onPress, active }) => {
    const IconCheck = active ? SquareCheckBig : Square;

    return (
        <TouchableOpacity onPress={onPress} flexDirection={'row'} alignItems={'center'} g={'space-8'}>
            <IconCheck color={theme.colors['primary.default']} />
            <Box flex={1}>
                <Text>{name}</Text>
            </Box>
        </TouchableOpacity>
    );
};
