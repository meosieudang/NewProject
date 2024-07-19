import { Box, Text, TouchableOpacity } from '@/atoms';
import theme from '@/themes/light';
import navigation from '@/utils/navigation';
import React from 'react';

const BoxFunc = ({ title, icon, screen }) => {
    const Icon = icon;
    return (
        <Box flex={1} alignItems={'center'} gap={'space-8'}>
            <TouchableOpacity
                onPress={() => navigation.navigate(screen)}
                alignItems={'center'}
                borderRadius={'border-radius-8'}
                justifyContent={'center'}
                bg={'primary.default'}
                width={100}
                height={100}
            >
                <Icon strokeWidth={1.2} color={theme.colors['background.default']} size={48} />
            </TouchableOpacity>
            <Text variant={'subtitle'}>{title}</Text>
        </Box>
    );
};

export default BoxFunc;
