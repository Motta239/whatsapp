import { Platform } from 'react-native';
const IOS_SYSTEM_COLORS = {
  white: '#ffffff',
  black: '#000000',
  light: {
    grey6: '#f2f2f7',
    grey5: '#e6e6eb',
    grey4: '#d2d2d7',
    grey3: '#c7c7cc',
    grey2: '#afb0b4',
    grey: '#8e8e93',
    background: '#f2f2f7',
    foreground: '#000000',
    root: '#ffffff',
    card: '#ffffff',
    destructive: '#ff382b',
    primary: '#c8cbce',
    tabIcon: '#2b7d2f',
  },
  dark: {
    grey6: '#151518',
    grey5: '#28282a',
    grey4: '#373739',
    grey3: '#464649',
    grey2: '#636366',
    grey: '#8e8e93',
    background: '#101010',
    foreground: '#ffffff',
    root: '#000000',
    card: '#1c1c1e',
    destructive: '#fe4336',
    primary: '#38393a',
    tabIcon: '#05bb0b',
  },
} as const;

const ANDROID_COLORS = {
  white: '#ffffff',
  black: '#000000',
  light: {
    grey6: '#f9f9ff',
    grey5: '#d7d9e4',
    grey4: '#c1c6d7',
    grey3: '#717786',
    grey2: '#414754',
    grey: '#181c23',
    background: '#f9f9ff',
    foreground: '#000000',
    root: '#ffffff',
    card: '#949494',
    destructive: '#ba1a1a',
    primary: '#0070e9',
  },
  dark: {
    grey6: '#151518',
    grey5: '#28282a',
    grey4: '#373739',
    grey3: '#464649',
    grey2: '#636366',
    grey: '#8e8e93',
    background: '#0e0e0e',
    foreground: '#ffffff',
    root: '#000000',
    card: '#1c1c1e',
    destructive: '#fe4336',
    primary: '#0385ff',
    tabIcon: '#05bb0b',
  },
} as const;

const COLORS = Platform.OS === 'ios' ? IOS_SYSTEM_COLORS : ANDROID_COLORS;

export { COLORS };
