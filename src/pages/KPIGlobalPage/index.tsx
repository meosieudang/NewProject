import { Box, Container, HStack, Text } from '@/atoms';
import Header from '@/components/Header';
import KPIList from '@/components/KPIList';
import Select from '@/components/Select';
import dayjs from 'dayjs';
import React from 'react';

const KPIGlobalPage = () => {
    return (
        <Container px={'space-16'}>
            <Header title="Xem KPI" />
            <Box mt={'space-16'} flex={1}>
                <Text variant={'subtitle'}>{`PST: ${faker.person.firstName('female')}`}</Text>
                <Box borderWidth={1} my={'space-16'} borderColor={'border.default'} />

                <HStack g={'space-16'} mt={'space-16'}>
                    <Box flex={1}>
                        <Select onPress={() => {}} title="Từ ngày" name={dayjs().format('DD/MM/YYYY')} />
                    </Box>
                    <Box flex={1}>
                        <Select onPress={() => {}} title="Đến ngày" name={dayjs().format('DD/MM/YYYY')} />
                    </Box>
                </HStack>
                <KPIList headers={d} data={dd} />
                <Box borderWidth={1} mb={'space-16'} borderColor={'border.default'} />
                <Text variant={'subtitle'}>{`Số liệu tổng hợp:`}</Text>
                <KPIList headers={['', ...d]} data={ddd} />
            </Box>
        </Container>
    );
};

export default KPIGlobalPage;

const d = ['Reach', 'Trial', 'CRM'];
const dd = [{ id: 1, reach: faker.string.numeric(), trial: faker.string.numeric(), crm: faker.string.numeric() }];
const ddd = [
    { title: 'Hôm nay', id: 1, reach: faker.string.numeric(), trial: faker.string.numeric(), crm: faker.string.numeric() },
    { title: 'Tuần này', id: 1, reach: faker.string.numeric(), trial: faker.string.numeric(), crm: faker.string.numeric() },
    { title: 'Tuần trước', id: 1, reach: faker.string.numeric(), trial: faker.string.numeric(), crm: faker.string.numeric() },
    { title: 'Tháng này', id: 1, reach: faker.string.numeric(), trial: faker.string.numeric(), crm: faker.string.numeric() }
];
