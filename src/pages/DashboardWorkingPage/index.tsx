import { Box, Container } from '@/atoms';
import BoxFunc from '@/components/BoxFunc';
import Header from '@/components/Header';
import LoadingButton from '@/components/LoadingButton';
import navigation from '@/utils/navigation';
import { FlashList } from '@shopify/flash-list';
import { FilePenLine, NotebookPen, PenLine, PhoneCall, Store, UserRoundCog } from 'lucide-react-native';
import React from 'react';

const dd = [
    {
        title: 'Kiểm tra tồn kho',
        icon: NotebookPen,
        screen: 'CheckInventoryPage'
    },
    // {
    //     title: 'Kiểm tra SĐT',
    //     icon: PhoneCall,
    //     screen: 'ConfirmAgePage'
    // },
    {
        title: 'Tiếp cận KH',
        icon: UserRoundCog,
        screen: 'ConfirmAgePage'
    },
    {
        title: 'KPI',
        icon: FilePenLine,
        screen: 'KPIPage'
    },
    {
        title: 'Tình trạng CH',
        icon: Store,
        screen: 'StoreStatusPage'
    },
    {
        title: 'Khảo sát Top-up',
        icon: PenLine,
        screen: 'SurveyTopupStep1Page'
    }
];
const DashboardWorkingPage = () => {
    const renderItem = ({ item }) => <BoxFunc {...item} />;
    return (
        <Container px={'space-16'} pb={'space-16'}>
            <Header title="Màn hình làm việc" />
            <Box m={'space-16'} />
            <FlashList
                ItemSeparatorComponent={() => <Box my={'space-8'} />}
                numColumns={2}
                data={dd}
                renderItem={renderItem}
                estimatedItemSize={10}
            />
            <LoadingButton outline title="Kết thúc ca làm việc" onPress={() => navigation.navigate('EndSurveyPage')} />
        </Container>
    );
};

export default DashboardWorkingPage;
