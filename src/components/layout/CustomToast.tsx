import { ToastContainer } from 'react-toastify';

import { useAppWidth } from '@/utils/sizeHelper';

export default function CustomToast() {
  const appWidth = useAppWidth();

  const marginHorizontal = appWidth < 430 ? 24 : 0;

  return <ToastContainer toastStyle={{ backgroundColor: '#EAE7FD', borderRadius: '10px', margin: `0 ${marginHorizontal}px` }} />;
}
