import { Box, Text, TouchableOpacity } from '@/atoms';
import theme from '@/themes/light';
import { ChevronDown } from 'lucide-react-native';
import React from 'react';

const Select = ({ onPress = () => {}, title = '', name = '', placeholder = '' }) => {
    return (
        <Box gap={'space-8'}>
            {Boolean(title) && <Text variant={'subtitle'}>{title}</Text>}
            <TouchableOpacity
                onPress={onPress}
                borderRadius={'border-radius-4'}
                px={'space-8'}
                bg={'background.alternativeHover'}
                height={50}
                flexDirection={'row'}
                alignItems={'center'}
            >
                <Box flex={1}>
                    <Text variant={'bodySemibold'} color={name ? 'text.default' : 'text.muted'}>
                        {name ? name : placeholder}
                    </Text>
                </Box>
                <ChevronDown color={theme.colors['primary.default']} />
            </TouchableOpacity>
        </Box>
    );
};

export default Select;
