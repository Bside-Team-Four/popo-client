import { useContext } from 'react';

import _ from 'lodash/fp';
import { DefaultTheme, ThemeContext } from 'styled-components';

import Size from '@/types/Size';

interface ThemeProps {
  theme: { size: Size };
}

export const getAppWidth = (props: ThemeProps) => props.theme.size.width;

export const getAppHeight = (props: ThemeProps) => props.theme.size.height;

const getCalAppWidth = (func: (num: number) => number) => _.pipe(_.get('theme.size.width'), func);

export const getRatioSize = (px: number): (() => string) => _.pipe(
  getCalAppWidth((width) => (width * px) / 720),
  (width) => `${width}px`,
);

const useTheme = ():DefaultTheme => useContext(ThemeContext) as DefaultTheme;

const useThemeProps = (): { theme: DefaultTheme } => {
  const theme = useTheme();
  return { theme };
};

export const useAppWidth = () => {
  const themeProps = useThemeProps();
  return getAppWidth(themeProps);
};

export const useAppHeight = () => {
  const themeProps = useThemeProps();
  return getAppHeight(themeProps);
};
