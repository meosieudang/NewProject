import React from 'react';
import { Text, TouchableOpacity } from '@/atoms';
import { ActivityIndicator } from 'react-native';

const LoadingButton = ({ disabled = false, outline = false, loading = false, title = 'OK', onPress = () => {} }) => {
    return (
        <TouchableOpacity
            borderWidth={outline ? 1 : 0}
            borderColor={outline ? 'primary.default' : 'transparent'}
            onPress={onPress}
            bg={loading || disabled ? 'error.alternative' : outline ? 'background.default' : 'primary.default'}
            height={50}
            alignItems={'center'}
            borderRadius={'border-radius-30'}
            justifyContent={'center'}
            flexDirection={'row'}
            gap={'space-4'}
            disabled={disabled || loading}
        >
            {loading && <ActivityIndicator size={'small'} color={'white'} />}
            <Text textTransform={'uppercase'} variant={'subtitle'} color={outline ? 'primary.default' : 'background.default'}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default LoadingButton;
