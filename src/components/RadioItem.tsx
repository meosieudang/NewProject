import { Text, TouchableOpacity } from '@/atoms';
import theme from '@/themes/light';
import { Circle, CircleDot } from 'lucide-react-native';
import React from 'react';

const RadioItem = ({ active = false, onPress = () => {}, name = '' }) => {
    const Icon = active ? CircleDot : Circle;

    return (
        <TouchableOpacity onPress={onPress} flexDirection={'row'} alignItems={'center'} gap={'space-4'}>
            <Icon color={theme.colors['primary.default']} />
            <Text>{name}</Text>
        </TouchableOpacity>
    );
};

export default RadioItem;