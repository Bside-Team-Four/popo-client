import FullPopup from '@/components/popup/FullPopup';
import PollPopDetail from '@/components/popup/PollPopup/PollPopDetail';

type PollPopupProps = {
  show:boolean
  onClose:()=>void;
};

export default function PollPopup({ show, onClose }:PollPopupProps) {
  return (
    <FullPopup show={show}>
      <PollPopDetail onClose={onClose} />
    </FullPopup>
  );
}
