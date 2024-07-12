import * as React from 'react';
import { BoxProps } from '@shopify/restyle';
import { Theme } from '@/themes';
import Box from './box';

interface Props extends BoxProps<Theme> {
    children?: React.ReactNode;
}
const HStack = (props: Props) => (
    <Box alignItems="center" flexDirection="row" {...props}>
        {props.children}
    </Box>
);

export default HStack;
