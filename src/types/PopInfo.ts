import _ from 'lodash/fp';

type PopInfo = {
  show: boolean;
  onClose: () => void;
  title: string;
  okText: string;
  cancelText?: string;
  onOk?: ()=>void;
};

export const getDefaultPopInfo = () => ({
  show: false,
  title: '',
  okText: '',
  onClose: _.noop,
});

export default PopInfo;
