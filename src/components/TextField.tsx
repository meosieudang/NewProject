import React from 'react';
import { Box, Text, TextInput } from '@/atoms';
import { BoxProps } from '@shopify/restyle';
import { Theme } from '@/themes';
import { TextInputProps } from 'react-native';
import { FONTS } from '@/constants';
import theme from '@/themes/light';

interface TextFieldProps extends BoxProps<Theme>, TextInputProps {
    error?: string;
    title?: string;
}
const TextField = (props: TextFieldProps) => {
    return (
        <Box gap={'space-8'}>
            {Boolean(props.title) && <Text variant={'subtitle'}>{props.title}</Text>}
            <TextInput
                style={{ ...theme.textVariants.bodySemibold }}
                height={50}
                p={'space-0'}
                px={'space-8'}
                borderRadius={'border-radius-4'}
                bg={'background.alternativeHover'}
                autoCorrect={false}
                placeholderTextColor={theme.colors['text.muted']}
                {...props}
            />
            {props.error && (
                <Text color={'text.error'} variant={'caption'}>
                    {props.error}
                </Text>
            )}
        </Box>
    );
};

export default TextField;
