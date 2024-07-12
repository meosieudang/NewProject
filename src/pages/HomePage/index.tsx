import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import navigation from '@/utils/navigation';
import { Box, HStack } from '@/atoms';

const HomePage = () => {
    return (
        <View>
            <Text>HomePage</Text>
            <HStack>
                <Box m={'space-20'} mt={'space-card-padding'}>
                    <Text>aaa</Text>
                </Box>
            </HStack>
        </View>
    );
};

export default HomePage;
