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

const icons = {
  romance: '/images/category-romance.svg',
  friendship: '/images/category-friendship.svg',
  school: '/images/category-school.svg',
  speciality: '/images/category-speciality.svg',
  etc: '/images/category-etc.svg',
  appearance: '/images/category-appearance.svg',
  personality: '/images/category-personality.svg',
};

export const getCategoryIcon = (category: Category) => ({
  src: icons[category],
  alt: `${category} icon`,
});
