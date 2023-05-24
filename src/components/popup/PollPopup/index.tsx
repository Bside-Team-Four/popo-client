import FullPopup from '@/components/popup/FullPopup';
import PollPopDetail from '@/components/popup/PollPopup/PollPopDetail';
import useGetPolls from '@/hooks/api/useGetPolls';

type PollPopupProps = {
  show:boolean
  onClose:()=>void;
};

export default function PollPopup({ show, onClose }:PollPopupProps) {
  const { data } = useGetPolls();

  return (
    <FullPopup show={show}>
      {data && <PollPopDetail onClose={onClose} {...data} />}
    </FullPopup>
  );
}
