import { createTheme } from '@shopify/restyle';
import { StatusBarStyle } from 'react-native';
import { colors } from './color';
import tokens from '@shopify/polaris-tokens';

// const pxToNumber = (px: string) => {
//     return parseInt(px.replace('px', ''), 10);
// };

// const spaceX = tokens.themeDefault.color;
const tokenColors = tokens['themeDefault'].color;

const theme = createTheme({
    spacing: {
        'space-0': 0,
        'space-1': 1,
        'space-2': 2,
        'space-4': 4,
        'space-6': 6,
        'space-8': 8,
        'space-12': 12,
        'space-16': 16,
        'space-20': 20,
        'space-24': 24,
        'space-32': 32,
        'space-40': 40,
        'space-48': 48,
        'space-64': 64,
        'space-80': 80,
        'space-96': 96,
        'space-112': 112,
        'space-128': 128,
        'space-table-cell-padding': 6,
        'space-button-group-gap': 8,
        'space-card-gap': 8,
        'space-card-padding': 16
    },
    breakpoints: {
        phone: 0,
        tablet: 768
    },
    colors: {
        transparent: 'transparent',
        'background.default': colors.white,
        'background.alternative': colors.white,
        'background.alternativeHover': _.get(tokenColors, 'color-bg-surface-secondary-hover'),
        'background.alternativePressed': _.get(tokenColors, 'color-bg-surface-secondary-active'),
        'background.hover': _.get(tokenColors, 'color-bg-surface-hover'),
        'background.pressed': _.get(tokenColors, 'color-bg-surface-active'),

        'text.default': _.get(tokenColors, 'color-text'),
        'text.alternative': _.get(tokenColors, 'color-text-secondary'),
        'text.muted': _.get(tokenColors, 'color-text-disabled'),
        'text.success': _.get(tokenColors, 'color-text-success'),
        'text.warning': _.get(tokenColors, 'color-text-warning'),
        'text.error': _.get(tokenColors, 'color-text-critical'),
        'text.info': _.get(tokenColors, 'color-text-info'),

        'icon.default': _.get(tokenColors, 'color-icon'),
        'icon.alternative': _.get(tokenColors, 'color-icon-secondary'),
        'icon.muted': _.get(tokenColors, 'color-icon-disabled'),

        'border.default': _.get(tokenColors, 'color-border'),
        'border.muted': _.get(tokenColors, 'color-border-disabled'),

        // 'overlay.default': '#00000099',
        // 'overlay.alternative': '#000000cc',
        // 'overlay.inverse': 'brandColor.grey000',

        'primary.default': 'rgb(235,58,84)',
        'primary.alternative': 'brandColor.blue600',
        'primary.muted': '#0376c91a',
        'primary.inverse': 'brandColor.grey000',
        'primary.defaultHover': '#036ab5',
        'primary.defaultPressed': '#025ea1',

        'error.default': _.get(tokenColors, 'color-bg-fill-critical'),
        'error.alternative': _.get(tokenColors, 'color-bg-fill-critical-secondary'),
        'error.muted': _.get(tokenColors, 'color-bg-fill-critical-selected'),
        'error.defaultHover': _.get(tokenColors, 'color-bg-fill-critical-hover'),
        'error.defaultPressed': _.get(tokenColors, 'color-bg-fill-critical-active'),
        // 'error.inverse': 'brandColor.grey000',

        'warning.default': _.get(tokenColors, 'color-bg-fill-warning'),
        'warning.muted': _.get(tokenColors, 'color-bg-fill-warning'),
        // 'warning.inverse': 'brandColor.grey000',
        'warning.defaultHover': _.get(tokenColors, 'color-bg-fill-hover'),
        'warning.defaultPressed': _.get(tokenColors, 'color-bg-fill-active'),

        'success.default': _.get(tokenColors, 'color-bg-fill-success'),
        'success.muted': _.get(tokenColors, 'color-bg-fill-success'),
        'success.inverse': _.get(tokenColors, 'color-bg-fill-success'),
        'success.defaultHover': _.get(tokenColors, 'color-bg-fill-hover'),
        'success.defaultPressed': _.get(tokenColors, 'color-bg-fill-active'),

        'info.default': _.get(tokenColors, 'color-bg-fill-warning'),
        'info.defaultHover': _.get(tokenColors, 'color-bg-fill-hover'),
        'info.defaultPressed': _.get(tokenColors, 'color-bg-fill-active')
    },
    borderRadii: {
        'border-radius-0': 0,
        'border-radius-2': 2,
        'border-radius-4': 4,
        'border-radius-6': 6,
        'border-radius-8': 8,
        'border-radius-12': 12,
        'border-radius-16': 16,
        'border-radius-20': 20,
        'border-radius-30': 30,
        'border-radius-9999': 9999,
        'border-width-0': 0,
        'border-width-1': 1,
        'border-width-2': 2,
        'border-width-4': 4
    },
    statusBar: {
        barStyle: 'dark-content' as StatusBarStyle
    },
    textVariants: {
        defaults: {
            fontFamily: 'Mulish-Regular',
            fontSize: 14,
            lineHeight: 20,
            fontWeight: 400,
            color: 'text.default'
        },
        caption: {
            fontFamily: 'Mulish-Regular',
            fontSize: 12,
            lineHeight: 16,
            fontWeight: 400,
            color: 'text.default'
        },
        captionSemibold: {
            fontFamily: 'Mulish-Regular',
            fontSize: 12,
            lineHeight: 16,
            fontWeight: 600,
            color: 'text.default'
        },
        body: {
            fontFamily: 'Mulish-Regular',
            fontSize: 14,
            lineHeight: 20,
            fontWeight: 400,
            color: 'text.default'
        },
        bodySemibold: {
            fontFamily: 'Mulish-Regular',
            fontSize: 14,
            lineHeight: 20,
            fontWeight: 400,
            color: 'text.default'
        },
        headline: {
            fontFamily: 'Mulish-Regular',
            fontSize: 24,
            lineHeight: 28,
            fontWeight: 600,
            color: 'text.default'
        },
        title: {
            fontFamily: 'Mulish-Regular',
            fontSize: 18,
            lineHeight: 24,
            fontWeight: 600,
            color: 'text.default'
        },
        subtitle: {
            fontSize: 16,
            lineHeight: 20,
            fontWeight: 600
        }
    }
});
export default theme;

export type Theme = typeof theme;
