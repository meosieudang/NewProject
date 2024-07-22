import { Box, HStack, Text, TouchableOpacity } from '@/atoms';
import theme from '@/themes/light';
import { FlashList } from '@shopify/flash-list';
import { Circle, CircleDot, Square, SquareCheckBig } from 'lucide-react-native';
import React, { useState } from 'react';
import TextField from './TextField';
import { FONTS } from '@/constants';
import { useController } from 'react-hook-form';

const SurveyList = ({ data, control }) => {
    const renderItem = ({ item, index }) => <DataItem {...item} index={index} control={control} />;

    return (
        <Box flex={1}>
            <Text variant={'subtitle'}>{`Câu hỏi khảo sát:`}</Text>
            <FlashList
                contentContainerStyle={{ paddingVertical: 8 }}
                ItemSeparatorComponent={() => <Box my={'space-8'} />}
                data={data}
                renderItem={renderItem}
                estimatedItemSize={100}
            />
        </Box>
    );
};

export default SurveyList;

const DataItem = (p) => {
    const [radioItem, setRadioItem] = useState({});
    const [checkboxItem, setCheckboxItem] = useState<any[]>([]);
    const { field } = useController({ control: p.control, name: `data[${p.index}].resultsClient` });

    const handleTypeRadio = (item, index) => {
        setRadioItem((prev) => ({ [item.id]: item }));
        field.onChange([item.id]);
    };
    const handleTypeCheckbox = (item, index) => {
        const find = _.find(checkboxItem, (t) => t.id === item.id);
        let newItems;
        if (find) {
            newItems = _.filter(checkboxItem, (t) => t.id !== item.id);
        } else {
            newItems = [...checkboxItem, item];
        }
        setCheckboxItem(newItems);
        field.onChange(newItems.map((i) => i.id));
    };
    const handleType = ({ type, item, index }) => {
        if (type === 'radio') {
            return handleTypeRadio(item, index);
        }
        if (type === 'checkbox') {
            return handleTypeCheckbox(item, index);
        }
    };

    return (
        <Box gap={'space-8'}>
            <Text variant={'subtitle'} fontFamily={FONTS.QUICKSAND_BOLD}>{`${p.q}*`}</Text>
            {p.t === 'text' && <TextField />}
            {_.includes(['radio', 'checkbox'], p.t) &&
                _.map(p.a, (item) => {
                    return (
                        <AnswerItem
                            activeRadio={item.id === radioItem[item.id]?.id}
                            activeCheckbox={_.find(checkboxItem, (t) => t.id === item.id)}
                            key={item.id}
                            data={p}
                            p={item}
                            onPress={() => handleType({ type: p.t, item, index: p.index })}
                        />
                    );
                })}
            {_.includes(['text_array'], p.t) && (
                <Box g={'space-16'}>
                    {_.map(p.a, (item) => {
                        return <TextArrayItem key={item.id} name={item.name} />;
                    })}
                </Box>
            )}
        </Box>
    );
};

const AnswerItem = ({ data, p, onPress, activeRadio, activeCheckbox }) => {
    const IconRadio = activeRadio ? CircleDot : Circle;
    const IconCheck = activeCheckbox ? SquareCheckBig : Square;

    return (
        <TouchableOpacity onPress={onPress}>
            <HStack gap={'space-8'}>
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

const TextArrayItem = ({ name }) => {
    return (
        <HStack>
            <Box flex={1}>
                <Text>{name}</Text>
            </Box>
            <Box flex={1}>
                <TextField
                    maxLength={4}
                    numberOfLines={1}
                    multiline
                    textAlign="center"
                    // value={String(fieldQuantity.value).replace(/[^0-9]/g, '')}
                    // onChangeText={(text) => fieldQuantity.onChange(removeLeadingZeros(text))}
                    keyboardType="numeric"
                    placeholder="Nhập số lượng"
                />
            </Box>
        </HStack>
    );
};
