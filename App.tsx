import AppContainer from '@/AppContainer';
import Modal from '@/components/Modal';
import { themes } from '@/themes';
import { Toasts } from '@backpackapp-io/react-native-toast';
import { ThemeProvider } from '@shopify/restyle';
import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
    return (
        <SafeAreaProvider>
            <GestureHandlerRootView style={styles.root}>
                <ThemeProvider theme={themes[0].theme}>
                    <AppContainer />
                    <Toasts />
                    <Modal />
                </ThemeProvider>
            </GestureHandlerRootView>
        </SafeAreaProvider>
    );
};

export default App;

const styles = StyleSheet.create({
    root: { flex: 1 }
});
