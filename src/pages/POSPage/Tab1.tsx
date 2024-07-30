import { Box, HStack, Image, Pressable, Text, TouchableOpacity } from '@/atoms';
import theme from '@/themes/light';
import { FlashList } from '@shopify/flash-list';
import dayjs from 'dayjs';
import { ArrowUpRight, CircleCheck, Map } from 'lucide-react-native';
import React from 'react';
import Filter from './components/Filter';
import SubTab from './components/SubTab';
import ShopItem from './components/ShopItem';
import navigation from '@/utils/navigation';

const Tab1 = () => {
    const renderTab = (idx: number) => (idx === 0 ? <ShopList /> : <ShopListWeek />);
    return (
        <Box mt={'space-16'} flex={1}>
            <Filter />
            <SubTab renderTab={renderTab} tabs={[{ name: `Ngày hiện tại` }, { name: `Ngày trong tuần` }]} />
            <Pressable
                onPress={() => navigation.navigate('MapPage', { data: dd })}
                borderWidth={1}
                borderColor={'primary.default'}
                borderRadius={'border-radius-9999'}
                alignItems={'center'}
                justifyContent={'center'}
                position={'absolute'}
                alignSelf={'center'}
                bottom={34}
                bg={'primary.default'}
                flexDirection={'row'}
                px={'space-16'}
                py={'space-8'}
                g={'space-8'}
            >
                <Text color={'background.default'} variant={'bodySemibold'}>{`Bản đồ`}</Text>
                <Map color={theme.colors['background.default']} />
            </Pressable>
        </Box>
    );
};

export default React.memo(Tab1);

const dd = _.times(2000).map((t, i) => ({
    image: faker.image.url(),
    id: faker.string.alpha(10),
    shopName: faker.location.state(),
    address: faker.location.streetAddress(true),
    time: faker.date.betweens({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z', count: 2 }),
    coordinates: faker.location.nearbyGPSCoordinate({ origin: [10.75, 106.35], radius: 50 }).reverse()
}));

const ShopList = () => {
    const renderItem = ({ item }) => <ShopItem {...item} onPress={() => navigation.navigate('ConfirmWorkingPage', { ...item })} />;
    const data = React.useMemo(() => dd, [dd]);
    return (
        <FlashList
            ListHeaderComponent={<Text py={'space-8'}>{`Chọn cửa hàng để bắt đầu làm việc:`}</Text>}
            contentContainerStyle={{ paddingBottom: 16 }}
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={renderItem}
            estimatedItemSize={200}
        />
    );
};

const ShopListWeek = () => {
    return (
        <Box>
            <Text>{'week'}</Text>
        </Box>
    );
};
