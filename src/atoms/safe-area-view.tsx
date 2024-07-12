import * as React from 'react';
import { BoxProps, createBox } from '@shopify/restyle';
import { Theme } from '@/themes';
import { SafeAreaView as NativeSafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';

const SafeAreaViewContext = createBox<Theme, SafeAreaViewProps>(NativeSafeAreaView);

interface Props extends BoxProps<Theme>, SafeAreaViewProps {}

const SafeAreaView = (props: Props) => <SafeAreaViewContext {...props}>{props.children}</SafeAreaViewContext>;

export default SafeAreaView;
