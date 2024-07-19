import { Box, Container, Text } from '@/atoms';
import Header from '@/components/Header';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import ShopItem from '../POSPage/components/ShopItem';
import LoadingButton from '@/components/LoadingButton';
import navigation from '@/utils/navigation';

const NearPOSPage = () => {
    const dd = _.times(_.random(0, 3)).map((t, i) => ({
        image: faker.image.url(),
        id: faker.string.alpha(10),
        shopName: faker.location.state(),
        address: faker.location.streetAddress(true),
        time: faker.date.betweens({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z', count: 2 })
    }));
    return (
        <Container px={'space-16'} pb={'space-16'}>
            <Header title="Danh sách điểm bán lân cận" />
            <Box flex={1} mt={'space-16'}>
                <NearPOSList data={dd} />
            </Box>
            <Box g={'space-8'}>
                <LoadingButton title="Tạo điểm bán mới" onPress={() => navigation.navigate('CreatePOSPage')} />
                <LoadingButton title="quay lại" outline onPress={navigation.back} />
            </Box>
        </Container>
    );
};

export default NearPOSPage;

const NearPOSList = ({ data }) => {
    const renderItem = ({ item }) => <ShopItem {...item} />;
    return (
        <FlashList
            ListEmptyComponent={<Text variant={'bodySemibold'} textAlign={'center'}>{`Không có dữ liệu`}</Text>}
            renderItem={renderItem}
            data={data}
            estimatedItemSize={100}
        />
    );
};
