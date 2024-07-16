import * as React from 'react';
import { BoxProps } from '@shopify/restyle';
import { Theme } from '@/themes';
import Box from './box';
import { StyleProp, ViewStyle } from 'react-native';

const Container: React.FC<React.PropsWithChildren<BoxProps<Theme> & { style?: StyleProp<ViewStyle> }>> = (props) => (
    <Box backgroundColor="background.default" flex={1} {...props}>
        {props.children}
    </Box>
);

export default Container;
