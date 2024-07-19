import { Box, Container, HStack, Text } from '@/atoms';
import Header from '@/components/Header';
import KPIList from '@/components/KPIList';
import dayjs from 'dayjs';
import React from 'react';

const KPIPage = () => {
    return (
        <Container px={'space-16'}>
            <Header title="Xem KPI" />
            <Box mt={'space-16'} flex={1}>
                <Text variant={'subtitle'}>{`PST: ${faker.person.firstName('female')}`}</Text>
                <KPIList headers={d} data={dd} />
                <Text variant={'subtitle'}>{`Transaction cuối: ${dayjs().format('DD/MM/YYYY HH:mm')}`}</Text>
            </Box>
        </Container>
    );
};

export default KPIPage;

const d = ['Reach', 'Trial', 'CRM'];
const dd = [{ id: 1, reach: faker.string.numeric(), trial: faker.string.numeric(), crm: faker.string.numeric() }];
