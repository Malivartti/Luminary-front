import envPageStore from '@pages/EnvPage/store';
import UpdateIcon from '@shared/assets/icons/pencil.svg';
import DeleteIcon from '@shared/assets/icons/trash.svg';
import Text from '@shared/ui/Text';
import { FC, MouseEvent, useCallback } from 'react';

import cls from './FileItem.module.scss';

type Props = {
  name: string
}

const FileItem: FC<Props> = ({ name }) => {
  const handleClick = useCallback(() => {
    envPageStore.readFile(name);
  }, [name]);

  const handleUpdateClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  }, []);

  const handleDeleteClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  }, []);

  return (
    <button className={cls.FileItem} onClick={handleClick}>
      <Text view='p-16'>{name}</Text>
      <div className={cls.FileItem__actions}>
        <button className={cls.FileItem__action} type='button' onClick={handleUpdateClick}>
          <UpdateIcon />
        </button>
        <button className={cls.FileItem__action} type='button' onClick={handleDeleteClick}>
          <DeleteIcon />
        </button>
      </div>
    </button>
  );
};

export default FileItem;