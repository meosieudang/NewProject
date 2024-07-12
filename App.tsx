import AppContainer from '@/AppContainer';
import { themes } from '@/themes';
import { ThemeProvider } from '@shopify/restyle';
import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
    return (
        <GestureHandlerRootView style={styles.root}>
            <ThemeProvider theme={themes[0].theme}>
                <AppContainer />
            </ThemeProvider>
        </GestureHandlerRootView>
    );
};

export default App;

const styles = StyleSheet.create({
    root: { flex: 1 }
});
