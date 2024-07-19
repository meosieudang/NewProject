import { leftArrow } from '@/assets';
import { Image, TouchableOpacity } from '@/atoms';
import theme from '@/themes/light';
import navigation from '@/utils/navigation';
import { getDefaultHeaderHeight, Header as HeaderElement } from '@react-navigation/elements';
import React from 'react';
import { Platform } from 'react-native';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';

type HeaderProps = {
    title?: string;
    useHeaderLeft?: boolean;
    onBack?: () => void;
};
const Header = ({ title = '', useHeaderLeft = true, onBack = undefined }: HeaderProps) => {
    const insets = useSafeAreaInsets();
    const frame = useSafeAreaFrame();
    // On models with Dynamic Island the status bar height is smaller than the safe area top inset.
    const hasDynamicIsland = Platform.OS === 'ios' && insets.top > 50;
    const statusBarHeight = hasDynamicIsland ? insets.top - 5 : insets.top;
    const height = getDefaultHeaderHeight(frame, false, statusBarHeight);

    return (
        <HeaderElement
            headerBackgroundContainerStyle={{
                height,
                backgroundColor: 'white',
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 7
            }}
            headerTitleStyle={{ ...theme.textVariants.title, color: theme.colors['text.default'] }}
            headerTitleAlign="center"
            title={title}
            headerLeft={useHeaderLeft ? () => <HeaderLeft onBack={onBack} /> : () => null}
        />
    );
};

export default Header;

const HeaderLeft = ({ onBack }) => {
    return (
        <TouchableOpacity onPress={Boolean(onBack) ? onBack : navigation.back}>
            <Image width={24} height={24} source={leftArrow} />
        </TouchableOpacity>
    );
};
