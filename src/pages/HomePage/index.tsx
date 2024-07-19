import { useGlobalAppContainer } from '@/AppContainer';
import { Box, Container } from '@/atoms';
import BoxFunc from '@/components/BoxFunc';
import Header from '@/components/Header';
import LoadingButton from '@/components/LoadingButton';
import { refModal } from '@/components/Modal';
import navigation from '@/utils/navigation';
import { FlashList } from '@shopify/flash-list';
import { PencilLine, ScrollText, Store } from 'lucide-react-native';
import React from 'react';

const dd = [
    {
        title: 'Danh sách điểm bán',
        icon: Store,
        screen: 'POSPage'
    },
    {
        title: 'Mở điểm bán',
        icon: PencilLine,
        screen: 'NearPOSPage'
    },
    {
        title: 'KPI',
        icon: ScrollText,
        screen: 'KPIGlobalPage'
    }
];
const HomePage = () => {
    const [_, setValue] = useGlobalAppContainer();

    const renderItem = ({ item }) => <BoxFunc {...item} />;
    const onLogout = () => {
        refModal.current?.setToggle({
            title: 'Xác nhận',
            message: `Bạn chắc chắn đăng xuất?`,
            isConfirm: true,
            onPress: () => setValue({}),
            type: 'warning'
        });
    };
    return (
        <Container p={'space-16'} pt={'space-0'}>
            <Header useHeaderLeft={false} title="Trang chủ" />
            <Box m={'space-16'} />
            <FlashList ItemSeparatorComponent={() => <Box my={'space-8'} />} data={dd} renderItem={renderItem} estimatedItemSize={10} />
            <LoadingButton outline title="đăng xuất" onPress={onLogout} />
        </Container>
    );
};

export default HomePage;
