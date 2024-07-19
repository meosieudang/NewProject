import { Box, HStack, Text } from '@/atoms';
import React from 'react';

const KPIList = ({ headers, data }) => {
    return (
        <Box
            style={{
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5
            }}
            bg={'background.default'}
            my={'space-16'}
        >
            <HStack g={'space-2'}>
                {_.map(headers, (t, i) => (
                    <Box height={40} key={i} flex={1} alignItems={'center'} bg={'primary.default'} p={'space-8'}>
                        <Text variant={'bodySemibold'} color={'background.default'} key={i}>
                            {t}
                        </Text>
                    </Box>
                ))}
            </HStack>

            <Box>
                {_.map(data, (t, i) => (
                    <HStack key={i}>
                        {_.map(_.omit(t, 'id'), (a, b) => (
                            <Box
                                borderWidth={0.5}
                                borderColor={'border.default'}
                                height={40}
                                flex={1}
                                key={b}
                                alignItems={'center'}
                                p={'space-8'}
                            >
                                <Text variant={'bodySemibold'}>{a}</Text>
                            </Box>
                        ))}
                    </HStack>
                ))}
            </Box>
        </Box>
    );
};

export default KPIList;
