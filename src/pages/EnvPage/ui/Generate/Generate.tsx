import Text from '@shared/ui/Text';
import Popup from '@widgets/Popup';
import { default as cn } from 'classnames';
import { FC } from 'react';

import cls from './Generate.module.scss';

type Props = {
  className?: string
}

const Generate: FC<Props> = ({ className }) => {
  const handleClick = () => {
    console.log(window.getSelection().toString());
  };

  return (
    <div className={cn(cls.Generate, className)}>
      <Popup 
        button={ <Text tag='span' view='p-18'>Переписать</Text>}
        width={160}
      >
        <Text tag='div' view='p-16'>Другими словами</Text>
        <Text tag='div' view='p-16'>Кратко</Text>
        <Text tag='div' view='p-16'>Подробно</Text>
      </Popup>
    </div>
  );
};

export default Generate;
