import React, { useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';

import { Box, HStack, Pressable, Text, TouchableOpacity } from '@/atoms';
import LoadingImage from '@/components/LoadingImage';
import TextField from '@/components/TextField';
import useMathSorter from '@/hooks/useMathSorter';
import theme from '@/themes/light';
import navigation from '@/utils/navigation';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { FlashList } from '@shopify/flash-list';
import dayjs from 'dayjs';
import { CircleCheck, X } from 'lucide-react-native';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ShopItem from '../POSPage/components/ShopItem';

export interface Handle {
    show: (data: any[]) => void;
    hide: () => void;
    showDetail: ({ item }) => void;
    hideDetail: () => void;
}
interface Props {
    data: any[];
}
const BottomSheetMap = React.forwardRef<Handle, Props>((_props, ref) => {
    console.log('rendder');

    // variables
    const data = useMemo(() => _props.data, []);
    // hooks
    const sheetRef = useRef<BottomSheet>(null);
    const { search, onSearch, clearText, t: values } = useMathSorter({ data, keys: ['shopName'] });
    const [detail, setDetail] = useState({});
    const insets = useSafeAreaInsets();

    useImperativeHandle(ref, () => ({
        show: (paymentMethods) => {
            // setD(paymentMethods);
            const { current: bottomSheet } = sheetRef;
            if (bottomSheet) {
                bottomSheet.snapToIndex(-1);
            }
        },
        hide: () => sheetRef.current?.close(),
        showDetail: ({ item }) => {
            setDetail(item);
            sheetRef.current?.close();
            poiDetailsModalRef.current?.snapToIndex(0);
        },
        hideDetail: handleCloseLocationDetails
    }));

    const snapPoints = useMemo(() => ['10%', '100%'], []);
    // variables
    const snapPoints2 = useMemo(() => ['40%'], []);

    const [currentIndex, setCurrentIndex] = useState(0);
    // callbacks
    const handleSheetChange = useCallback((index) => {
        setCurrentIndex(index);
        if (index === 0) {
            opacity.value = withTiming(1, {});
            opacity2.value = 0;
        } else {
            opacity.value = 0;
            opacity2.value = withTiming(1, {});
        }
    }, []);

    const handleCloseLocationDetails = useCallback(() => {
        // setDetail({});
        poiDetailsModalRef.current?.close();
        sheetRef.current?.snapToIndex(0);
    }, []);

    // render
    const renderItem = useCallback(
        ({ item }) => <ShopItem {...item} onPress={() => navigation.navigate('ConfirmWorkingPage', { ...item })} />,
        []
    );
    const poiDetailsModalRef = useRef<BottomSheet>(null);
    const opacity = useSharedValue(0);
    const opacity2 = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => ({
        opacity: opacity.value
    }));
    const animatedStyles2 = useAnimatedStyle(() => ({
        opacity: opacity2.value
    }));

    return (
        <>
            <BottomSheet ref={sheetRef} snapPoints={snapPoints} onChange={handleSheetChange} style={{ paddingHorizontal: 16 }}>
                {[-1, 0].includes(currentIndex) ? (
                    <Animated.View style={[{ margin: 16 }, animatedStyles]}>
                        <Text textAlign={'center'} variant={'subtitle'}>{`Hiện có ${_.size(data)} cửa hàng`}</Text>
                    </Animated.View>
                ) : (
                    <Animated.View style={[{ flex: 1 }, animatedStyles2]}>
                        <TextField placeholder="Tìm kiếm" value={values} onChangeText={onSearch} mt={'space-8'} mb={'space-16'} />

                        <FlashList
                            keyboardDismissMode={'on-drag'}
                            keyboardShouldPersistTaps="never"
                            showsVerticalScrollIndicator={false}
                            data={_.size(search) ? search : data}
                            renderItem={renderItem}
                            estimatedItemSize={200}
                            renderScrollComponent={ScrollComp}
                        />
                    </Animated.View>
                )}
            </BottomSheet>

            <BottomSheet
                index={-1}
                handleComponent={null}
                detached
                bottomInset={insets.bottom + 16}
                style={{ marginHorizontal: 16 }}
                ref={poiDetailsModalRef}
                snapPoints={snapPoints2}
            >
                <Pressable flex={1} onPress={() => navigation.navigate('ConfirmWorkingPage', { ...detail })} style={styles.shadow}>
                    <TouchableOpacity
                        onPress={handleCloseLocationDetails}
                        position={'absolute'}
                        zIndex={1}
                        top={16}
                        right={16}
                        width={32}
                        height={32}
                        borderRadius={'border-radius-9999'}
                        bg={'background.default'}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        <X color={theme.colors['text.default']} />
                    </TouchableOpacity>
                    <LoadingImage borderBottomNone path={detail.image} width={'100%'} height={200} />
                    <Box p={'space-16'} py={'space-8'}>
                        <Text variant={'title'}>{detail.shopName}</Text>
                        <Text numberOfLines={1}>{detail.address}</Text>
                        <HStack justifyContent={'space-between'}>
                            <Text>
                                {`(${_.toString(dayjs(detail.time?.[0]).format('HH:mm'))} - ${_.toString(
                                    dayjs(detail.time?.[1]).format('HH:mm')
                                )})`}
                            </Text>
                            {Math.random() > 0.5 && <CircleCheck fill={theme.colors['success.default']} color={'white'} size={32} />}
                        </HStack>
                    </Box>
                </Pressable>
            </BottomSheet>
        </>
    );
});

export default React.memo(BottomSheetMap);

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 7,
        backgroundColor: 'white',
        borderRadius: 8
    }
});

const ScrollComp = React.forwardRef<null, { children?: React.ReactNode }>((p, ref) => (
    <BottomSheetScrollView ref={ref} {...p}>
        {p.children}
    </BottomSheetScrollView>
));
