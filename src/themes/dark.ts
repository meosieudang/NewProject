import { createTheme } from '@shopify/restyle';
import { StatusBarStyle } from 'react-native';
import light, { Theme } from './light';

export const theme: Theme = createTheme({
    ...light,
    colors: {
        ...light.colors
    },
    statusBar: {
        barStyle: 'light-content' as StatusBarStyle
    },
    textVariants: {
        ...light.textVariants
    },
    barVariants: {
        headerBar: {
            bg: 'background.paper',
            borderRadius: 'hg',
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 8
        }
    }
});

export default theme;
