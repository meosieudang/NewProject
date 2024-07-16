import React from 'react';
import { Box, Text, TextInput } from '@/atoms';
import { BoxProps } from '@shopify/restyle';
import { Theme } from '@/themes';
import { TextInputProps } from 'react-native';

interface TextFieldProps extends BoxProps<Theme>, TextInputProps {
    error?: string;
}
const TextField = (props: TextFieldProps) => {
    return (
        <Box gap={'space-4'}>
            <TextInput
                height={50}
                p={'space-0'}
                px={'space-8'}
                borderRadius={'border-radius-4'}
                bg={'background.alternativeHover'}
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
