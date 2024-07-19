import { Box, Container, Text } from '@/atoms';
import Header from '@/components/Header';
import LoadingButton from '@/components/LoadingButton';
import RadioItem from '@/components/RadioItem';
import navigation from '@/utils/navigation';
import React, { useState } from 'react';

const CustomerAccessStep2Page = () => {
    const [state, setState] = useState({});
    return (
        <Container px={'space-16'}>
            <Header title="Bán hàng" />
            <Text variant={'subtitle'} mt={'space-16'} mb={'space-8'}>{`Chọn hình thức bán:`}</Text>
            <Box gap={'space-8'} flex={1}>
                {_.map(dd, (t) => (
                    <RadioItem
                        active={state[t.id]?.id === t.id}
                        onPress={() => setState((prev) => ({ [t.id]: t }))}
                        key={t.id}
                        name={t.name}
                    />
                ))}
            </Box>
            <Box gap={'space-8'} pb={'space-16'}>
                <LoadingButton title="Bán hàng" onPress={() => navigation.navigate('CustomerAccessStep3Page', { ...state })} />
                <LoadingButton title="Khách không mua hàng" onPress={() => navigation.navigate('CustomerNotBuyPage')} outline />
            </Box>
        </Container>
    );
};

export default CustomerAccessStep2Page;
const dd = _.times(10).map((t) => ({
    id: faker.string.alpha(5),
    name: faker.commerce.productName()
}));
