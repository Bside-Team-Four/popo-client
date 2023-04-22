import { fireEvent, screen, waitFor } from '@testing-library/react';

import signupField from '@/fixtures/signupField';
import MockTheme from '@/test/MockTheme';
import { renderWithPortal } from '@/utils/testHelper';

import SchoolField from './SchoolField';

jest.mock('usehooks-ts', () => ({
  ...jest.requireActual('usehooks-ts'),
  useDarkMode: () => ({ isDarkMode: false }),
  useInterval: jest.fn(),
}));

describe('SchoolField', () => {
  const renderSchoolField = (schoolValue: string) => renderWithPortal(
    <MockTheme>
      <SchoolField
        school={{ onChangeSchool: jest.fn, value: { id: 1, name: schoolValue, address: '서울' } }}
        grade={signupField.grade}
      />
    </MockTheme>,
    'full-portal-root',
  );

  it('학교 입력 필드를 화면에 보여준다.', () => {
    given('schoolValue', () => null);

    renderSchoolField('');

    expect(screen.getByText('학교')).toBeInTheDocument();
    expect(screen.getByText('학년')).toBeInTheDocument();
  });

  it('학교 입력 필드를 클릭하면 학교 검색 팝업을 보여준다.', async () => {
    given('schoolValue', () => null);

    renderSchoolField('');

    fireEvent.click(screen.getByText('학교'));

    expect(screen.getByPlaceholderText('학교 검색 (지역+학교명으로 검색)')).toBeInTheDocument();

    fireEvent.click(screen.getByText('취소'));

    await waitFor(() => {
      expect(screen.queryByPlaceholderText('학교 검색 (지역+학교명으로 검색)')).toBe(null);
    });
  });

  context('학교 정보가 있을 때', () => {
    it('학교 정보를 화면에 보여준다.', () => {
      renderSchoolField('포포고등학교');

      expect(screen.getByDisplayValue('포포고등학교')).toBeInTheDocument();
    });
  });
});
