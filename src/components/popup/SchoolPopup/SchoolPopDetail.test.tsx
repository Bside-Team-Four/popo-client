import { fireEvent, screen } from '@testing-library/react';
import { useDarkMode } from 'usehooks-ts';

import SchoolPopDetail from '@/components/popup/SchoolPopup/SchoolPopDetail';
import fixtures from '@/fixtures';
import { renderWithProviders } from '@/utils/testHelper';

jest.mock('usehooks-ts');

describe('SchoolPopDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useDarkMode as jest.Mock).mockImplementation(() => ({ isDarkMode: given.isDarkMode }));
  });

  const onClose = jest.fn();
  const onChangeSchool = jest.fn();

  const renderSchoolPopDetail = () => renderWithProviders(
    <SchoolPopDetail
      onClose={onClose}
      onChangeSchool={onChangeSchool}
    />,
  );

  it('검색바를 화면에 보여준다.', () => {
    renderSchoolPopDetail();

    expect(screen.getByPlaceholderText('학교 검색 (지역+학교명으로 검색)')).toBeInTheDocument();
  });

  it('학교를 선택하면 선택된 학교가 등록되고, 팝업이 닫힌다.', () => {
    renderSchoolPopDetail();

    fireEvent.click(screen.getByText('북서울중학교'));

    expect(onChangeSchool).toHaveBeenCalledWith(fixtures.school[1]);
    expect(onClose).toHaveBeenCalled();
  });
});
