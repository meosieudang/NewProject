import { Keyboard } from 'react-native';
import React, { useCallback, useImperativeHandle, useMemo, useRef } from 'react';

import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import useMathSorter from '@/hooks/useMathSorter';
import { Box, Text, TouchableOpacity } from '@/atoms';
import TextField from './TextField';

interface Handle {
    show: (data: any[]) => void;
    hide: () => void;
}
interface Props {
    onPressItem: (item: any) => void;
}
const BottomSheetList = React.forwardRef<Handle, Props>((_props, ref) => {
    // variables
    const data = useMemo(
        () =>
            Array(50)
                .fill(0)
                .map((_, index) => ({ name: `Saigon Menthol-${index}` })),
        []
    );
    // hooks
    const sheetRef = useRef<BottomSheet>(null);
    const { search, onSearch, clearText, t: values } = useMathSorter({ data, keys: ['name'] });

    useImperativeHandle(ref, () => ({
        show: (paymentMethods) => {
            // setD(paymentMethods);
            const { current: bottomSheet } = sheetRef;
            if (bottomSheet) {
                bottomSheet.snapToIndex(0);
            }
        },
        hide: () => sheetRef.current?.close()
    }));

    const snapPoints = useMemo(() => ['90%'], []);

    // callbacks
    const handleSheetChange = useCallback((index) => {
        console.log('handleSheetChange', index);
        Keyboard.dismiss();
        clearText();
    }, []);
    const handleSnapPress = useCallback((index) => {
        sheetRef.current?.snapToIndex(index);
    }, []);
    const handleClosePress = useCallback(() => {
        sheetRef.current?.close();
    }, []);

    // render
    const renderItem = useCallback(
        ({ item }) => (
            <TouchableOpacity
                onPress={() => {
                    _props.onPressItem(item);
                    clearText();
                    // Keyboard.dismiss();
                    // sheetRef.current?.close();
                }}
                height={50}
                justifyContent={'center'}
                borderBottomWidth={1}
                borderBottomColor={'border.default'}
            >
                <Text variant={'subtitle'}>{item.name}</Text>
            </TouchableOpacity>
        ),
        []
    );
    return (
        <BottomSheet
            backdropComponent={(props) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />}
            index={-1}
            ref={sheetRef}
            snapPoints={snapPoints}
            onChange={handleSheetChange}
            // detached
        >
            <Box px={'space-16'} flex={1} pb={'space-16'}>
                <TextField placeholder="Tìm kiếm" value={values} onChangeText={onSearch} />
                <BottomSheetFlatList
                    keyboardDismissMode={'on-drag'}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    data={_.size(search) ? search : data}
                    keyExtractor={(t, i) => `${t.name}-${i}`}
                    renderItem={renderItem}
                />
            </Box>
        </BottomSheet>
    );
});
type BottomSheetList = Handle;

export default BottomSheetList;
