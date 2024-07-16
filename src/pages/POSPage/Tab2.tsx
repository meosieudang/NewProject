import { Box, Text } from '@/atoms';
import React from 'react';
import Filter from './components/Filter';
import SubTab from './components/SubTab';
import { FlashList } from '@shopify/flash-list';
import ShopItem from './components/ShopItem';
import navigation from '@/utils/navigation';
import { refModal } from '@/components/Modal';

const Tab2 = () => {
    const renderTab = (idx: number) => <ShopList />;

    return (
        <Box mt={'space-16'} flex={1}>
            <Filter />
            <SubTab renderTab={renderTab} tabs={[{ name: `Bán kính 1km` }, { name: `Ngoài bán kính` }]} />
        </Box>
    );
};

export default Tab2;

const dd = _.times(30).map((t, i) => ({
    image: faker.image.url(),
    id: faker.string.alpha(10),
    shopName: faker.location.city(),
    address: faker.location.streetAddress(true),
    time: faker.date.betweens({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z', count: 2 })
}));
const ShopList = () => {
    const handlePress = (item) => {
        refModal.current?.setVisible();
        navigation.navigate('RequestPage', { ...item });
    };
    const renderItem = ({ item }) => (
        <ShopItem
            {...item}
            onPress={() =>
                refModal.current?.setToggle({
                    title: 'Xác nhận',
                    message: `Bạn muốn làm việc tại ${item.shopName} này?`,
                    isConfirm: true,
                    onPress: () => handlePress(item),
                    type: 'warning',
                    confirmText: 'Gửi yêu cầu'
                })
            }
        />
    );
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
