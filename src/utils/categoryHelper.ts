import _ from 'lodash/fp';
import { DefaultTheme } from 'styled-components';

import Category from '@/types/Category';

type ColorType = 'fontColor' | 'backgroundColor';

type Props = {
  theme: DefaultTheme;
  $isDarkMode: boolean;
  $category: Category;
};

export const getCategoryColor = (type:ColorType) => ({ theme, $isDarkMode, $category }:Props) => {
  if (type === 'backgroundColor') {
    if ($isDarkMode) {
      return _.get('color.background')(theme);
    }
    return _.get(`color.category.${$category}`)(theme);
  }

  if (!$isDarkMode) {
    return _.get('color.white')(theme);
  }
  return _.get(`color.category.${$category}`)(theme);
};

export const getCategoryIcon = () => null;
