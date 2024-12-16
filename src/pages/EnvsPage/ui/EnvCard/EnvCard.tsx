import { EnvModel } from '@entities/envs/model';
import UpdateIcon from '@shared/assets/icons/pencil.svg';
import DeleteIcon from '@shared/assets/icons/trash.svg';
import { formatDDMMYYYYHHMM } from '@shared/lib/date';
import Text from '@shared/ui/Text';
import { FC, MouseEvent, useCallback } from 'react';

import cls from './EnvCard.module.scss';

type Props = {
  env: EnvModel
}

const EnvCard: FC<Props> = ({ env }) => {
  const handleUpdateClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  }, []);

  const handleDeleteClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  }, []);

  return (
    <div className={cls.EnvCard}>
      <Text tag='div' view='p-20' color='primary' maxLines={1} className={cls.EnvCard__title}>
        {env.title}
      </Text>
      <Text tag='div' view='p-16' color='secondary' maxLines={4} className={cls.EnvCard__description}>
        {env.description}
      </Text>
      <div>
        <div className={cls.EnvCard__actions}>
          <button className={cls.EnvCard__action} type='button' onClick={handleUpdateClick}>
            <UpdateIcon />
          </button>
          <button className={cls.EnvCard__action} type='button' onClick={handleDeleteClick}>
            <DeleteIcon />
          </button>
        </div>
        <Text tag='div' view='p-14' color='secondary' className={cls.EnvCard__date}> 
          {formatDDMMYYYYHHMM(env.updatedAt)}
        </Text>
      </div>
    </div>
  );
};

export default EnvCard;