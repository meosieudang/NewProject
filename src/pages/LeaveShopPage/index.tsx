import React, { useState } from 'react';
import { Box, Container, Text, TextInput, TouchableOpacity } from '@/atoms';
import Header from '@/components/Header';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Circle, CircleDot } from 'lucide-react-native';
import theme from '@/themes/light';
import TextField from '@/components/TextField';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoadingButton from '@/components/LoadingButton';
import navigation from '@/utils/navigation';
import RadioItem from '@/components/RadioItem';

type ParamList = {
    Data: {
        shopName: string;
        address: string;
    };
};
const LeaveShopPage = () => {
    const { params } = useRoute<RouteProp<ParamList, 'Data'>>();
    const [item, setItem] = useState<any>({
        id: faker.string.alpha(10),
        name: 'Lý do khác',
        type: 'input'
    });
    return (
        <Container px={'space-16'}>
            <Header title="Lí do rời khỏi quán" />
            <Box alignItems={'center'} my={'space-8'}>
                <Text variant={'subtitle'}>{`Hãy cho biết lí do bạn rời khỏi:`}</Text>
                <Text variant={'title'}>{params?.shopName}</Text>
            </Box>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} enableOnAndroid>
                <Box gap={'space-12'}>
                    {_.map(dd, (t) => {
                        const active = t.id === item?.id;
                        return (
                            <Box key={t.id} gap={'space-8'}>
                                <RadioItem name={t.name} onPress={() => setItem(t)} active={active} />
                                {t.type === 'input' && active && (
                                    <TextField
                                        textAlignVertical="top"
                                        minHeight={200}
                                        maxHeight={200}
                                        multiline
                                        placeholder="Nhập lí do khác ở đây!"
                                        p={'space-8'}
                                    />
                                )}
                            </Box>
                        );
                    })}
                </Box>
            </KeyboardAwareScrollView>
            <Box pb={'space-16'}>
                <LoadingButton title="Gửi" onPress={() => navigation.pop(2)} />
            </Box>
        </Container>
    );
};

export default LeaveShopPage;

const dd = [
    { id: faker.string.alpha(10), name: 'Outlet đóng cửa tạm thời' },
    {
        id: faker.string.alpha(10),
        name: 'Outlet ngưng kinh doanh (giải thể)'
    },
    {
        id: faker.string.alpha(10),
        name: 'Từ chối PST'
    },
    {
        id: faker.string.alpha(10),
        name: 'Outlet yêu cầu phí'
    },
    {
        id: faker.string.alpha(10),
        name: 'Chuyển loại hình kinh doanh'
    },
    {
        id: faker.string.alpha(10),
        name: 'Không tìm thấy'
    },
    {
        id: faker.string.alpha(10),
        name: 'Không kịp giờ di chuyển'
    },
    {
        id: faker.string.alpha(10),
        name: 'Lý do khác',
        type: 'input'
    }
];
