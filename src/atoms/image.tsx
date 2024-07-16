import * as React from 'react';
import { BackgroundColorProps, BoxProps, createBox } from '@shopify/restyle';
import { Theme } from '@/themes';
import { ImageProps, ImageStyle, Image as RNImage } from 'react-native';
const ImageStyled = createBox<Theme, ImageProps>(RNImage);

interface Props extends Omit<BoxProps<Theme> & ImageProps, 'BackgroundColorProps'> {}
const Image = (props: Props) => <ImageStyled {...props} />;

export default Image;
