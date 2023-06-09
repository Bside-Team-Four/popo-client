import { DefaultTheme } from 'styled-components';

import DarkTheme from '@/styles/darkTheme';
import defaultTheme from '@/styles/defaultTheme';
import Category from '@/types/Category';

import { getCategoryColor, getCategoryIcon } from './categoryHelper';

describe('categoryHelper', () => {
  const fixtureDarkProps = {
    theme: DarkTheme as DefaultTheme,
    $category: 'romance' as Category,
    $isDarkMode: true,
  };

  const fixtureLightProps = {
    theme: defaultTheme as DefaultTheme,
    $category: 'romance' as Category,
    $isDarkMode: false,
  };

  describe('getCategoryColor', () => {
    context('다크 모드 일 떄', () => {
      it('type fontColor를 요청했을 때 카테고리 색상을 반환한다.', () => {
        const result = getCategoryColor('fontColor')(fixtureDarkProps);

        expect(result).toBe('#FF3B30');
      });

      it('type backgroundColor를 요청했을 때 기본 백그라운드 색상을 반환한다.', () => {
        const result = getCategoryColor('backgroundColor')(fixtureDarkProps);

        expect(result).toBe('#1D1D1D');
      });
    });

    context('다크 모드가 아닐 떄', () => {
      it('type fontColor를 요청했을 때 white 색상을 반환한다.', () => {
        const result = getCategoryColor('fontColor')(fixtureLightProps);

        expect(result).toBe('#FFFFFF');
      });

      it('type backgroundColor를 요청했을 때 카테고리 색상을 반환한다.', () => {
        const result = getCategoryColor('backgroundColor')(fixtureLightProps);

        expect(result).toBe('#FF3B30');
      });
    });
  });

  describe('getCategoryColor', () => {
    context('카테고리가 romance 일 때', () => {
      it('romance 아이콘을 반환한다.', () => {
        const result = getCategoryIcon('romance');

        expect(result).toEqual({
          src: '/images/category-romance.svg',
          alt: 'romance icon',
        });
      });
    });

    context('카테고리가 school 일 때', () => {
      it('school 아이콘을 반환한다.', () => {
        const result = getCategoryIcon('school');

        expect(result).toEqual({
          src: '/images/category-school.svg',
          alt: 'school icon',
        });
      });
    });
  });
});
