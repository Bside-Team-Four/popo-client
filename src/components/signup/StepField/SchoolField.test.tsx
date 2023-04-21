import { screen } from '@testing-library/react';

import signupField from '@/fixtures/signupField';
import { renderWithProviders } from '@/utils/testHelper';

import SchoolField from './SchoolField';

describe('SchoolField', () => {
  const renderSchoolField = (schoolValue: string) => renderWithProviders(
    <SchoolField
      school={{ onChangeSchool: jest.fn, value: { schoolId: 1, name: schoolValue } }}
      grade={signupField.grade}
    />,
  );

  it('학교 입력 필드를 화면에 보여준다.', () => {
    given('schoolValue', () => null);

    renderSchoolField('');

    expect(screen.getByText('학교')).toBeInTheDocument();
    expect(screen.getByText('학년')).toBeInTheDocument();
  });

  context('학교 정보가 있을 때', () => {
    it('학교 정보를 화면에 보여준다.', () => {
      renderSchoolField('포포고등학교');

      expect(screen.getByDisplayValue('포포고등학교')).toBeInTheDocument();
    });
  });
});
