import React from 'react';
import { Box, HStack } from '@/atoms';
import TextField from '@/components/TextField';
import Select from '@/components/Select';

const Filter = () => {
    return (
        <Box g={'space-16'} mb={'space-16'}>
            <TextField placeholder="Tìm theo tên hoặc địa chỉ" />
            <HStack g={'space-16'}>
                <Box flex={1}>
                    <Select placeholder="Chọn Tỉnh/TP" />
                </Box>
                <Box flex={1}>
                    <Select placeholder="Chọn Quận/Huyện" />
                </Box>
            </HStack>
        </Box>
    );
};

export default Filter;
