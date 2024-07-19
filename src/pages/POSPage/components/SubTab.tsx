import React, { useState } from 'react';
import { Circle, CircleDot } from 'lucide-react-native';
import { Box, HStack, Pressable, Text } from '@/atoms';
import theme from '@/themes/light';

const SubTab = ({ tabs = [], renderTab }: { tabs: { name: string }[]; renderTab: (index: number) => React.ReactNode }) => {
    const [index, setIndex] = useState(0);
    return (
        <Box flex={1}>
            <HStack borderBottomWidth={1} borderBottomColor={'border.default'} py={'space-8'}>
                {_.map(tabs, (t, idx) => (
                    <DayTabItem key={idx} {...t} onPress={() => setIndex(idx)} active={index === idx} />
                ))}
            </HStack>
            {renderTab(index)}
            {/* {index === 0 ? <ShopList /> : <ShopListWeek />} */}
        </Box>
    );
};

export default SubTab;

const DayTabItem = ({ name, onPress, active }) => {
    const Icon = active ? CircleDot : Circle;
    return (
        <Pressable flex={1} onPress={onPress} flexDirection={'row'} alignItems={'center'} gap={'space-4'}>
            <Icon color={theme.colors['primary.default']} />
            <Text>{name}</Text>
        </Pressable>
    );
};
