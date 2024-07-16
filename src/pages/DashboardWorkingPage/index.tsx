import React from 'react';
import { Box, Container, Text, TouchableOpacity } from '@/atoms';
import Header from '@/components/Header';
import { FilePenLine, NotebookPen, PenLine, PhoneCall, Store, UserRoundCog } from 'lucide-react-native';
import theme from '@/themes/light';
import { FlashList } from '@shopify/flash-list';
import LoadingButton from '@/components/LoadingButton';
import navigation from '@/utils/navigation';

const dd = [
    {
        title: 'Kiểm tra tồn kho',
        icon: <NotebookPen strokeWidth={1.5} color={theme.colors['background.default']} size={48} />,
        screen: 'CheckInventoryPage'
    },
    {
        title: 'Kiểm tra SĐT',
        icon: <PhoneCall strokeWidth={1.5} color={theme.colors['background.default']} size={48} />
    },
    {
        title: 'Tiếp cận KH',
        icon: <UserRoundCog color={theme.colors['background.default']} size={48} />
    },
    {
        title: 'KPI',
        icon: <FilePenLine strokeWidth={1.5} color={theme.colors['background.default']} size={48} />
    },
    {
        title: 'Tình trạng CH',
        icon: <Store strokeWidth={1.5} color={theme.colors['background.default']} size={48} />
    },
    {
        title: 'Khảo sát Top-up',
        icon: <PenLine strokeWidth={1.5} color={theme.colors['background.default']} size={48} />
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
            <LoadingButton title="Kết thúc ca làm việc" />
        </Container>
    );
};

export default DashboardWorkingPage;

const BoxFunc = ({ title, icon, screen }) => {
    return (
        <Box flex={1} alignItems={'center'} gap={'space-8'}>
            <TouchableOpacity
                onPress={() => navigation.navigate(screen)}
                alignItems={'center'}
                borderRadius={'border-radius-8'}
                justifyContent={'center'}
                bg={'primary.default'}
                width={100}
                height={100}
            >
                {icon}
            </TouchableOpacity>
            <Text variant={'subtitle'}>{title}</Text>
        </Box>
    );
};
