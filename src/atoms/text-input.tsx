import { Theme } from '@/themes';
import { BoxProps, createBox } from '@shopify/restyle';
import React from 'react';
import { TextInput as NativeInput, TextInputProps } from 'react-native';

const TextInputStyled = createBox<Theme>(NativeInput);

interface Props extends BoxProps<Theme>, TextInputProps {}
const TextInput = (props: Props) => {
    return <TextInputStyled {...props} />;
};
export default TextInput;
