import React from 'react';
import { Box, HStack } from '@/atoms';
import TextField from '@/components/TextField';

const Filter = () => {
    return (
        <Box>
            <TextField placeholder="Tìm theo tên hoặc địa chỉ" />
            <HStack py={'space-16'} gap={'space-16'}>
                <Box flex={1}>
                    <TextField placeholder="Chọn Tỉnh/TP" />
                </Box>
                <Box flex={1}>
                    <TextField placeholder="Chọn Quận/Huyện" />
                </Box>
            </HStack>
        </Box>
    );
};

export default Filter;
