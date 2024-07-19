import React from 'react';
import { Box, HStack, Image, Text, TouchableOpacity } from '@/atoms';
import { ArrowUpRight, CircleCheck } from 'lucide-react-native';
import theme from '@/themes/light';
import dayjs from 'dayjs';
import LoadingImage from '@/components/LoadingImage';

const ShopItem = (t) => {
    return (
        <TouchableOpacity
            style={{
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 1
                },
                shadowOpacity: 0.9,
                shadowRadius: 1,
                elevation: 2
            }}
            flexDirection={'row'}
            gap={'space-8'}
            bg={'background.default'}
            mx={'space-4'}
            p={'space-8'}
            flex={1}
            onPress={t.onPress}
            my={'space-8'}
        >
            <LoadingImage path={t.image} width={100} height={80} />
            <Box flex={1} g={'space-4'}>
                <HStack justifyContent={'space-between'}>
                    <Text>{`(${_.toString(dayjs(t.time[0]).format('HH:mm'))} - ${_.toString(dayjs(t.time[1]).format('HH:mm'))})`}</Text>
                    <HStack backgroundColor={'warning.default'} p={'space-4'} borderRadius={'border-radius-12'}>
                        <Text variant={'caption'}>{`Chỉ đường`}</Text>
                        <ArrowUpRight color={'black'} size={16} />
                    </HStack>
                </HStack>
                <Text variant={'title'}>{t.shopName}</Text>
                <HStack justifyContent={'space-between'} g={'space-8'}>
                    <Box flex={1}>
                        <Text numberOfLines={1}>{t.address}</Text>
                    </Box>
                    {Math.random() > 0.5 && <CircleCheck fill={theme.colors['success.default']} color={'white'} size={32} />}
                </HStack>
            </Box>
        </TouchableOpacity>
    );
};

export default React.memo(ShopItem);
