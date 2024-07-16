import { Box, HStack, Image, Text, TouchableOpacity } from '@/atoms';
import theme from '@/themes/light';
import { FlashList } from '@shopify/flash-list';
import dayjs from 'dayjs';
import { ArrowUpRight, CircleCheck } from 'lucide-react-native';
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
        </Box>
    );
};

export default Tab1;

const dd = _.times(30).map((t, i) => ({
    image: faker.image.url(),
    id: faker.string.alpha(10),
    shopName: faker.location.city(),
    address: faker.location.streetAddress(true),
    time: faker.date.betweens({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z', count: 2 })
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
            estimatedItemSize={100}
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
