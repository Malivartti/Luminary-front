import CheckIcon from '@shared/assets/icons/check2.svg';
import CopyIcon from '@shared/assets/icons/clipboard.svg';
import { formatDDMMYYYYHHMM } from '@shared/lib/date';
import Text from '@shared/ui/Text';
import { FC, useCallback, useState } from 'react';

import cls from './Message.module.scss';

type Props = {
  text: string;
  sendedAt: Date;
}

const Message: FC<Props> = ({ text, sendedAt }) => {
  const [isCopyed, setIsCopyed] = useState(false);

  const handleClick = useCallback(() => {
    navigator.clipboard.writeText(text);
    setIsCopyed(true);
    setTimeout(() => setIsCopyed(false), 1500);
  }, [text]);

  return (
    <div className={cls.Message}>
      <Text view='p-16'>{text}</Text>
      <div className={cls.Message__footer}>
        <button
          className={cls.Message__copy} 
          type='button'
          onClick={handleClick}
        >
          {
            isCopyed
              ? <CheckIcon />
              : <CopyIcon />
          }
        </button>
        <Text view="p-14" color="secondary">{formatDDMMYYYYHHMM(sendedAt)}</Text>
      </div>
    </div>
  );
};

export default Message;
