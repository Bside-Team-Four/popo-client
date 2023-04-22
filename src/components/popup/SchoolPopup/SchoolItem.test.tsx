import { screen } from '@testing-library/react';
import { useDarkMode } from 'usehooks-ts';

import fixtures from '@/fixtures';
import { renderWithProviders } from '@/utils/testHelper';

import SchoolItem from './SchoolItem';

jest.mock('usehooks-ts');

describe('SchoolItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useDarkMode as jest.Mock).mockImplementation(() => ({ isDarkMode: given.isDarkMode }));
  });

  const renderSchoolItem = () => renderWithProviders(
    <SchoolItem school={fixtures.school[0]} onClick={jest.fn()} />,
  );

  it('학교이름과 주소를 화면에 보여준다.', () => {
    renderSchoolItem();

    expect(screen.getByText('남서울중학교')).toBeInTheDocument();
    expect(screen.getByText('서울특별시 관악구 남부순환로172길 97')).toBeInTheDocument();
  });

  context('라이트모드 일 때', () => {
    given('isDarkMode', () => false);

    it('라이트 학교 이미지를 화면에 보여준다.', () => {
      renderSchoolItem();

      expect(screen.getByAltText('school icon')).toHaveAttribute('src', '/images/light-school-icon.svg');
    });
  });

  context('다크모드 일 때', () => {
    given('isDarkMode', () => true);

    it('다크 학교 이미지를 화면에 보여준다.', () => {
      renderSchoolItem();

      expect(screen.getByAltText('school icon')).toHaveAttribute('src', '/images/black-school-icon.svg');
    });
  });
});
