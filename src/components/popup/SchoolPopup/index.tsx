import FullPopup from '@/components/popup/FullPopup';
import School from '@/types/School';

import SchoolPopDetail from './SchoolPopDetail';

type SchoolPopupProps = {
  show:boolean
  onClose:()=>void;
  onChangeSchool: (s:School) => void;
};

export default function SchoolPopup({ show, onClose, onChangeSchool }:SchoolPopupProps) {
  return (
    <FullPopup show={show}>
      <SchoolPopDetail onClose={onClose} onChangeSchool={onChangeSchool} />
    </FullPopup>
  );
}
