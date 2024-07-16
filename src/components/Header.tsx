import React from 'react';
import { Header as HeaderElement } from '@react-navigation/elements';
import { Image, TouchableOpacity } from '@/atoms';
import navigation from '@/utils/navigation';
import { leftArrow } from '@/assets';

const Header = ({ title = '', useHeaderLeft = true }) => {
    return <HeaderElement headerTitleAlign="center" title={title} headerLeft={useHeaderLeft ? HeaderLeft : () => null} />;
};

export default Header;

const HeaderLeft = () => {
    return (
        <TouchableOpacity onPress={navigation.back}>
            <Image width={24} height={24} source={leftArrow} />
        </TouchableOpacity>
    );
};
