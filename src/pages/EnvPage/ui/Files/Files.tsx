import Button, { ButtonTheme } from '@shared/ui/Button';
import { default as cn } from 'classnames';
import { FC } from 'react';

import cls from './Files.module.scss';

type Props = {
  className?: string
}

const Files: FC<Props> = ({ className }) => {
  return (
    <div className={cn(cls.Files, className)}>
      <div className={cls.Files__btns}>
        <Button type='button' theme={ButtonTheme.CLEAR}>
          Скачать
        </Button>
        <Button type='button' theme={ButtonTheme.CLEAR}>
          Загрузить
        </Button>
      </div>
    </div>
  );
};

export default Files;
