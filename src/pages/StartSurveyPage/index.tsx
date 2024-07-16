import { Box, Container, HStack, Text, TouchableOpacity } from '@/atoms';
import LoadingButton from '@/components/LoadingButton';
import { refModal } from '@/components/Modal';
import theme from '@/themes/light';
import navigation from '@/utils/navigation';
import { Header } from '@react-navigation/elements';
import { FlashList } from '@shopify/flash-list';
import { Circle, CircleDot, Square, SquareCheck } from 'lucide-react-native';
import React, { useState } from 'react';

const StartSurveyPage = () => {
    const onSubmit = () => {
        refModal.current?.setToggle({
            onPress() {
                refModal.current?.setVisible();
                navigation.reset('HomePage');
            },
            type: 'success',
            title: 'thành công',
            message: 'Bạn đã làm khảo sát đầu ca thành công'
        });
    };
    return (
        <Container p={'space-16'} pt={'space-0'}>
            <Header headerTitleAlign="center" title="Khảo sát đầu ca" />
            <Text variant={'subtitle'} fontWeight={'bold'}>{`Câu hỏi khảo sát:`}</Text>
            <DataList />
            <LoadingButton title="gửi kết quả khảo sát" onPress={onSubmit} />
        </Container>
    );
};

export default StartSurveyPage;

const DD = _.times(10).map((t, i) => ({
    q: `${i + 1}. ${faker.lorem.sentence(5)}`,
    a: _.times(4).map((t) => ({ id: faker.string.alpha(10), name: faker.lorem.sentence(2) })),
    t: i % 2 === 0 ? 'radio' : 'checkbox'
}));

const DataList = ({}) => {
    const renderItem = ({ item }) => <DataItem {...item} />;
    return (
        <FlashList
            contentContainerStyle={{ paddingVertical: 8 }}
            ItemSeparatorComponent={() => <Box my={'space-8'} />}
            data={DD}
            renderItem={renderItem}
            estimatedItemSize={1000}
        />
    );
};

const DataItem = (p) => {
    const [radioItem, setRadioItem] = useState({});
    const [checkboxItem, setCheckboxItem] = useState<any[]>([]);

    const handleTypeRadio = (item) => {
        setRadioItem((prev) => ({ [item.id]: item }));
    };
    const handleTypeCheckbox = (item) => {
        const find = _.find(checkboxItem, (t) => t.id === item.id);
        if (find) {
            const filter = _.filter(checkboxItem, (t) => t.id !== item.id);
            setCheckboxItem(filter);
        } else {
            setCheckboxItem((prev) => [...prev, item]);
        }
    };
    const handleType = ({ type, item }) => {
        if (type === 'radio') {
            return handleTypeRadio(item);
        }
        if (type === 'checkbox') {
            return handleTypeCheckbox(item);
        }
    };

    return (
        <Box gap={'space-8'}>
            <Text fontWeight={'bold'} variant={'bodySemibold'}>
                {`${p.q}*`}
            </Text>
            {_.map(p.a, (item) => {
                return (
                    <AnswerItem
                        activeRadio={item.id === radioItem[item.id]?.id}
                        activeCheckbox={_.find(checkboxItem, (t) => t.id === item.id)}
                        key={item.id}
                        data={p}
                        p={item}
                        onPress={() => handleType({ type: p.t, item })}
                    />
                );
            })}
        </Box>
    );
};

const AnswerItem = ({ data, p, onPress, activeRadio, activeCheckbox }) => {
    const IconRadio = activeRadio ? CircleDot : Circle;
    const IconCheck = activeCheckbox ? SquareCheck : Square;

    return (
        <TouchableOpacity onPress={onPress}>
            <HStack gap={'space-4'}>
                {data.t === 'radio' ? (
                    <IconRadio color={theme.colors['primary.default']} />
                ) : (
                    <IconCheck color={theme.colors['primary.default']} />
                )}
                <Text>{p.name}</Text>
            </HStack>
        </TouchableOpacity>
    );
};
